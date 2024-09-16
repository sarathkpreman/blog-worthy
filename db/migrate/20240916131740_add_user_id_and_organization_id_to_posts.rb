# frozen_string_literal: true

class AddUserIdAndOrganizationIdToPosts < ActiveRecord::Migration[7.0]
  def change
    add_reference :posts, :user, type: :string, null: false, foreign_key: true
    add_reference :posts, :organization, type: :string, null: false, foreign_key: true
  end
end
