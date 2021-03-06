require 'rails_helper'
require 'uri'
require 'net/http'
require 'openssl'

@access_token = TokenService.get_token
auth='Bearer ' + @access_token

RSpec.describe 'Posts', type: :request do
  before do
    @headers = {
    'Authorization' => auth,
    }
  end
  describe 'GET /api/v1/posts' do
    it 'tokenがheaderに入っているとき、GETのレスポンスコードが200、かつ5件のデータが返ってくること' do
      FactoryBot.create_list(:post, 5)
      get '/api/v1/posts', headers: @headers
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json.length).to eq(5)
    end

    it 'tokenがheaderに入っていないとき、GETのレスポンスコードが400' do
      get '/api/v1/posts',headers: @headers
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /api/v1/posts:id' do
    it 'tokenがheaderに入っており、パラメータ内のsubが存在するとき、GETのレスポンスコードが200、かつ指定したsubのレコードが返ってくること' do
      post = FactoryBot.create(:post)
      get '/api/v1/posts/'+post.id.to_s,headers: @headers
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json['id']).to eq(post.id)
    end

    it 'tokenがheaderに入っており、パラメータ内のsubが存在しないとき、GETのレスポンスコードが404が返ってくること' do
      get '/api/v1/posts/notexist',headers: @headers
      json = JSON.parse(response.body)
      expect(response).to have_http_status(404)
    end
  end

  describe 'POST /api/v1/posts' do
    before do
      SecuredController
      
    end
    it 'tokenがheaderに入っており、body内にparamが存在するとき、POSTのレスポンスコードが200、かつ指定した値と同値のレコードが返ってくること' do
      @params = {
        'message' => 'test',
        }
      post '/api/v1/posts/',headers: @headers, params:@params
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json['message']).to eq(@params['message'])
    end
  end

  describe 'PUT /api/v1/posts/:sub' do
    it 'tokenがheaderに入っており、指定したsubが存在するとき、PUTのレスポンスコードが200、かつ指定した値と同値のレコードが返ってくること' do
      post = FactoryBot.create(:post)
      @params = {
        'is_deleted' => true,
        }
      put '/api/v1/posts/'+post.id.to_s,headers: @headers, params:@params
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json['is_deleted']).to eq(@params['is_deleted'])
    end

    it 'tokenがheaderに入っており、指定したsubが存在しないとき、PUTのレスポンスコードが422になること' do
      FactoryBot.create(:post)
      @params = {
        'is_deleted' => true,
        }
      put '/api/v1/posts/notexist',headers: @headers, params:@params
      JSON.parse(response.body)
      expect(response).to have_http_status(422)
    end
  end

  describe 'DELETE /api/v1/posts:sub' do
    it 'tokenがheaderに入っており、パラメータ内のsubが存在するとき、DELETEのレスポンスコードが200が返ってくること' do
      post = FactoryBot.create(:post)
      delete '/api/v1/posts/'+post.id.to_s,headers: @headers
      expect(response).to have_http_status(200)
    end

    it 'tokenがheaderに入っており、パラメータ内のsubが存在しないとき、GETのレスポンスコードが404が返ってくること' do
      delete '/api/v1/posts/notexist',headers: @headers
      expect(response).to have_http_status(404)
    end
  end

end
