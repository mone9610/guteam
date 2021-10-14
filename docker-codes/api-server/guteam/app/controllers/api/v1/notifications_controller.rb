class Api::V1::NotificationsController < SecuredController

  def index
    notifications = Notification.all
    render json: notifications
  end

  def show
    notification = Notification.where(to_user_id: [0,params[:id]])
    if notification.present?
      render json: notification
    else
      render json: { status: 404 }, status: :not_found
    end
  end
end
