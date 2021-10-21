class ThreadPost < ApplicationRecord
  belongs_to :communityThread
  belongs_to :user
  validates :message, { length: { in: 1..160 } }
end
