class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts, id: :uuid do |t|
      t.string :title, null: false
      t.text :description
      t.integer :upvotes, default: 0, null: false
      t.integer :downvotes, default: 0, null: false
      t.boolean :is_blog_worthy, default: false
      
      t.timestamps
    end
  end
end
