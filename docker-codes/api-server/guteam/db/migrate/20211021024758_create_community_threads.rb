class CreateCommunityThreads < ActiveRecord::Migration[6.1]
  def change
    create_table :community_threads do |t|
      t.references :community, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.string :description
      t.string :image_url

      t.timestamps
    end
  end
end
