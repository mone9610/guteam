class ChangeColumnDefaultToPosts < ActiveRecord::Migration[6.1]
  def change
    change_column_default :posts, :is_deleted, from: true, to: false
  end
end
