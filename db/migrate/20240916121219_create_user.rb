# frozen_string_literal: true

class CreateUser < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: :string do |t|
      t.string :name, null: false
      t.string :email, null: false, unique: true
      t.string :password_digest
      t.references :organization, type: :string, null: false, foreign_key: true
      t.timestamps
    end
  end
end
