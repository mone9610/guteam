class ThreadPost < ApplicationRecord
  belongs_to :community_thread
  belongs_to :user
  validates :message, { length: { in: 1..160 } }
end
