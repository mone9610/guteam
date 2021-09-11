class Api::V1::PostsController < SecuredController
  # skip_before_action :authorize_request, only: [:index,:show]

  def index
    posts = Post.all
    render json: posts
  end

  def show
    post = Post.find_by_id(params[:id])
    if post.present?
      render json: post
    else
      render json: post&.errors, status: :not_found
    end
  end

  def create
    post = @current_user.posts.build(post_params)

    if post.save
      render json: post
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  def update
    post = Post.find_by_id(params[:id])
    post&.update(put_params)
    if post&.save
      render json: post
    else
      render json: post&.errors, status: :unprocessable_entity
    end
  end

  def destroy
    post = Post.find_by_id(params[:id])
    post&.delete
    if post&.delete
      render status: :ok
    else
      render json: post&.errors, status: :not_found
    end
  end

  private
  def put_params
    params.permit(:is_deleted)
  end

  def post_params
    params.permit(:message)
  end
end
