# config/environments/production.rb
# Add these lines:
config.action_mailer.default_url_options = { host: "yourdomain.com", protocol: "https" }
config.action_cable.allowed_request_origins = ["https://yourdomain.com"]