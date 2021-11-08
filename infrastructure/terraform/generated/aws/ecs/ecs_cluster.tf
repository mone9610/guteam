resource "aws_ecs_cluster" "tfer--guteam-prod" {
  capacity_providers = ["FARGATE", "FARGATE_SPOT"]
  name               = "guteam-prod"

  setting {
    name  = "containerInsights"
    value = "disabled"
  }
}
