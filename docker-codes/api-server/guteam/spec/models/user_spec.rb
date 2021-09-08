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

    # it 'nameが0文字だと登録できない' do
    #      expect(FactoryBot.build(:user, name: '')).to_not be_valid 
    # end

    # it 'nameが17文字だと登録できない' do
    #     name1 = ('a'..'z').to_a.shuffle[0..17].join
    #     expect(FactoryBot.build(:user, name: name1)).to_not be_valid 
    # end
    
    # it 'nameが1-16文字だと登録できる' do
    #     expect(FactoryBot.create(:user)).to be_valid
    # end

    # it 'introductionが0文字だと登録できない' do
    #      expect(FactoryBot.build(:user, introduction: '')).to_not be_valid 
    # end

    # it 'introductionが121文字だと登録できない' do
    #     introduction1 = ('a'..'z').to_a.shuffle[0..121].join
    #     expect(FactoryBot.build(:user, name: introduction1)).to_not be_valid 
    # end

    # it 'introductionが1-120文字だと登録できる' do
    #     expect(FactoryBot.create(:user)).to be_valid
    # end

    # it '1つのユーザーに対してpostに2つ以上のレコードが生成できる'

    # it 'ユーザーが消えるとpostも消える'

end