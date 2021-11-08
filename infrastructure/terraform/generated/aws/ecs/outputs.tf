output "aws_ecs_cluster_tfer--guteam-prod_id" {
  value = "${aws_ecs_cluster.tfer--guteam-prod.id}"
}

output "aws_ecs_service_tfer--guteam-prod_guteam-prod-ecs-service-rails_id" {
  value = "${aws_ecs_service.tfer--guteam-prod_guteam-prod-ecs-service-rails.id}"
}

output "aws_ecs_task_definition_tfer--task-definition-002F-guteam-prod-ecs-taskd-rails_id" {
  value = "${aws_ecs_task_definition.tfer--task-definition-002F-guteam-prod-ecs-taskd-rails.id}"
}
