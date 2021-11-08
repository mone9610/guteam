resource "aws_db_subnet_group" "tfer--default-vpc-0e78d2bf14cde43b7" {
  description = "Created from the RDS Management Console"
  name        = "default-vpc-0e78d2bf14cde43b7"
  subnet_ids  = ["${data.terraform_remote_state.subnet.outputs.aws_subnet_tfer--subnet-04c151a9f3a141167_id}", "${data.terraform_remote_state.subnet.outputs.aws_subnet_tfer--subnet-0c63315b073171fd2_id}", "${data.terraform_remote_state.subnet.outputs.aws_subnet_tfer--subnet-0ac6f1a297acb4444_id}"]
}
