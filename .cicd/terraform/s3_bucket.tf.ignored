resource "aws_s3_bucket" "brz_gg" {
  bucket = local.s3_origin_id

  tags = {
    Name = "website"
  }
}

resource "aws_s3_bucket_public_access_block" "brz_gg" {
  bucket = aws_s3_bucket.brz_gg.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "brz_gg" {
  bucket = aws_s3_bucket.brz_gg.id

  policy = data.aws_iam_policy_document.aws_s3_bucket_policy.json
}

data "aws_iam_policy_document" "aws_s3_bucket_policy" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      aws_s3_bucket.brz_gg.arn,
      "${aws_s3_bucket.brz_gg.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_versioning" "brz_gg_versioning" {
  bucket = aws_s3_bucket.brz_gg.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "brz_gg_sse" {
  bucket = aws_s3_bucket.brz_gg.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
