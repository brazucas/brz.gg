resource "aws_route53_record" "brz_gg" {
  zone_id = data.terraform_remote_state.brz_state.outputs.brz_gg_zone_id
  name    = "brz.gg"
  type    = "A"

  alias {
    name = aws_s3_bucket_website_configuration.brz_gg_website.website_domain
    zone_id = aws_s3_bucket.brz_gg.hosted_zone_id
    evaluate_target_health = false
  }
}