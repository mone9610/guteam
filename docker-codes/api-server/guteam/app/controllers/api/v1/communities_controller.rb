class Api::V1::CommunitiesController < SecuredController
    def index
        communities = Community.all
        render json: communities
    end
end
