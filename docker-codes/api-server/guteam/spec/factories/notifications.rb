FactoryBot.define do
  factory :notification do
    message { "guteam" }
    from_user_id { 1 }
    to_user_id { 0 }
  end
end
