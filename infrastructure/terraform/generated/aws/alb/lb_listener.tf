resource "aws_lb_listener" "tfer--arn-003A-aws-003A-elasticloadbalancing-003A-ap-northeast-1-003A-458272669963-003A-listener-002F-app-002F-guteam-prod-alb-002F-7c9e9b8fcbbd3718-002F-856750ff91e5d218" {
  certificate_arn = "arn:aws:acm:ap-northeast-1:458272669963:certificate/52d05adc-0e0c-4476-9985-3c513f039782"

  default_action {
    order            = "1"
    target_group_arn = "arn:aws:elasticloadbalancing:ap-northeast-1:458272669963:targetgroup/guteam-prod-ecs-service-rails/90d30c15aa565413"
    type             = "forward"
  }

  load_balancer_arn = "${data.terraform_remote_state.alb.outputs.aws_lb_tfer--guteam-prod-alb_id}"
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
}

resource "aws_lb_listener" "tfer--arn-003A-aws-003A-elasticloadbalancing-003A-ap-northeast-1-003A-458272669963-003A-listener-002F-app-002F-guteam-prod-alb-for-console-002F-5e86bda2e5c12d68-002F-848c402a1e10b904" {
  certificate_arn = "arn:aws:acm:ap-northeast-1:458272669963:certificate/465fa934-9157-4b34-86cd-4c1bda8c2c48"

  default_action {
    target_group_arn = "arn:aws:elasticloadbalancing:ap-northeast-1:458272669963:targetgroup/guteam-prod-targetg-console/85d1926db5b74722"
    type             = "forward"
  }

  load_balancer_arn = "${data.terraform_remote_state.alb.outputs.aws_lb_tfer--guteam-prod-alb-for-console_id}"
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
}
