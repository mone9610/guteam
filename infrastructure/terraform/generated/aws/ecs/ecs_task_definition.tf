resource "aws_ecs_task_definition" "tfer--task-definition-002F-guteam-prod-ecs-taskd-rails" {
  container_definitions    = "[{\"cpu\":0,\"environment\":[],\"essential\":true,\"image\":\"458272669963.dkr.ecr.ap-northeast-1.amazonaws.com/guteam-production:8280165070ba756fe4e383a864a872627bdb2ad2\",\"logConfiguration\":{\"logDriver\":\"awslogs\",\"options\":{\"awslogs-group\":\"/ecs/guteam-prod-ecs-taskd-rails\",\"awslogs-region\":\"ap-northeast-1\",\"awslogs-stream-prefix\":\"ecs\"}},\"mountPoints\":[],\"name\":\"guteam-prod-ecs-container-rails\",\"portMappings\":[{\"containerPort\":3000,\"hostPort\":3000,\"protocol\":\"tcp\"}],\"volumesFrom\":[]}]"
  cpu                      = "256"
  execution_role_arn       = "arn:aws:iam::458272669963:role/ecsTaskExecutionRole"
  family                   = "guteam-prod-ecs-taskd-rails"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  task_role_arn            = "arn:aws:iam::458272669963:role/ecsTaskExecutionRole"
}
