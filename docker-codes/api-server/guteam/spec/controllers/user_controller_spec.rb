# require 'rails_helper'

# auth='Bearer ' + ENV['AUTH0_TOKEN_FOR_TEST']

# # describe 'UserAPI'  do
#     # before do
#     #     @headers = {
#     #       'Authorization' => auth,
#     #     }
#     # end
# RSpec.describe User, type: :controller do

#     it 'tokenがheaderに入っているとき、GETのレスポンスコードが200系' do
#         FactoryBot.create(:user, sub: 'subsubsubsub')
#         # get '/api/v1/users',params:nil,headers:@headers
#         get '/api/v1/users'
#         json = JSON.parse(response.body)
#         expect(response.status).to eq(200)
#         # expect(json['data'].length).to eq(10)
#     end

#     it 'tokenがheaderに入っていないとき、GETのレスポンスコードが400系' do
#         FactoryBot.create(:user, sub: 'subsubsubsubsub')
#         FactoryBot.create_list(:user, 10)
#         get '/api/v1/users'
#         json = JSON.parse(response.body)
#         expect(response.status).to eq(400)
#     end

#     it '存在するidがパスに入っている時、GETのレスポンスコードが200系' do
#         user1 = FactoryBot.create(:user, sub: 'subsubsubsub')
#         get '/api/v1/users/'+user1.sub, header: @header
#         json = JSON.parse(response.body)
#         expect(response.status).to eq(200)
#     end

#     # it'存在しないidがパスに入っているとき、GETのレスポンスコードが500系'

#     it'許可されているパラメータがbodyに入っているとき、POSTのレスポンスコードが200系' do
#         post_params1 = {'name' => 'hogehoge', 'introduction' => 'hugahuga','picture_url' => 'piyopiyo'}
#         post '/api/v1/users/posttest1' ,header:@header,params:post_params1
#         json = JSON.parse(response.body)
#         expect(response.status).to eq(200)
#     end

#     it'許可されていないパラメータがbodyに入っているとき、POSTのレスポンスコードが400系' do
#         post_params2 = {'name' => 'hogehoge', 'introduction' => 'hugahuga','picture_url' => 'piyopiyo','dummy' => 'dummy'}
#         post '/api/v1/users/posttest1' ,header:@header,params:post_params2
#         json = JSON.parse(response.body)
#         expect(response.status).to eq(400)
#     end

#     it'許可されているパラメータがbodyに入っているとき、PUTのレスポンスコードが200系' do
#         put_params1 = {'name' => 'hogehoge', 'introduction' => 'hugahuga','picture_url' => 'piyopiyo'}
#         post '/api/v1/users/puttest1' ,header:header,params:put_params1
#         json = JSON.parse(response.body)
#         expect(response.status).to eq(200)
#     end

#     it'許可されていないパラメータがbodyに入っているとき、POSTのレスポンスコードが400系'do
#         put_params2 = {'name' => 'hogehoge', 'introduction' => 'hugahuga','picture_url' => 'piyopiyo','dummy' => 'dummy'}
#         post '/api/v1/users/puttest2' ,header:@header,params:put_params2
#         json = JSON.parse(response.body)
#         expect(response.status).to eq(400)
#     end

#     # it '存在するidがパスに入っている時、DELETEのレスポンスコードが200系'

#     # it'存在しないidがパスに入っているとき、DELETEのレスポンスコードが500系'
# end