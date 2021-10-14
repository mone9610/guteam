class ChangeDataToUserIdToNotification < ActiveRecord::Migration[6.1]
  def change
    change_column :notifications, :to_user_id, :bigint
  end
end
