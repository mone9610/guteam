resource "aws_internet_gateway" "tfer--igw-00349fc47374ae254" {
  vpc_id = "${data.terraform_remote_state.vpc.outputs.aws_vpc_tfer--vpc-0e78d2bf14cde43b7_id}"
}

resource "aws_internet_gateway" "tfer--igw-cab646ad" {
  vpc_id = "${data.terraform_remote_state.vpc.outputs.aws_vpc_tfer--vpc-21db2e47_id}"
}
