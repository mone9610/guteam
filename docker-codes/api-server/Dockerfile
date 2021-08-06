# got from sample https://docs.docker.com/samples/rails/
# syntax=docker/dockerfile:1
FROM ruby:2.6
RUN apt-get update -qq && apt-get install -y nodejs mariadb-client
WORKDIR /teamx
COPY ./teamx/Gemfile /teamx/Gemfile
COPY ./teamx/Gemfile.lock /teamx/Gemfile.lock
RUN bundle install

# Add a script to be executed every time the container starts.
COPY ./teamx/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]