class Api::V1::CommunityThreadsController < SecuredController
  def index
    if params[:community_id].blank?
      community_threads = CommunityThread.all
      render json: community_threads
    else
      community_threads = CommunityThread.where(community_id: params[:community_id])
      if community_threads.present?
        render json: community_threads
      else
        render json: { status: 404 }, status: :not_found
      end
    end
  end

  def show
    community_thread = CommunityThread.find_by_id(params[:id])
    if community_thread.present?
      render json: community_thread
    else
      render json: { status: 404 }, status: :not_found
    end
  end

  def create
    community_thread = @current_user.community_threads.build(post_params)

    if community_thread.save
      render json: community_thread
    else
      render json: community_thread.errors, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.permit(:community_id,:title,:description,:image_url)
  end
end
