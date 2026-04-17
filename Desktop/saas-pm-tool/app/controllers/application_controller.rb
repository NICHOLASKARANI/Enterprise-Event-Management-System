# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  include Pundit::Authorization
  include Pagy::Backend
  
  before_action :authenticate_user!
  before_action :set_current_user
  before_action :set_current_account
  before_action :set_paper_trail_whodunnit
  
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  
  private
  
  def set_current_user
    Current.user = current_user
  end
  
  def set_current_account
    if current_user
      Current.account = current_user.account
    end
  end
  
  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_back(fallback_location: root_path)
  end
end
