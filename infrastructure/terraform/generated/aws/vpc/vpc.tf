resource "aws_vpc" "tfer--vpc-0e78d2bf14cde43b7" {
  assign_generated_ipv6_cidr_block = "false"
  cidr_block                       = "172.30.0.0/16"
  enable_classiclink               = "false"
  enable_classiclink_dns_support   = "false"
  enable_dns_hostnames             = "true"
  enable_dns_support               = "true"
  instance_tenancy                 = "default"

  tags = {
    Name = "guteam-prod"
  }

  tags_all = {
    Name = "guteam-prod"
  }
}

resource "aws_vpc" "tfer--vpc-21db2e47" {
  assign_generated_ipv6_cidr_block = "false"
  cidr_block                       = "172.31.0.0/16"
  enable_classiclink               = "false"
  enable_classiclink_dns_support   = "false"
  enable_dns_hostnames             = "true"
  enable_dns_support               = "true"
  instance_tenancy                 = "default"

  tags = {
    Name = "guteam-admin"
  }

  tags_all = {
    Name = "guteam-admin"
  }
}
