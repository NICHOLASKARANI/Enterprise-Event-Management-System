cat > app/controllers/notifications_controller.rb << 'EOF'
class NotificationsController < ApplicationController
  def index
    @notifications = current_user.notifications.order(created_at: :desc)
  end
  
  def mark_as_read
    @notification = current_user.notifications.find(params[:id])
    @notification.update(read_at: Time.current)
    redirect_to notifications_path, notice: "Notification marked as read"
  end
end
EOF