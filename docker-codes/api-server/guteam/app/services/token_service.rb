require "json"

class TokenService
    def self.get_token
        url =URI(ENV['AUTH0_DOMAIN']+'oauth/token')
        username=ENV['AUTH0_USER']
        password=ENV['AUTH0_PASSWORD']
        client_id=ENV['AUTH0_CLIENT_ID']
        client_secret=ENV['AUTH0_CLIENT_SECRET']
        audience=ENV['AUTH0_CLIENT_AUDIENCE']

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    
        request = Net::HTTP::Post.new(url)
        request["content-type"] = 'application/x-www-form-urlencoded'
        request.body = 'grant_type=password'+'&username='+username+'&password='+password+'&audience='+audience+'&scope=email'+'&client_id='+client_id+'&client_secret='+client_secret
        response = http.request(request)
        json = JSON.parse(response.read_body)
        access_token = json["access_token"]
    end
end