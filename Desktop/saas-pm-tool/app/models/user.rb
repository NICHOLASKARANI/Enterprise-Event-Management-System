# app/models/user.rb
class User < ApplicationRecord
  # Include default devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  
  belongs_to :account, optional: true
  has_many :owned_projects, class_name: "Project", foreign_key: "owner_id"
  has_many :assigned_tasks, class_name: "Task", foreign_key: "assignee_id"
  has_many :created_tasks, class_name: "Task", foreign_key: "creator_id"
  has_many :comments
  has_many :project_members
  has_many :projects, through: :project_members
  has_many :activity_logs
  has_many :notifications, as: :recipient
  
  rolify
  
  validates :first_name, :last_name, presence: true
  
  def full_name
    "#{first_name} #{last_name}"
  end
  
  def admin?
    has_role?(:admin) || role == "admin"
  end
  
  def can_manage_project?(project)
    project.owner_id == id || admin?
  end
end
