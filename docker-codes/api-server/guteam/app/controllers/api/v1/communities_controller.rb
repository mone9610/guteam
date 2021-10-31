class Api::V1::CommunitiesController < SecuredController
  def index
    communities = Community.all
    render json: communities
  end

  def show
    community = Community.find_by_id(params[:id])
    if community.present?
      render json: community
    else
      render json: { status: 404 }, status: :not_found
    end
  end
end
