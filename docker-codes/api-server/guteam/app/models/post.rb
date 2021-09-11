class Post < ApplicationRecord
  validates :message, {length: { in: 1..120} }
  belongs_to :user
end
