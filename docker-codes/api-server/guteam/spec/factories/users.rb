FactoryBot.define do 
  factory :user do 
    name {'guteam'}
    sequence(:sub) { |n| "sub1234#{n}abcd" }
    introduction {'guteam'}
  end 
end 