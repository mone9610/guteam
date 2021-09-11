class User < ApplicationRecord
    validates :sub, {presence: true, uniqueness: true}
    # validates :name, {length: {in: 1..16} }
    # validates :introduction, {length: {in: 1..120} }
    has_many :posts, dependent: :destroy
  
    def self.from_token_payload(payload)
      @sub = payload['sub'].gsub(/auth0\|/,"")
      # find_by(sub: @sub)
      #subをキーに検索して、存在しない場合ユーザーを自動的に作成
      find_by(sub: @sub) || create!(sub: @sub)
      # find_by(sub: payload['sub']) || create!(sub: payload['sub'])
    end
end