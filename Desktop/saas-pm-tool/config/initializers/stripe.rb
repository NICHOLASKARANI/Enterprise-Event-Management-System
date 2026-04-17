# config/initializers/stripe.rb
Stripe.api_key = ENV["STRIPE_SECRET_KEY"]
Stripe.webhook_secret = ENV["STRIPE_WEBHOOK_SECRET"]