class Api::V1::HealthCheckController < ApplicationController
  def index
    logger.info "============================================================"
    logger.info "ReuqestUrl: #{request.url}"
    # deep health check with database
    users = User.all
    if users.present?
      render json: {status: 200}, status: 200
    end
  end
end
