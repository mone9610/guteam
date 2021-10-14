class ChangeDataFromUserIdToNotification < ActiveRecord::Migration[6.1]
  def change
    change_column :notifications, :from_user_id, :bigint
  end
end
