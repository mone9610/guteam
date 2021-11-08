resource "aws_route53_record" "tfer--Z01965944RVT4NYZDDN1__b3b81a7c60f3a8003004b56f5e865091-002E-admin-002E-guteam-002E-net-002E-_CNAME_" {
  name    = "_b3b81a7c60f3a8003004b56f5e865091.admin.guteam.net"
  records = ["_6893b25bd54716bf3bd805d9e0d9b5fe.bnpptgxfyj.acm-validations.aws."]
  ttl     = "300"
  type    = "CNAME"
  zone_id = "${aws_route53_zone.tfer--Z01965944RVT4NYZDDN1_admin-002E-guteam-002E-net.zone_id}"
}

resource "aws_route53_record" "tfer--Z01965944RVT4NYZDDN1_admin-002E-guteam-002E-net-002E-_A_" {
  alias {
    evaluate_target_health = "false"
    name                   = "guteam-prod-alb-for-console-163220266.ap-northeast-1.elb.amazonaws.com"
    zone_id                = "Z14GRHDCWA56QT"
  }

  name    = "admin.guteam.net"
  type    = "A"
  zone_id = "${aws_route53_zone.tfer--Z01965944RVT4NYZDDN1_admin-002E-guteam-002E-net.zone_id}"
}

resource "aws_route53_record" "tfer--Z01965944RVT4NYZDDN1_admin-002E-guteam-002E-net-002E-_NS_" {
  name    = "admin.guteam.net"
  records = ["ns-1253.awsdns-28.org.", "ns-280.awsdns-35.com.", "ns-799.awsdns-35.net.", "ns-1777.awsdns-30.co.uk."]
  ttl     = "172800"
  type    = "NS"
  zone_id = "${aws_route53_zone.tfer--Z01965944RVT4NYZDDN1_admin-002E-guteam-002E-net.zone_id}"
}

resource "aws_route53_record" "tfer--Z01965944RVT4NYZDDN1_admin-002E-guteam-002E-net-002E-_SOA_" {
  name    = "admin.guteam.net"
  records = ["ns-799.awsdns-35.net. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400"]
  ttl     = "900"
  type    = "SOA"
  zone_id = "${aws_route53_zone.tfer--Z01965944RVT4NYZDDN1_admin-002E-guteam-002E-net.zone_id}"
}

resource "aws_route53_record" "tfer--Z03521113BC829TGMOFE__ee16b893a6db644eceabd8c98fb3334a-002E-api-002E-guteam-002E-net-002E-_CNAME_" {
  name    = "_ee16b893a6db644eceabd8c98fb3334a.api.guteam.net"
  records = ["_5fb67427825472fd09417bfcbce50451.bnpptgxfyj.acm-validations.aws."]
  ttl     = "300"
  type    = "CNAME"
  zone_id = "${aws_route53_zone.tfer--Z03521113BC829TGMOFE_api-002E-guteam-002E-net.zone_id}"
}

resource "aws_route53_record" "tfer--Z03521113BC829TGMOFE_api-002E-guteam-002E-net-002E-_A_" {
  alias {
    evaluate_target_health = "true"
    name                   = "guteam-prod-alb-826510378.ap-northeast-1.elb.amazonaws.com"
    zone_id                = "Z14GRHDCWA56QT"
  }

  name    = "api.guteam.net"
  type    = "A"
  zone_id = "${aws_route53_zone.tfer--Z03521113BC829TGMOFE_api-002E-guteam-002E-net.zone_id}"
}

resource "aws_route53_record" "tfer--Z03521113BC829TGMOFE_api-002E-guteam-002E-net-002E-_NS_" {
  name    = "api.guteam.net"
  records = ["ns-1353.awsdns-41.org.", "ns-1951.awsdns-51.co.uk.", "ns-482.awsdns-60.com.", "ns-669.awsdns-19.net."]
  ttl     = "172800"
  type    = "NS"
  zone_id = "${aws_route53_zone.tfer--Z03521113BC829TGMOFE_api-002E-guteam-002E-net.zone_id}"
}

resource "aws_route53_record" "tfer--Z03521113BC829TGMOFE_api-002E-guteam-002E-net-002E-_SOA_" {
  name    = "api.guteam.net"
  records = ["ns-669.awsdns-19.net. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400"]
  ttl     = "900"
  type    = "SOA"
  zone_id = "${aws_route53_zone.tfer--Z03521113BC829TGMOFE_api-002E-guteam-002E-net.zone_id}"
}

resource "aws_route53_record" "tfer--Z058643319ASP7HZRKEY3__2c6ec5f4e65d90a5fb761d5a2499ea77-002E-guteam-002E-net-002E-_CNAME_" {
  name    = "_2c6ec5f4e65d90a5fb761d5a2499ea77.guteam.net"
  records = ["_05c13b2fbb5763c4aa60401cb26181d8.lwzrbtbdjq.acm-validations.aws."]
  ttl     = "300"
  type    = "CNAME"
  zone_id = "${aws_route53_zone.tfer--Z058643319ASP7HZRKEY3_guteam-002E-net.zone_id}"
}

resource "aws_route53_record" "tfer--Z058643319ASP7HZRKEY3_admin-002E-guteam-002E-net-002E-_NS_" {
  name    = "admin.guteam.net"
  records = ["ns-799.awsdns-35.net.", "ns-1253.awsdns-28.org.", "ns-280.awsdns-35.com.", "ns-1777.awsdns-30.co.uk."]
  ttl     = "300"
  type    = "NS"
  zone_id = "${aws_route53_zone.tfer--Z058643319ASP7HZRKEY3_guteam-002E-net.zone_id}"
}

resource "aws_route53_record" "tfer--Z058643319ASP7HZRKEY3_api-002E-guteam-002E-net-002E-_NS_" {
  name    = "api.guteam.net"
  records = ["ns-1353.awsdns-41.org.", "ns-1951.awsdns-51.co.uk.", "ns-482.awsdns-60.com.", "ns-669.awsdns-19.net."]
  ttl     = "300"
  type    = "NS"
  zone_id = "${aws_route53_zone.tfer--Z058643319ASP7HZRKEY3_guteam-002E-net.zone_id}"
}

resource "aws_route53_record" "tfer--Z058643319ASP7HZRKEY3_guteam-002E-net-002E-_A_" {
  alias {
    evaluate_target_health = "false"
    name                   = "di6awbp2jzjxr.cloudfront.net"
    zone_id                = "Z2FDTNDATAQYW2"
  }

  name    = "guteam.net"
  type    = "A"
  zone_id = "${aws_route53_zone.tfer--Z058643319ASP7HZRKEY3_guteam-002E-net.zone_id}"
}

resource "aws_route53_record" "tfer--Z058643319ASP7HZRKEY3_guteam-002E-net-002E-_NS_" {
  name    = "guteam.net"
  records = ["ns-1876.awsdns-42.co.uk.", "ns-601.awsdns-11.net.", "ns-179.awsdns-22.com.", "ns-1141.awsdns-14.org."]
  ttl     = "172800"
  type    = "NS"
  zone_id = "${aws_route53_zone.tfer--Z058643319ASP7HZRKEY3_guteam-002E-net.zone_id}"
}

resource "aws_route53_record" "tfer--Z058643319ASP7HZRKEY3_guteam-002E-net-002E-_SOA_" {
  name    = "guteam.net"
  records = ["ns-179.awsdns-22.com. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400"]
  ttl     = "900"
  type    = "SOA"
  zone_id = "${aws_route53_zone.tfer--Z058643319ASP7HZRKEY3_guteam-002E-net.zone_id}"
}
