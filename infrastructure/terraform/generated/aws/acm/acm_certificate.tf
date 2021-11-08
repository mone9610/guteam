resource "aws_acm_certificate" "tfer--1f5ac3c7-0c89-4be7-8617-789916762960_guteam-002E-net" {
  domain_name = "guteam.net"

  options {
    certificate_transparency_logging_preference = "ENABLED"
  }

  validation_method = "DNS"
}

resource "aws_acm_certificate" "tfer--465fa934-9157-4b34-86cd-4c1bda8c2c48_admin-002E-guteam-002E-net" {
  domain_name = "admin.guteam.net"

  options {
    certificate_transparency_logging_preference = "ENABLED"
  }

  validation_method = "DNS"
}

resource "aws_acm_certificate" "tfer--52d05adc-0e0c-4476-9985-3c513f039782_api-002E-guteam-002E-net" {
  domain_name = "api.guteam.net"

  options {
    certificate_transparency_logging_preference = "ENABLED"
  }

  validation_method = "DNS"
}
