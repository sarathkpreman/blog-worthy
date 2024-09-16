# frozen_string_literal: true

class Organization < ApplicationRecord
  MAX_NAME_LENGTH = 50
  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  before_create :generate_unique_id

  private

    def generate_unique_id
      self.id = SecureRandom.uuid
    end
end
