FactoryBot.define do
  factory :post do
    user
    message{"example message no:#{rand(200)}"}
  end
end