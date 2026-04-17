# db/migrate/008_create_project_members.rb
class CreateProjectMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :project_members do |t|
      t.references :project, foreign_key: true
      t.references :user, foreign_key: true
      t.string :role, default: "member"
      
      t.timestamps
    end
    add_index :project_members, [:project_id, :user_id], unique: true
  end
end