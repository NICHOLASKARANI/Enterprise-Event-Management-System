# db/migrate/001_create_users.rb
class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :encrypted_password, null: false
      t.string :first_name
      t.string :last_name
      t.string :avatar
      t.string :role, default: "member"
      t.boolean :active, default: true
      t.boolean :email_notifications, default: true
      t.references :account, foreign_key: true
      
      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
