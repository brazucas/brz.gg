output "bucket_website_url" {
  value = aws_s3_bucket_website_configuration.brz_gg_website.website_domain
}