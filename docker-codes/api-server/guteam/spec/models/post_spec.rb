require 'rails_helper'

RSpec.describe Post, type: :model do
  it 'factoriesのpostを参照して、レコードが登録できる' do
    expect(FactoryBot.build(:post)).to be_valid
  end
  it 'factoriesのpostを参照し、messageが0文字の場合はレコードが登録できない' do
    expect(FactoryBot.build(:post, message: '')).to_not be_valid
  end
  it 'factoriesのpostを参照し、messageが161文字の場合はレコードが登録できない' do
    expect(FactoryBot.build(:post, message: 'a' * 161)).to_not be_valid
  end
end
