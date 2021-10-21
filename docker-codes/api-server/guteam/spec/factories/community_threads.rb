FactoryBot.define do
  factory :community_thread do
    community
    user
    title { 'factory community thread' }
    description { 'factory community thread' }
    image_url { 'http://factory-community-thread' }
  end
end
