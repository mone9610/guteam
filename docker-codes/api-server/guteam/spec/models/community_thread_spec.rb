require 'rails_helper'

RSpec.describe CommunityThread, type: :model do
  it 'factoriesのCoomunityThreadを参照して、レコードが登録できる' do
    expect(FactoryBot.build(:community_thread)).to be_valid
  end
  it 'len(title)=0,len(description)=0の場合はレコードが登録できない' do
    expect(FactoryBot.build(:community_thread, title: '',description:'')).to_not be_valid
  end
  it 'len(title)=0,len(description)=1の場合はレコードが登録できない' do
    expect(FactoryBot.build(:community_thread, title: '',description:'a')).to_not be_valid
  end
  it 'len(title)=0,len(description)=65の場合はレコードが登録できない' do
    expect(FactoryBot.build(:community_thread, title: '',description:'a'* 65)).to_not be_valid
  end
  it 'len(title)=1,len(description)=0の場合はレコードが登録できない' do
    expect(FactoryBot.build(:community_thread, title: 'a',description:'')).to_not be_valid
  end
  it 'len(title)=1,len(description)=65の場合はレコードが登録できない' do
    expect(FactoryBot.build(:community_thread, title: 'a',description:'a'* 65)).to_not be_valid
  end
  it 'len(title)=33,len(description)=0の場合はレコードが登録できない' do
    expect(FactoryBot.build(:community_thread, title: 'a' *33,description:'')).to_not be_valid
  end
  it 'len(title)=33,len(description)=1の場合はレコードが登録できない' do
    expect(FactoryBot.build(:community_thread, title: 'a' *33,description:'a')).to_not be_valid
  end
  it 'len(title)=33,len(description)=65の場合はレコードが登録できない' do
    expect(FactoryBot.build(:community_thread, title: 'a' *33,description:'a'*65)).to_not be_valid
  end

end
