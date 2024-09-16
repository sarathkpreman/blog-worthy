# frozen_string_literal: true

class User < ApplicationRecord
  MAX_NAME_LENGTH = 50
  MIN_PASSWORD_LENGTH = 6
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  MAX_EMAIL_LENGTH = 255

  has_secure_password
  belongs_to :organization
  has_many :posts

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :email, presence: true,
    uniqueness: { case_sensitive: false },
    length: { maximum: MAX_EMAIL_LENGTH },
    format: { with: VALID_EMAIL_REGEX }
  validates :password, length: { minimum: MIN_PASSWORD_LENGTH }, if: -> { password.present? }
  validates :password_confirmation, presence: true, on: :create

  before_save :to_lowercase
  before_create :generate_unique_id

  private

    def to_lowercase
      email.downcase!
    end

    def generate_unique_id
      self.id = SecureRandom.uuid
    end
end
