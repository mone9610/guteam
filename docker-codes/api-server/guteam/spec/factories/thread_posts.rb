FactoryBot.define do
  factory :thread_post do
    community_thread
    user
    message { 'factory_community_thread_post' }
    is_deleted { false }
  end
end
