require 'rails_helper'
require 'uri'
require 'net/http'
require 'openssl'

@access_token = TokenService.get_token
auth='Bearer ' + @access_token

RSpec.describe 'Notifications', type: :request do
  before do
    @headers = {
    'Authorization' => auth,
    }
  end
  describe 'GET /api/v1/notifications' do
    it 'tokenがheaderに入っており、データが存在しない時、戻り値のデータ件数が0件、かつGETのレスポンスコードが200' do
      get '/api/v1/notifications',headers: @headers
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json.length).to eq(0)
    end

    it 'tokenがheaderに入っているとき、GETのレスポンスコードが200、かつ5件のデータが返ってくること' do
      FactoryBot.create_list(:notification, 5)
      get '/api/v1/notifications', headers: @headers
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json.length).to eq(5)
    end


  end

  describe 'GET /api/v1/notifications:id' do
    it 'tokenがheaderに入っており、パラメータ内のsubが存在するとき、GETのレスポンスコードが200、かつ指定したsubのレコードと、to_user_idが1のレコードが返ってくること' do
      FactoryBot.create(:notification, to_user_id: 0 )
      notification_to_user = FactoryBot.create(:notification, to_user_id: 1 )
      get '/api/v1/notifications/' + notification_to_user.to_user_id.to_s, headers: @headers
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json.length).to eq(2)
    end

    it 'tokenがheaderに入っており、パラメータ内のsubが存在しないとき、GETのレスポンスコードが404が返ってくること' do
      get '/api/v1/notifications/notexist', headers: @headers
      expect(response).to have_http_status(404)
    end
  end



end
