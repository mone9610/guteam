class CreateThreadPosts < ActiveRecord::Migration[6.1]
  def change
    create_table :thread_posts do |t|
      t.references :community_thread, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :message
      t.boolean :is_deleted

      t.timestamps
    end
  end
end
