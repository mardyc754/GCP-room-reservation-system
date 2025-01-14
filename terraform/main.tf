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
        # image   = "europe-west1-docker.pkg.dev/gcp-room-reservation-system/cloud-run-source-deploy/gcp-room-reservation-system/room-reservation-frontend:c6eadbd02b3eba9f4c9a94cd5bed14e99a8bba9e"
        image = "europe-west1-docker.pkg.dev/gcp-room-reservation-system/cloud-run-source-deploy/gcp-room-reservation-system/room-reservation-frontend:d6acd1f5ac88ce6701938498bb60a462f2fe9316"
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

resource "google_storage_bucket" "function_bucket" {
  name     = "${var.project_id}-functions"
  location = var.region
}

resource "google_storage_bucket_object" "function_source" {
  name   = "email-sender.zip"
  bucket = google_storage_bucket.function_bucket.name
  source = "email-sender.zip" # Ensure you zip your function code into this file
}

resource "google_cloudfunctions_function" "email_function" {
  name                  = "sendEmailNotification"
  runtime               = "nodejs22"
  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.function_bucket.name
  source_archive_object = google_storage_bucket_object.function_source.name
  entry_point           = "sendEmailNotification"

  # HTTP Trigger
  trigger_http = true

  # IAM Policy to allow public access
  depends_on = [google_storage_bucket_object.function_source]

  environment_variables = {
    NODE_ENV = "production"
  }
}

resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = var.project_id
  region         = var.region
  cloud_function = google_cloudfunctions_function.email_function.name
  role           = "roles/cloudfunctions.invoker"
  member         = "allUsers"
}
