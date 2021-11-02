class Api::V1::UsersController < SecuredController
    # skip_before_action :authorize_request, only: [:show]

    def index
        users = User.all
        render json: users
    end
    
      def show
        #ToDo:URLのパスパラメータが:idとして定義されているので、subに直したい
        user = User.find_by(sub: params[:id])
        if user.present?
          render json: user
        else
          render json: user&.errors, status: :not_found
        end
      end
    
      def create
        # user = @current_user.users.build(post_params)
        user = User.create(post_params)
    
        if user.save
          render json: user
        else
          render json: user.errors, status: :unprocessable_entity
        end
      end

      def update
        user = User.find_by(sub: params[:id])
        user&.update(put_params)
        if user&.save
          render json: user
        else
          render json: user&.errors, status: :unprocessable_entity
        end
      end
      
      def destroy
        user = User.find_by(sub: params[:id])
        if user&.delete
          render status: :ok
        else
          render json: user&.errors, status: :not_found
        end
      end
    
      private
    
      def post_params
        params.permit(:name,:sub,:introduction,:image_url)
      end

      def put_params
        params.permit(:name,:introduction,:image_url)
      end
end
