mkdir -p app/models
cat > app/models/current.rb << 'EOF'
class Current < ActiveSupport::CurrentAttributes
  attribute :user
  attribute :account
end
EOF