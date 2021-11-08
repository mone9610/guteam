resource "aws_lb" "tfer--guteam-prod-alb" {
  drop_invalid_header_fields = "false"
  enable_deletion_protection = "false"
  enable_http2               = "true"
  idle_timeout               = "60"
  internal                   = "false"
  ip_address_type            = "ipv4"
  load_balancer_type         = "application"
  name                       = "guteam-prod-alb"
  security_groups            = ["sg-024841e4fbc3848e3"]

  subnet_mapping {
    subnet_id = "subnet-04c151a9f3a141167"
  }

  subnet_mapping {
    subnet_id = "subnet-0c63315b073171fd2"
  }

  subnets = ["${data.terraform_remote_state.subnet.outputs.aws_subnet_tfer--subnet-0c63315b073171fd2_id}", "${data.terraform_remote_state.subnet.outputs.aws_subnet_tfer--subnet-04c151a9f3a141167_id}"]
}

resource "aws_lb" "tfer--guteam-prod-alb-for-console" {
  drop_invalid_header_fields = "false"
  enable_deletion_protection = "false"
  enable_http2               = "true"
  idle_timeout               = "60"
  internal                   = "false"
  ip_address_type            = "ipv4"
  load_balancer_type         = "application"
  name                       = "guteam-prod-alb-for-console"
  security_groups            = ["sg-094abb2567223626a", "sg-c822a388"]

  subnet_mapping {
    subnet_id = "subnet-f67f9eac"
  }

  subnet_mapping {
    subnet_id = "subnet-0118af49"
  }

  subnets = ["${data.terraform_remote_state.subnet.outputs.aws_subnet_tfer--subnet-0118af49_id}", "${data.terraform_remote_state.subnet.outputs.aws_subnet_tfer--subnet-f67f9eac_id}"]
}
