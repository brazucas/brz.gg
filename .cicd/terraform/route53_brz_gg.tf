resource "aws_route53_record" "brz_gg" {
  zone_id = data.terraform_remote_state.brz_state.outputs.brz_gg_zone_id
  name    = "brz.gg"
  type    = "A"

  alias {
    name = "${aws_cloudfront_distribution.s3_distribution.domain_name}"
    zone_id = "${aws_cloudfront_distribution.s3_distribution.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_brz_gg" {
  zone_id = data.terraform_remote_state.brz_state.outputs.brz_gg_zone_id
  name    = "www.brz.gg"
  type    = "A"

  alias {
    name = aws_s3_bucket_website_configuration.www_brz_gg_website.website_domain
    zone_id = aws_s3_bucket.www_brz_gg.hosted_zone_id
    evaluate_target_health = false
  }
}