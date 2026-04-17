cat > app/controllers/dashboard_controller.rb << 'EOF'
class DashboardController < ApplicationController
  def index
    @projects = Current.account.projects.active.limit(5)
    @recent_tasks = Task.joins(:project)
                        .where(projects: { account_id: Current.account.id })
                        .where(assignee_id: current_user)
                        .order(created_at: :desc)
                        .limit(10)
    @overdue_tasks = Task.joins(:project)
                         .where(projects: { account_id: Current.account.id })
                         .where(assignee_id: current_user)
                         .overdue
    @activity_logs = ActivityLog.joins(:user)
                                .where(users: { account_id: Current.account.id })
                                .order(created_at: :desc)
                                .limit(20)
  end
end
EOF