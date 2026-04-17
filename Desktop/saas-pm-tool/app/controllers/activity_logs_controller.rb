cat > app/controllers/activity_logs_controller.rb << 'EOF'
class ActivityLogsController < ApplicationController
  def index
    @activity_logs = ActivityLog.joins(:user)
                                .where(users: { account_id: Current.account.id })
                                .order(created_at: :desc)
                                .page(params[:page])
  end
end
EOF