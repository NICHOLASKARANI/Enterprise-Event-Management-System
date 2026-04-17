# db/migrate/003_create_projects.rb
class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.text :description
      t.string :status, default: "active"
      t.date :start_date
      t.date :end_date
      t.references :account, foreign_key: true
      t.references :owner, foreign_key: { to_table: :users }
      
      t.timestamps
    end
  end
end
