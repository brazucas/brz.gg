resource "aws_s3_bucket" "www_brz_gg" {
  bucket = local.www_brz_gg_domain

  tags = {
    Name = "website"
  }
}

resource "aws_s3_bucket_website_configuration" "www_brz_gg_website" {
  bucket = aws_s3_bucket.www_brz_gg.id
  
  redirect_all_requests_to {
    host_name = local.brz_gg_domain
    protocol  = "https"
  }
}