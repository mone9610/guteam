class Api::V1::CommunityThreadsController < SecuredController
  def index
    communities = Community.all
    render json: communities
  end
end
