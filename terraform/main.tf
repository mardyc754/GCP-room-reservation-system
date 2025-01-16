terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = ">= 6.14.1"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}


resource "google_sql_database_instance" "default" {
  name             = var.db_name
  database_version = "POSTGRES_15"
  region           = var.region
  project          = var.project_id
  deletion_protection = false

  settings {
    tier = "db-f1-micro" 
  }

}

resource "google_sql_user" "users" {
  name     = var.db_user
  instance = google_sql_database_instance.default.name
  password = var.db_password 
}

resource "google_sql_database" "default" {
  name     = var.db_instance_name
  instance = google_sql_database_instance.default.name
}

resource "google_cloud_run_service" "frontend" {
  location                   = var.region
  name                       = "room-reservation-frontend"
  project                    = var.project_id
  metadata {
    namespace   = var.project_id
  }
  template {
    spec {
      containers {
        image   = "europe-west1-docker.pkg.dev/gcp-room-reservation-system/cloud-run-source-deploy/gcp-room-reservation-system/room-reservation-frontend:d86abab2beb92dd5d3204bcca69385c687445686"
        ports {
          container_port = 3000
        }
        resources {
          limits = {
            cpu    = "1000m"
            memory = "512Mi"
          }
        }
      }
    }
  }
}

resource "google_cloud_run_service" "backend" {
  location                   = var.region
  name                       = "room-reservation-backend"
  project                    = var.project_id
  metadata {
    namespace   = var.project_id
  }
  template {
    spec {
      containers {
        image   = "europe-west1-docker.pkg.dev/gcp-room-reservation-system/cloud-run-source-deploy/gcp-room-reservation-system/room-reservation-backend:3a25e4cf3f3196402a8d4952154fbef7273c55b2"
        name    = "placeholder-1"
        ports {
          container_port = 8080
        }
        resources {
          limits = {
            cpu    = "1000m"
            memory = "512Mi"
          }
        }
      }
    }
  }
}

resource "google_cloud_run_service_iam_binding" "frontend_binding" {
  location = google_cloud_run_service.frontend.location
  service  = google_cloud_run_service.frontend.name
  role     = "roles/run.invoker"
  members = [
    "allUsers"
  ]
}

resource "google_cloud_run_service_iam_binding" "backend_binding" {
  location = google_cloud_run_service.backend.location
  service  = google_cloud_run_service.backend.name
  role     = "roles/run.invoker"
  members = [
    "allUsers"
  ]
}

# PUBSUB
resource "google_pubsub_topic" "notification_topic" {
  name = var.pubsub_topic_name
}

resource "google_pubsub_subscription" "send_email_subscription" {
  name  = "send-email-subscription"
  topic = google_pubsub_topic.notification_topic.id
}

# CLOUD FUNCTION - Send email notification
resource "google_storage_bucket" "function_bucket" {
  name     = "${var.project_id}-functions"
  location = var.region
  force_destroy = true
}

resource "google_storage_bucket_object" "function_source" {
  name   = "email-sender.zip"
  bucket = google_storage_bucket.function_bucket.name
  source = "email-sender.zip" # Ensure you zip your function code into this file
}

resource "google_storage_bucket_object" "daily_reminder_function_source" {
  name   = "daily-reminder.zip"
  bucket = google_storage_bucket.function_bucket.name
  source = "daily-reminder.zip" # Ensure you zip your function code into this file
}

resource "google_cloudfunctions_function" "email_function" {
  name                  = "sendEmailNotification"
  runtime               = "nodejs22"
  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.function_bucket.name
  source_archive_object = google_storage_bucket_object.function_source.name
  entry_point           = "sendEmailNotification"
  description           = "Send email notification to user after creating a reservation"
  region                = var.region


  event_trigger {
    event_type = "google.pubsub.topic.publish"
    resource   = google_pubsub_topic.notification_topic.name
  }

  # IAM Policy to allow public access
  depends_on = [
    google_storage_bucket_object.function_source, 
    google_pubsub_topic.notification_topic
  ]

  environment_variables = {
    NODE_ENV = "production"
    EMAIL_USER = var.email_user
    EMAIL_PASS = var.email_pass
  }
}

resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = var.project_id
  region         = var.region
  cloud_function = google_cloudfunctions_function.email_function.name
  role           = "roles/cloudfunctions.invoker"
  member        = "allUsers"
}

# CLOUD FUNCTION - Daily reminder
resource "google_cloudfunctions_function" "daily_reminder" {
  name                  = "dailyReminder"
  runtime               = "nodejs22"
  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.function_bucket.name
  source_archive_object = google_storage_bucket_object.daily_reminder_function_source.name
  entry_point           = "dailyReminder"
  description           = "Send daily reminder about upcoming reservations"
  region                = var.region

  # Event trigger
  trigger_http = true

  # IAM Policy to allow public access
  depends_on = [google_storage_bucket_object.daily_reminder_function_source, google_pubsub_topic.notification_topic]

  environment_variables = {
    DB_USER = var.db_user
    DB_PASS = var.db_password
    DB_NAME = var.db_name
    DB_HOST = google_sql_database_instance.default.first_ip_address
    DB_PORT = "5432"
    PROJECT_ID = var.project_id
  }
}

resource "google_cloudfunctions_function_iam_member" "daily_email_invoker" {
  project        = var.project_id
  region         = var.region
  cloud_function = google_cloudfunctions_function.daily_reminder.name
  role           = "roles/cloudfunctions.invoker"
  member        = "allUsers"
}



resource "google_project_iam_member" "project_invoker" {
  project = var.project_id
  role    = "roles/cloudfunctions.invoker"
  member  = "serviceAccount:${google_cloudfunctions_function.email_function.service_account_email}"
}


# Cloud Scheduler
resource "google_cloud_scheduler_job" "daily_email_job" {
  name             = "daily-email-job"
  description      = "Send email notification to user after creating a reservation"
  schedule         = "0 9 * * *" # Codziennie o 9:00 CET
  time_zone        = "CET"
  region = var.region

  http_target {
    http_method = "POST"
    uri = "${google_cloudfunctions_function.daily_reminder.https_trigger_url}"
    oidc_token {
      service_account_email = "${google_cloudfunctions_function.daily_reminder.service_account_email}"
    }
  }

}

