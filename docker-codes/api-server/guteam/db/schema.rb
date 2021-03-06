# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_02_033032) do

  create_table "communities", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "community_threads", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "community_id", null: false
    t.bigint "user_id", null: false
    t.string "title"
    t.string "description"
    t.string "image_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["community_id"], name: "index_community_threads_on_community_id"
    t.index ["user_id"], name: "index_community_threads_on_user_id"
  end

  create_table "notifications", charset: "utf8mb4", force: :cascade do |t|
    t.string "message"
    t.bigint "from_user_id"
    t.bigint "to_user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "posts", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "message"
    t.boolean "is_deleted", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "thread_posts", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "community_thread_id", null: false
    t.bigint "user_id", null: false
    t.string "message"
    t.boolean "is_deleted"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["community_thread_id"], name: "index_thread_posts_on_community_thread_id"
    t.index ["user_id"], name: "index_thread_posts_on_user_id"
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "sub"
    t.string "introduction"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "image_url"
    t.index ["sub"], name: "index_users_on_sub", unique: true
  end

  add_foreign_key "community_threads", "communities"
  add_foreign_key "community_threads", "users"
  add_foreign_key "posts", "users"
  add_foreign_key "thread_posts", "community_threads"
  add_foreign_key "thread_posts", "users"
end
