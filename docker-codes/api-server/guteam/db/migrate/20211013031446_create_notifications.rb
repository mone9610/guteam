class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.string :message
      t.string :from_user_id
      t.string :to_user_id

      t.timestamps
    end
  end
end
