require 'rails_helper'

RSpec.describe User, type: :model do
  it 'subがないと登録できない' do
    expect(FactoryBot.build(:user, sub: '')).to_not be_valid 
  end

  it 'subがあると登録できる' do
    expect(FactoryBot.build(:user, sub: 'subsubsub')).to be_valid 
  end

  it '既に登録してあるsubは登録できない' do
    user1 = FactoryBot.create(:user, name: 'guteam', sub: 'subsubsubsub')
    expect(FactoryBot.build(:user, name: 'ziro', sub: user1.sub)).to_not be_valid
  end

  it 'nameが17文字だと登録できない' do
    expect(FactoryBot.build(:user, name: 'a' * 17)).to_not be_valid
  end

  it 'introductionが121文字だと登録できない' do
    expect(FactoryBot.build(:user, name: 'a' * 121)).to_not be_valid
  end

end
