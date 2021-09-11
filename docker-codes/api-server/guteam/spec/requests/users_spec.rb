require 'rails_helper'
require 'uri'
require 'net/http'
require 'openssl'
require 'database_cleaner'

@access_token = TokenService.get_token
auth='Bearer ' + @access_token

RSpec.describe 'Users', type: :request do
  before do
    @headers = {
    'Authorization' => auth,
    }
  end
  describe 'GET /api/v1/users' do
    it 'tokenがheaderに入っているとき、GETのレスポンスコードが200、かつ1件のデータが返ってくること' do
      # FactoryBot.create_list(:user,5)
      get '/api/v1/users',headers: @headers
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json.length).to eq(1)
    end
    
    it 'tokenがheaderに入っていないとき、GETのレスポンスコードが400' do
      get '/api/v1/users',headers: @headers
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /api/v1/users:sub' do
    it 'tokenがheaderに入っており、パラメータ内のsubが存在するとき、GETのレスポンスコードが200、かつ指定したsubのレコードが返ってくること' do
      user = FactoryBot.create(:user, sub: 'sub')
      get '/api/v1/users/'+user.sub,headers: @headers
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json['sub']).to eq(user.sub)
    end

    it 'tokenがheaderに入っており、パラメータ内のsubが存在しないとき、GETのレスポンスコードが404が返ってくること' do
      get '/api/v1/users/notexist',headers: @headers
      json = JSON.parse(response.body)
      expect(response).to have_http_status(404)
    end
  end

  describe 'POST /api/v1/users' do
    it 'tokenがheaderに入っており、body内にparamが存在するとき、POSTのレスポンスコードが200、かつ指定した値と同値のレコードが返ってくること' do
      @params = {
        'name' => 'post',
        'sub' => 'subsub',
        'introduction' => 'this is post',
        'picture_url' => 'http://postpicture'
        }
      post '/api/v1/users/',headers: @headers, params:@params
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json['name']).to eq(@params['name'])
      expect(json['sub']).to eq(@params['sub'])
      expect(json['introduction']).to eq(@params['introduction'])
      expect(json['picture_url']).to eq(@params['picture_url'])
    end

    it 'tokenがheaderに入っており、既に存在するparamをPOSTしたとき、POSTのレスポンスコードが422になること' do
      @params = {
        'name' => 'post',
        'sub' => 'subsub',
        'introduction' => 'this is post',
        'picture_url' => 'http://postpicture',
        }
      FactoryBot.create(:user, sub: 'subsub',)
      post '/api/v1/users/',headers: @headers, params:@params
      JSON.parse(response.body)
      expect(response).to have_http_status(422)
    end
  end

  describe 'PUT /api/v1/users/:sub' do
    it 'tokenがheaderに入っており、指定したsubが存在するとき、PUTのレスポンスコードが200、かつ指定した値と同値のレコードが返ってくること' do
      user = FactoryBot.create(:user, sub: 'subsubsub')
      @params = {
        'name' => 'put',
        'introduction' => 'this is put',
        'picture_url' => 'http://putpicture'
        }
      put '/api/v1/users/'+user.sub,headers: @headers, params:@params
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json['name']).to eq(@params['name'])
      expect(json['introduction']).to eq(@params['introduction'])
      expect(json['picture_url']).to eq(@params['picture_url'])
    end

    it 'tokenがheaderに入っており、指定したsubが存在しないとき、PUTのレスポンスコードが422になること' do
      FactoryBot.create(:user, sub: 'subsubsub')
      @params = {
        'name' => 'put',
        'introduction' => 'this is put',
        'picture_url' => 'http://putpicture'
        }
      put '/api/v1/users/busbusbus',headers: @headers, params:@params
      JSON.parse(response.body)
      expect(response).to have_http_status(422)
    end
  end

  describe 'DELETE /api/v1/users:sub' do
    it 'tokenがheaderに入っており、パラメータ内のsubが存在するとき、DELETEのレスポンスコードが200が返ってくること' do
      user = FactoryBot.create(:user, sub: 'subsubsubsub')
      delete '/api/v1/users/'+user.sub,headers: @headers
      expect(response).to have_http_status(200)
    end

    it 'tokenがheaderに入っており、パラメータ内のsubが存在しないとき、GETのレスポンスコードが404が返ってくること' do
      delete '/api/v1/users/notexist',headers: @headers
      expect(response).to have_http_status(404)
    end
  end

end
