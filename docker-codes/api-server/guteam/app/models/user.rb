class User < ApplicationRecord
    has_many :posts, dependent: :destroy
  
    def self.from_token_payload(payload)
      @sub = payload['sub'].gsub(/auth0\|/,"")
      find_by(sub: @sub) || create!(sub: @sub)
      # find_by(sub: payload['sub']) || create!(sub: payload['sub'])
    end
end