variable "project_id" {
  description = "The project ID for the GCP project"
  type        = string
  default     = "gcp-room-reservation-system"
}

variable "region" {
  description = "The region for the GCP project"
  type        = string
  default     = "europe-west1"
}

variable "zone" {
  description = "The zone for the GCP project"
  type        = string
  default     = "europe-west1-b"
}

variable "db_name" {
  description = "The name of the database"
  type        = string
  default     = "room-reservation-db"
}

variable "db_user" {
  description = "The name of the database user"
  type        = string
  default     = "db_user"
}

variable "db_password" {
  description = "The password of the database user"
  type        = string
  default     = "db_password"
}

variable "db_instance_name" {
  description = "The name of the database instance"
  type        = string
  default     = "room-reservation-db"
}

variable "email_user" {
  description = "The email address of the user"
  type        = string
  sensitive   = true
}

variable "email_pass" {
  description = "The password of the email user"
  type        = string
  sensitive  = true
}

variable "pubsub_topic_name" {
  description = "The name of the pub/sub topic"
  type        = string
  default     = "send-email"
}