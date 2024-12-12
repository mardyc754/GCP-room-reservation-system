terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

provider "google" {
  project = "PROJECT ID"
  region  = "REGION"
  zone    = "ZONE"
}

provider "googlebeta" {
  project = "PROJECT ID"
  region  = "REGION"
}

resource "google_sql_database_instance" "default" {
  name             = "my-sql-instance"
  database_version = "MYSQL_8_0"
  region           = "your-region"

  settings {
    tier = "db-f1-micro" # Adjust the machine type as needed
  }
}

resource "google_sql_user" "users" {
  name     = "db_user"
  instance = google_sql_database_instance.default.name
  password = "db_password" # Use a secret management tool in production
}

resource "google_sql_database" "default" {
  name     = "my_database"
  instance = google_sql_database_instance.default.name
}

resource "google_service_account" "cloud_run_sa" {
  account_id   = "cloud-run-sa"
  display_name = "Cloud Run Service Account"
}

resource "google_project_iam_binding" "sql_client_role" {
  role    = "roles/cloudsql.client"
  members = ["serviceAccount:${google_service_account.cloud_run_sa.email}"]
}

resource "google_cloud_run_service" "default" {
  name     = "my-cloud-run-service"
  location = "your-region"

  template {
    spec {
      containers {
        image = "gcr.io/your-gcp-project-id/your-container-image" # Replace with your image
        env {
          name  = "DB_HOST"
          value = google_sql_database_instance.default.connection_name
        }
        env {
          name  = "DB_USER"
          value = google_sql_user.users.name
        }
        env {
          name  = "DB_PASS"
          value = google_sql_user.users.password
        }
      }
    }
  }
  depends_on = [google_project_iam_binding.sql_client_role]
}

resource "google_cloud_run_service_iam_member" "invoke" {
  service = google_cloud_run_service.default.name
  location = google_cloud_run_service.default.location
  role     = "roles/run.invoker"
  member   = "allUsers" # Adjust this to restrict access
}

resource "google_project_iam_member" "grant_sql_role" {
  role   = "roles/cloudsql.client"
  member = "serviceAccount:${google_service_account.cloud_run_sa.email}"
}