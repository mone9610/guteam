Rails.application.routes.draw do
  get 'notifications/new'
  namespace :api do
    namespace :v1 do
      resources :users
      resources :posts
      resources :notifications
      resources :health_check, only: :index
    end
  end
end
