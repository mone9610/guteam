class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :message
      t.boolean :is_deleted

      t.timestamps
    end
  end
end
