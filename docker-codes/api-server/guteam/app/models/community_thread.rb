class CommunityThread < ApplicationRecord
  belongs_to :user
  belongs_to :community
  validates :title, { length: { in: 1..32 } }
  validates :description, { length: { in: 1..64 } }
end
