# app/controllers/billing_controller.rb
class BillingController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin!
  
  def index
    @account = Current.account
  end
  
  def create_checkout_session
    @account = Current.account
    
    session = Stripe::Checkout::Session.create(
      payment_method_types: ["card"],
      customer: @account.stripe_customer_id,
      line_items: [{
        price: params[:price_id],
        quantity: 1
      }],
      mode: "subscription",
      success_url: billing_success_url,
      cancel_url: billing_cancel_url
    )
    
    render json: { id: session.id }
  end
  
  def create_portal_session
    session = Stripe::BillingPortal::Session.create(
      customer: Current.account.stripe_customer_id,
      return_url: billing_url
    )
    
    redirect_to session.url, allow_other_host: true
  end
  
  def webhook
    payload = request.body.read
    sig_header = request.env["HTTP_STRIPE_SIGNATURE"]
    event = nil
    
    begin
      event = Stripe::Webhook.construct_event(
        payload, sig_header, ENV["STRIPE_WEBHOOK_SECRET"]
      )
    rescue JSON::ParserError, Stripe::SignatureVerificationError => e
      render json: { error: e.message }, status: 400
      return
    end
    
    case event.type
    when "customer.subscription.updated"
      handle_subscription_update(event.data.object)
    when "customer.subscription.deleted"
      handle_subscription_cancel(event.data.object)
    end
    
    render json: { received: true }
  end
  
  private
  
  def handle_subscription_update(subscription)
    account = Account.find_by(stripe_customer_id: subscription.customer)
    return unless account
    
    account.update(
      plan: map_stripe_plan(subscription.items.data.first.price.id),
      stripe_subscription_id: subscription.id,
      subscription_ends_at: Time.at(subscription.current_period_end)
    )
  end
  
  def handle_subscription_cancel(subscription)
    account = Account.find_by(stripe_subscription_id: subscription.id)
    return unless account
    
    account.update(
      plan: "free",
      stripe_subscription_id: nil,
      subscription_ends_at: nil
    )
  end
  
  def map_stripe_plan(price_id)
    plans = {
      "price_pro_monthly" => "pro",
      "price_business_monthly" => "business"
    }
    plans[price_id] || "free"
  end
  
  def require_admin!
    redirect_to root_path, alert: "Access denied" unless current_user.admin?
  end
end