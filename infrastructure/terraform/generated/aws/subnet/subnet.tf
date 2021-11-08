resource "aws_subnet" "tfer--subnet-0118af49" {
  assign_ipv6_address_on_creation = "false"
  cidr_block                      = "172.31.32.0/20"
  map_customer_owned_ip_on_launch = "false"
  map_public_ip_on_launch         = "true"
  vpc_id                          = "${data.terraform_remote_state.vpc.outputs.aws_vpc_tfer--vpc-21db2e47_id}"
}

resource "aws_subnet" "tfer--subnet-04c151a9f3a141167" {
  assign_ipv6_address_on_creation = "false"
  cidr_block                      = "172.30.1.0/24"
  map_customer_owned_ip_on_launch = "false"
  map_public_ip_on_launch         = "true"
  vpc_id                          = "${data.terraform_remote_state.vpc.outputs.aws_vpc_tfer--vpc-0e78d2bf14cde43b7_id}"
}

resource "aws_subnet" "tfer--subnet-0ac6f1a297acb4444" {
  assign_ipv6_address_on_creation = "false"
  cidr_block                      = "172.30.2.0/24"
  map_customer_owned_ip_on_launch = "false"
  map_public_ip_on_launch         = "true"
  vpc_id                          = "${data.terraform_remote_state.vpc.outputs.aws_vpc_tfer--vpc-0e78d2bf14cde43b7_id}"
}

resource "aws_subnet" "tfer--subnet-0c63315b073171fd2" {
  assign_ipv6_address_on_creation = "false"
  cidr_block                      = "172.30.0.0/24"
  map_customer_owned_ip_on_launch = "false"
  map_public_ip_on_launch         = "true"
  vpc_id                          = "${data.terraform_remote_state.vpc.outputs.aws_vpc_tfer--vpc-0e78d2bf14cde43b7_id}"
}

resource "aws_subnet" "tfer--subnet-bbec5590" {
  assign_ipv6_address_on_creation = "false"
  cidr_block                      = "172.31.16.0/20"
  map_customer_owned_ip_on_launch = "false"
  map_public_ip_on_launch         = "true"
  vpc_id                          = "${data.terraform_remote_state.vpc.outputs.aws_vpc_tfer--vpc-21db2e47_id}"
}

resource "aws_subnet" "tfer--subnet-f67f9eac" {
  assign_ipv6_address_on_creation = "false"
  cidr_block                      = "172.31.0.0/20"
  map_customer_owned_ip_on_launch = "false"
  map_public_ip_on_launch         = "true"
  vpc_id                          = "${data.terraform_remote_state.vpc.outputs.aws_vpc_tfer--vpc-21db2e47_id}"
}
