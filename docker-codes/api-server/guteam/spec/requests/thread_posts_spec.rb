require 'rails_helper'
require 'uri'
require 'net/http'
require 'openssl'

@access_token = TokenService.get_token
auth='Bearer ' + @access_token

RSpec.describe 'ThreadsPosts', type: :request do
  before do
    @headers = {
      'Authorization' => auth,
    }
  end
  describe 'GET /api/v1/thread_posts' do
    it 'tokenがheaderに入っており、レコードが5件存在するとき、GETのレスポンスコードが200、かつ5件のデータが返ってくること' do
      FactoryBot.create_list(:thread_post, 5)
      get '/api/v1/thread_posts', headers: @headers
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json.length).to eq(5)
    end

    it 'tokenがheaderに入っていないとき、GETのレスポンスコードが401' do
      get '/api/v1/thread_posts', headers: { 'Authorization' => "hogehoge" }
      expect(response).to have_http_status(401)
    end
  end

  describe 'GET /api/v1/thread_posts/:id' do
    it 'tokenがheaderに入っており、パラメータのthread_idが存在するとき、GETのレスポンスコードが200、かつthread_idが一致する1件のデータが返ってくること' do
      thread_post = FactoryBot.create(:thread_post)
      get "/api/v1/thread_posts/#{thread_post.community_thread_id}", headers: @headers
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json.length).to eq(7)
      expect(json['community_thread_id']).to eq(thread_post.community_thread_id)
    end

    it 'tokenがheaderに入っており、パラメータのidが存在しないとき、GETのレスポンスコードが404になること' do
      get '/api/v1/thread_posts/00000000', headers: @headers
      expect(response).to have_http_status(404)
    end
  end

  describe 'POST /api/v1/thread_posts' do
    it 'tokenがheaderに入っており、body内にparamが存在するとき、POSTのレスポンスコードが200、かつ指定した値と同値のレコードが返ってくること' do
      community_thread = FactoryBot.create(:community_thread)
      @params = {
        'community_thread_id' => community_thread.id,
        'message' => 'test_message'
      }
      post '/api/v1/thread_posts', headers: @headers, params: @params
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json['message']).to eq(@params['message'])
    end
  end
end
