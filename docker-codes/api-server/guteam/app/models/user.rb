class User < ApplicationRecord
  validates :sub, { presence: true, uniqueness: true }
  validates :name, { length: { maximum: 16 } }
  validates :introduction, { length: { maximum: 120 } }
  has_many :posts, dependent: :destroy
  has_many :community_threads, dependent: :destroy
  has_many :thread_posts, dependent: :destroy

  def self.from_token_payload(payload)
    @sub = payload['sub'].gsub(/auth0\|/, '')
    find_by(sub: @sub) || create!(sub: @sub)
  end
end
