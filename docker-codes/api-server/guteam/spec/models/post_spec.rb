require 'rails_helper'

RSpec.describe Post, type: :model do
    it 'factoriesのpostを参照して、レコードが登録できる' do
        expect(FactoryBot.build(:post)).to be_valid
    end
end