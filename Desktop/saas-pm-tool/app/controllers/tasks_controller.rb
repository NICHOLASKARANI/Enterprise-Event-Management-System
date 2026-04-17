# app/controllers/tasks_controller.rb
class TasksController < ApplicationController
  before_action :set_project
  before_action :set_task, only: [:show, :edit, :update, :destroy]
  
  def show
  end
  
  def new
    @task = @project.tasks.build
    authorize @task
  end
  
  def create
    @task = @project.tasks.build(task_params)
    @task.creator = current_user
    
    authorize @task
    
    if @task.save
      # Create notification for assignee
      if @task.assignee && @task.assignee != current_user
        Notification.create!(
          recipient: @task.assignee,
          type: "TaskAssignedNotification",
          params: { task: @task, assigner: current_user }
        )
      end
      
      redirect_to @project, notice: "Task was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  def update
    if @task.update(task_params)
      redirect_to @project, notice: "Task was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end
  
  def destroy
    @task.destroy
    redirect_to @project, notice: "Task was successfully deleted."
  end
  
  def update_status
    @task = @project.tasks.find(params[:id])
    authorize @task
    
    if @task.update(status: params[:status])
      render json: { success: true }
    else
      render json: { success: false }, status: :unprocessable_entity
    end
  end
  
  private
  
  def set_project
    @project = Project.find(params[:project_id])
  end
  
  def set_task
    @task = @project.tasks.find(params[:id])
  end
  
  def task_params
    params.require(:task).permit(:title, :description, :status, :priority, :due_date, :assignee_id, :position)
  end
end
