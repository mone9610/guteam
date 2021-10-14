require 'rails_helper'

RSpec.describe Notification, type: :model do
  it 'factoriesのnotificationを参照して、レコードが登録できる' do
    expect(FactoryBot.build(:notification)).to be_valid
  end
end
