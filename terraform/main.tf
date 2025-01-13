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
        env {
          name  = "BACKEND_BASE_URL"
          value = "https://room-reservation-backend-321212193587.europe-west1.run.app"
        }
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
        env {
          name  = "DB_HOST"
          value = google_sql_database_instance.default.ip_address.0.ip_address
        }
        env {
          name  = "DB_USER"
          value = google_sql_user.users.name
        }
        env {
          name  = "POSTGRESS_PASSWORD"
          value = google_sql_user.users.password
        }
        env {
          name  = "DB_NAME"
          value = google_sql_database.default.name
        }
        env {
          name  = "DB_PORT"
          value = "5432"
        }
        env {
          name  = "JWT_SECRET"
          value = "someverylongsecretkeythatshouldnotbeinproduction"
        }
        env {
          name = "FRONTEND_BASE_URL"
          value = "https://room-reservation-frontend-321212193587.europe-west1.run.app"
        }
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




# resource "google_cloud_run_service" "frontend" {
#   name     = "room-reservation-frontend"
#   location = var.region
# }

# resource "google_cloud_run_service" "backend" {
#   name     = "room-reservation-backend"
#   location = var.region
# }

# resource "google_cloud_run_service" "backend" {
#   name     = "room-reservation-backend"
#   location = "europe-west1"

#   template {
#     spec {
#       containers {
#         image = "gcr.io/gcp-room-reservation-system/your-container-image" # Replace with your image
#         env {
#           name  = "DB_HOST"
#           value = google_sql_database_instance.default.connection_name
#         }
#         env {
#           name  = "DB_USER"
#           value = google_sql_user.users.name
#         }
#         env {
#           name  = "POSTGRESS_PASSWORD"
#           value = google_sql_user.users.password
#         }
#         env {
#           name  = "DB_NAME"
#           value = google_sql_database.default.name
#         }
#         env {
#           name  = "DB_PORT"
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
#   location = var.region
#   project  = var.project_id

#   template {
#     spec {
#       containers {
#         image = "europe-west1-docker.pkg.dev/gcp-room-reservation-system/cloud-run-source-deploy/gcp-room-reservation-system/room-reservation-frontend"
#         # image = "gcr.io/gcp-room-reservation-system/your-container-image" # Replace with your image
#         env {
#           name  = "VITE_BACKEND_BASE_URL"
#           # value = google_cloud_run_service.backend.status[0].url
#           value = "https://room-reservation-backend-321212193587.europe-west1.run.app"
#         }

#         ports {
#           container_port = "3000"
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

# resource "google_cloud_run_service_iam_binding" "default" {
#   location = google_cloud_run_service.tfer--gcp-room-reservation-system-europe-west1-room-reservation-frontend-0.location
#   service  = google_cloud_run_service.tfer--gcp-room-reservation-system-europe-west1-room-reservation-frontend-0.location
#   role     = "roles/run.invoker"
#   members = [
#     "allUsers"
#   ]
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