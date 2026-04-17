# app/models/project.rb
class Project < ApplicationRecord
  belongs_to :account
  belongs_to :owner, class_name: "User"
  has_many :tasks, dependent: :destroy
  has_many :project_members, dependent: :destroy
  has_many :members, through: :project_members, source: :user
  
  validates :name, presence: true
  validates :status, inclusion: { in: %w[active archived completed] }
  
  scope :active, -> { where(status: "active") }
  
  after_create :add_owner_as_member
  
  def progress
    return 0 if tasks.count.zero?
    completed_tasks = tasks.where(status: "done").count
    (completed_tasks.to_f / tasks.count * 100).round
  end
  
  private
  
  def add_owner_as_member
    members << owner
  end
end
