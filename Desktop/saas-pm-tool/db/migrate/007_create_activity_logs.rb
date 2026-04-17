# db/migrate/007_create_activity_logs.rb
class CreateActivityLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :activity_logs do |t|
      t.references :user, foreign_key: true
      t.string :action
      t.string :trackable_type
      t.integer :trackable_id
      t.jsonb :details
      
      t.timestamps
    end
    add_index :activity_logs, [:trackable_type, :trackable_id]
  end
end
