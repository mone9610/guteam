Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :posts
      resources :health_check, only: :index
    end
  end
end
