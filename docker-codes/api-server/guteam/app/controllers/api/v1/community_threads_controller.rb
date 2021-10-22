class Api::V1::CommunityThreadsController < SecuredController
  def index
    community_threads = CommunityThread.all
    render json: community_threads
  end

  def show
    community_thread = CommunityThread.find_by_id(params[:id])
    if community_thread.present?
      render json: community_thread
    else
      render json: community_thread&.errors, status: :not_found
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
