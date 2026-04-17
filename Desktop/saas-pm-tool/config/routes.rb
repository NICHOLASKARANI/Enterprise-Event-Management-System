Rails.application.routes.draw do
  devise_for :users
  
  resources :projects do
    resources :tasks do
      member do
        patch :update_status
      end
    end
    resources :comments, only: [:create, :destroy]
  end
  
  resources :notifications, only: [:index] do
    member do
      patch :mark_as_read
    end
  end
  
  resources :activity_logs, only: [:index]
  
  namespace :admin do
    resources :users
    resources :accounts
  end
  
  get "dashboard", to: "dashboard#index"
  
  # Billing routes (uncomment when you add Stripe)
  # get "billing", to: "billing#index"
  # post "billing/create_checkout_session", to: "billing#create_checkout_session"
  # post "billing/create_portal_session", to: "billing#create_portal_session"
  # post "stripe/webhook", to: "billing#webhook"
  
  root "dashboard#index"
end