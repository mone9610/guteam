Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :posts
      resources :notifications
      resources :health_check, only: :index
      resources :communities
      resources :community_threads
      resources :thread_posts
    end
  end
end
