require 'rails_helper'

RSpec.describe Community, type: :model do
  it 'factoriesのcommunityを参照して、レコードが登録できる' do
    expect(FactoryBot.build(:community)).to be_valid
  end
end
