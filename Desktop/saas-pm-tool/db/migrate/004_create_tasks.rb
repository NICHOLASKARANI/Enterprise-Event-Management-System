# db/migrate/004_create_tasks.rb
class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.string :status, default: "todo"
      t.string :priority, default: "medium"
      t.date :due_date
      t.integer :position
      t.references :project, foreign_key: true
      t.references :assignee, foreign_key: { to_table: :users }
      t.references :creator, foreign_key: { to_table: :users }
      
      t.timestamps
    end
  end
end
