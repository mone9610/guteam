resource "aws_route53_zone" "tfer--Z01965944RVT4NYZDDN1_admin-002E-guteam-002E-net" {
  comment       = "subdomain for guteam admin"
  force_destroy = "false"
  name          = "admin.guteam.net"
}

resource "aws_route53_zone" "tfer--Z03521113BC829TGMOFE_api-002E-guteam-002E-net" {
  force_destroy = "false"
  name          = "api.guteam.net"
}

resource "aws_route53_zone" "tfer--Z058643319ASP7HZRKEY3_guteam-002E-net" {
  comment       = "HostedZone created by Route53 Registrar"
  force_destroy = "false"
  name          = "guteam.net"
}
