class Api::V1::UsersController < SecuredController
    # skip_before_action :authorize_request, only: [:show]

    def index
        users = User.all
        render json: users
    end
    
      def show
        #ToDo:URLのパスパラメータが:idとして定義されているので、subに直したい
        user = User.find_by(sub: params[:id])
        render json: user
      end
    
      def create
        user = @current_user.users.build(post_params)
    
        if user.save
          render json: user
        else
          render json: user.errors, status: :unprocessable_entity
        end
      end

      def update
        user = User.find_by(sub: params[:id])
        user.update(put_params)
        if user.save
          render json: user
        else
          render json: user.errors, status: :unprocessable_entity
        end
      end
      
      def destroy
        user = User.find(params[:id])
        user.delete
      end
    
      private
    
      def post_params
        params.permit(:name,:introduction,:picture_url)
      end

      def put_params
        params.permit(:name,:introduction,:picture_url)
      end
end
