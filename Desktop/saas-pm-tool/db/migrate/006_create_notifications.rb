# db/migrate/006_create_notifications.rb
class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.references :recipient, polymorphic: true
      t.string :type
      t.jsonb :params
      t.datetime :read_at
      
      t.timestamps
    end
  end
end
