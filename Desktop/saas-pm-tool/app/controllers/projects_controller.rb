# app/controllers/projects_controller.rb
class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  before_action :authorize_project!, except: [:index, :new, :create]
  
  def index
    @projects = policy_scope(Project).includes(:owner, :tasks).order(created_at: :desc)
    @pagy, @projects = pagy(@projects)
  end
  
  def show
    @tasks = @project.tasks.order(position: :asc)
    @kanban_tasks = @tasks.group_by(&:status)
    @new_task = @project.tasks.build
  end
  
  def new
    @project = Project.new
    authorize @project
  end
  
  def create
    @project = Project.new(project_params)
    @project.account = Current.account
    @project.owner = current_user
    
    authorize @project
    
    if @project.save
      redirect_to @project, notice: "Project was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  def update
    if @project.update(project_params)
      redirect_to @project, notice: "Project was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end
  
  def destroy
    @project.destroy
    redirect_to projects_url, notice: "Project was successfully deleted."
  end
  
  private
  
  def set_project
    @project = Project.find(params[:id])
  end
  
  def project_params
    params.require(:project).permit(:name, :description, :status, :start_date, :end_date)
  end
  
  def authorize_project!
    authorize @project
  end
end
