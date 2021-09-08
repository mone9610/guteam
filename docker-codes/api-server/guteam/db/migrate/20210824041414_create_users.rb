class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :sub
      t.string :introduction

      t.timestamps
    end
    add_index :Users, [:sub], unique: true 
  end
end
