# db/migrate/002_create_accounts.rb
class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.string :name
      t.string :subdomain
      t.string :plan, default: "free"
      t.string :stripe_customer_id
      t.string :stripe_subscription_id
      t.datetime :subscription_ends_at
      t.integer :max_users, default: 5
      t.boolean :active, default: true
      
      t.timestamps
    end
    add_index :accounts, :subdomain, unique: true
  end
end
