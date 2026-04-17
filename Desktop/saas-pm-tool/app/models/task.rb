# app/models/task.rb
class Task < ApplicationRecord
  belongs_to :project
  belongs_to :assignee, class_name: "User", optional: true
  belongs_to :creator, class_name: "User"
  has_many :comments, dependent: :destroy
  
  validates :title, presence: true
  validates :status, inclusion: { in: %w[todo in_progress review done] }
  validates :priority, inclusion: { in: %w[low medium high urgent] }
  
  scope :by_status, ->(status) { where(status: status) if status.present? }
  scope :overdue, -> { where("due_date < ?", Date.today).where.not(status: "done") }
  
  after_create :log_creation
  after_update :log_update, if: :saved_changes?
  
  def status_badge_color
    case status
    when "todo" then "secondary"
    when "in_progress" then "primary"
    when "review" then "warning"
    when "done" then "success"
    end
  end
  
  def priority_badge_color
    case priority
    when "low" then "info"
    when "medium" then "primary"
    when "high" then "warning"
    when "urgent" then "danger"
    end
  end
  
  private
  
  def log_creation
    ActivityLog.create!(
      user: creator,
      action: "created_task",
      trackable: self,
      details: { task_title: title, project_name: project.name }
    )
  end
  
  def log_update
    ActivityLog.create!(
      user: Current.user,
      action: "updated_task",
      trackable: self,
      details: { changes: saved_changes }
    )
  end
end