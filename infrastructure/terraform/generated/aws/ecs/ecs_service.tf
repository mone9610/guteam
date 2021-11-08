resource "aws_ecs_service" "tfer--guteam-prod_guteam-prod-ecs-service-rails" {
  cluster = "guteam-prod"

  deployment_circuit_breaker {
    enable   = "false"
    rollback = "false"
  }

  deployment_controller {
    type = "ECS"
  }

  deployment_maximum_percent         = "200"
  deployment_minimum_healthy_percent = "100"
  desired_count                      = "1"
  enable_ecs_managed_tags            = "true"
  enable_execute_command             = "false"
  health_check_grace_period_seconds  = "60"
  launch_type                        = "FARGATE"

  load_balancer {
    container_name   = "guteam-prod-ecs-container-rails"
    container_port   = "3000"
    target_group_arn = "arn:aws:elasticloadbalancing:ap-northeast-1:458272669963:targetgroup/guteam-prod-ecs-service-rails/90d30c15aa565413"
  }

  name = "guteam-prod-ecs-service-rails"

  network_configuration {
    assign_public_ip = "true"
    security_groups  = ["sg-0e7c7f7adde1226cc"]
    subnets          = ["${data.terraform_remote_state.subnet.outputs.aws_subnet_tfer--subnet-0c63315b073171fd2_id}"]
  }

  platform_version    = "LATEST"
  scheduling_strategy = "REPLICA"
  task_definition     = "arn:aws:ecs:ap-northeast-1:458272669963:task-definition/guteam-prod-ecs-taskd-rails:12"
}
