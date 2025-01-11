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

# resource "google_cloud_run_service" "backend" {
#   name     = "room-reservation-backend"
#   location = "europe-west1"

#   template {
#     spec {
#       containers {
#         image = "gcr.io/gcp-room-reservation-system/your-container-image" # Replace with your image
#         env {
#           name  = "POSTGRES_HOST"
#           value = google_sql_database_instance.default.connection_name
#         }
#         env {
#           name  = "POSTGRES_USER"
#           value = google_sql_user.users.name
#         }
#         env {
#           name  = "POSTGRESS_PASSWORD"
#           value = google_sql_user.users.password
#         }
#         env {
#           name  = "POSTGRES_DB"
#           value = google_sql_database.default.name
#         }
#         env {
#           name  = "POSTGRES_PORT"
#           value = "8080"
#         }
#         env {
#           name  = "JWT_SECRET"
#           value = "someverylongsecretkeythatshouldnotbeinproduction"
#         }
#         env {
#           name = "FRONTEND_BASE_URL"
#           value = google_cloud_run_service.frontend.status[0].url
#         }
#       }
#     }
#   }
#   # depends_on = [google_project_iam_binding.sql_client_role]
# }
# europe-west1-docker.pkg.dev/gcp-room-reservation-system/cloud-run-source-deploy/gcp-room-reservation-system/room-reservation-frontend:c727855bf312cbcdc2fbc9ffff7bb5ffa67c48ff

# resource "google_cloud_run_service" "frontend" {
#   name     = "room-reservation-frontend"
#   location = "europe-west1"

#   template {
#     spec {
#       containers {
#         image = "gcr.io/gcp-room-reservation-system/your-container-image" # Replace with your image
#         env {
#           name  = "VITE_BACKEND_BASE_URL"
#           value = google_cloud_run_service.backend.status[0].url
#         }
#       }
#     }
#   }
#   # depends_on = [google_project_iam_binding.sql_client_role]
# }

# resource "google_service_account" "cloud_run_sa" {
#   account_id   = "cloud-run-sa"
#   display_name = "Cloud Run Service Account"
# }

# resource "google_project_iam_binding" "sql_client_role" {
#   role    = "roles/cloudsql.client"
#   members = ["serviceAccount:${google_service_account.cloud_run_sa.email}"]
# }



# resource "google_cloud_run_service_iam_member" "invoke" {
#   service = google_cloud_run_service.default.name
#   location = google_cloud_run_service.default.location
#   role     = "roles/run.invoker"
#   member   = "allUsers" # Adjust this to restrict access
# }

# resource "google_project_iam_member" "grant_sql_role" {
#   role   = "roles/cloudsql.client"
#   member = "serviceAccount:${google_service_account.cloud_run_sa.email}"
# }