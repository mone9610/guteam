resource "aws_eip" "tfer--eipalloc-0291709433815b554" {
  instance             = "i-0e6f88ab55803ac73"
  network_border_group = "ap-northeast-1"
  network_interface    = "eni-0b39b1f4b80d9b136"
  public_ipv4_pool     = "amazon"

  tags = {
    Name = "guteam-console"
  }

  tags_all = {
    Name = "guteam-console"
  }

  vpc = "true"
}
