# app/models/account.rb
class Account < ApplicationRecord
  belongs_to :owner, class_name: "User", optional: true
  has_many :users
  has_many :projects
  
  validates :name, :subdomain, presence: true
  validates :subdomain, uniqueness: true, format: { with: /\A[a-z0-9-]+\z/ }
  
  PLAN_LIMITS = {
    "free" => { max_users: 5, max_projects: 3 },
    "pro" => { max_users: 20, max_projects: 50 },
    "business" => { max_users: 100, max_projects: 500 }
  }.freeze
  
  def plan_limit
    PLAN_LIMITS[plan] || PLAN_LIMITS["free"]
  end
  
  def can_add_user?
    users.count < plan_limit[:max_users]
  end
  
  def can_add_project?
    projects.count < plan_limit[:max_projects]
  end
end
