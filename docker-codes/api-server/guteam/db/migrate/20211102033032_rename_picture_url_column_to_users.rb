class RenamePictureUrlColumnToUsers < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :picture_url, :image_url
  end
end
