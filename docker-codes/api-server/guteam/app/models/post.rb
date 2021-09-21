class Post < ApplicationRecord
  validates :message, { length: { in: 1..160 } }
  belongs_to :user
end
