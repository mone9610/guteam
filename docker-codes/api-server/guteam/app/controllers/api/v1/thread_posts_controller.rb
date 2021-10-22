class Api::V1::ThreadPostsController < SecuredController
  def index
    thread_posts = ThreadPost.all
    render json: thread_posts
  end

  def show
    thread_posts = ThreadPost.find_by(community_thread_id: params[:id])
    if thread_posts.present?
      render json: thread_posts
    else
      render json: thread_posts&.errors, status: :not_found
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
