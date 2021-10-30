class Api::V1::ThreadPostsController < SecuredController
  def index
    if params[:community_thread_id].blank?
      thread_posts = ThreadPost.all
      render json: thread_posts
    else
      thread_posts = ThreadPost.where(community_thread_id: params[:community_thread_id])
      if thread_posts.present?
        render json: thread_posts
      else
        render json: { status: 404 }, status: :not_found
      end
    end
  end

  def show
    thread_post = ThreadPost.find_by_id(params[:id])
    if thread_post.present?
      render json: thread_post
    else
      render json: { status: 404 }, status: :not_found
    end
  end

  def create
    thread_post = @current_user.thread_posts.build(post_params)

    if thread_post.save
      render json: thread_post
    else
      render json: thread_post.errors, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.permit(:community_thread_id, :message)
  end
end
