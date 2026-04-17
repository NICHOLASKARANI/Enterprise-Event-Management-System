cat > app/controllers/comments_controller.rb << 'EOF'
class CommentsController < ApplicationController
  before_action :set_task
  
  def create
    @comment = @task.comments.build(comment_params)
    @comment.user = current_user
    
    if @comment.save
      redirect_to project_path(@task.project), notice: "Comment added"
    else
      redirect_to project_path(@task.project), alert: "Could not add comment"
    end
  end
  
  def destroy
    @comment = @task.comments.find(params[:id])
    @comment.destroy
    redirect_to project_path(@task.project), notice: "Comment deleted"
  end
  
  private
  
  def set_task
    @task = Task.find(params[:task_id])
  end
  
  def comment_params
    params.require(:comment).permit(:content)
  end
end
EOF