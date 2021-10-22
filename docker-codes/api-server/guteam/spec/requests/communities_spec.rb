require 'rails_helper'
require 'uri'
require 'net/http'
require 'openssl'

@access_token = TokenService.get_token
auth='Bearer ' + @access_token

RSpec.describe 'Communities', type: :request do
  before do
    @headers = {
      'Authorization' => auth
    }
  end

  describe 'GET /api/v1/communities' do
    it 'tokenがheaderに入っており、レコードが5件存在するとき、GETのレスポンスコードが200、かつ5件のデータが返ってくること' do
      FactoryBot.create_list(:community, 5)
      get '/api/v1/communities', headers: @headers
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json.length).to eq(5)
    end

    it 'tokenがheaderに入っていないとき、GETのレスポンスコードが401' do
      get '/api/v1/communities', headers: {'Authorization' => 'hogehoge'}
      expect(response).to have_http_status(401)
    end
  end

end
