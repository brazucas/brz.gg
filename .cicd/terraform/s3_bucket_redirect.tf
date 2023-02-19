resource "aws_s3_bucket" "www_brz_gg" {
  bucket = "www.brz.gg"

  tags = {
    Name = "website"
  }
}

resource "aws_s3_bucket_website_configuration" "www_brz_gg_website" {
  bucket = aws_s3_bucket.www_brz_gg.id
  
  redirect_all_requests_to {
    host_name = "brz.gg"
    protocol  = "https"
  }
}