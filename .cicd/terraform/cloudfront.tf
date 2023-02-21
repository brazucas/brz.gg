resource "aws_acm_certificate" "cert" {
  provider = aws.us-east-1
  domain_name       = local.brz_gg_domain
  validation_method = "DNS"
  subject_alternative_names = [local.www_brz_gg_domain]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  name = "${aws_acm_certificate.cert.domain_validation_options.*.resource_record_name[0]}"
  type = "${aws_acm_certificate.cert.domain_validation_options.*.resource_record_type[0]}"
  zone_id = data.terraform_remote_state.brz_state.outputs.brz_gg_zone_id
  records = ["${aws_acm_certificate.cert.domain_validation_options.*.resource_record_value[0]}"]
  ttl = 60
} 

resource "aws_route53_record" "www_cert_validation" {
  name = "${aws_acm_certificate.cert.domain_validation_options.*.resource_record_name[1]}"
  type = "${aws_acm_certificate.cert.domain_validation_options.*.resource_record_type[1]}"
  zone_id = data.terraform_remote_state.brz_state.outputs.brz_gg_zone_id
  records = ["${aws_acm_certificate.cert.domain_validation_options.*.resource_record_value[1]}"]
  ttl = 60
} 

resource "aws_acm_certificate_validation" "cert" {
  provider = aws.us-east-1
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = ["${aws_route53_record.cert_validation.fqdn}", "${aws_route53_record.www_cert_validation.fqdn}"]
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = local.brz_gg_domain
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.brz_gg.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "brz-cloudfront"
  default_root_object = "index.html"

  # Configure logging here if required 	
#   logging_config {
#    include_cookies = false
#    bucket          = local.brz_gg_domain
#    prefix          = "brz_gg"
#   }

  aliases = [local.brz_gg_domain, local.www_brz_gg_domain]

  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.s3_origin_id
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  # Cache behavior with precedence 0
  ordered_cache_behavior {
    path_pattern     = "/images/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false
      headers      = ["Origin"]

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  ordered_cache_behavior {
    path_pattern     = "/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false
      headers      = ["Origin"]

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "blacklist"
      locations        = ["CN", "RU", "IN", "PK"]
    }
  }

  tags = {
    Environment = "Production"
    Name        = "brz"
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate_validation.cert.certificate_arn
    ssl_support_method = "sni-only"
  }
}
