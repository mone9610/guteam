require 'rails_helper'
require 'uri'
require 'net/http'
require 'openssl'

@access_token = TokenService.get_token
auth='Bearer ' + @access_token

RSpec.describe 'CommunityThreads', type: :request do
  before do
    @headers = {
      'Authorization' => auth
    }
  end

  describe 'GET /api/v1/community_threads' do
    it 'tokenがheaderに入っており、レコードが5件存在するとき、GETのレスポンスコードが200、かつ5件のデータが返ってくること' do
      FactoryBot.create_list(:community_thread, 5)
      get '/api/v1/community_threads', headers: @headers
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json.length).to eq(5)
    end

    it 'tokenがheaderに入っていないとき、GETのレスポンスコードが401' do
      get '/api/v1/community_threads', headers: { 'Authorization' => 'hogehoge' }
      expect(response).to have_http_status(401)
    end
  end

  describe 'GET /api/v1/community_threads/:id' do
    it 'tokenがheaderに入っており、パラメータのidが存在するとき、GETのレスポンスコードが200、かつidが一致する1件のデータが返ってくること' do
      community_thread = FactoryBot.create(:community_thread)
      get "/api/v1/community_threads/#{community_thread.id}", headers: @headers
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json.length).to eq(8)
      expect(json['id']).to eq(community_thread.id)
    end

    it 'tokenがheaderに入っており、パラメータのidが存在しないとき、GETのレスポンスコードが404になること' do
      get '/api/v1/community_threads/00000000', headers: @headers
      expect(response).to have_http_status(404)
    end
  end

  describe 'POST /api/v1/community_threads' do
    it 'tokenがheaderに入っており、body内にparamが存在するとき、POSTのレスポンスコードが200、かつ指定した値と同値のレコードが返ってくること' do
      community = FactoryBot.create(:community)
      @params = {
        'community_id' => community.id,
        'title' => 'test_title',
        'description' => 'test_description',
        'image_url' => 'http://test_image_url',
        }
      post '/api/v1/community_threads', headers: @headers, params: @params
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json['title']).to eq(@params['title'])
      expect(json['community_id']).to eq(@params['community_id'])
      expect(json['description']).to eq(@params['description'])
      expect(json['image_url']).to eq(@params['image_url'])
    end
  end
end
