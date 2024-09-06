# frozen_string_literal: true

class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125 unless defined?(MAX_TITLE_LENGTH)

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }

  validates :upvotes, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  validates :downvotes, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  validates_inclusion_of :is_blog_worthy, in: [true, false]

  validate :check_downvotes_greater_or_not, :check_votes_negative_or_not, :check_netvotes_negative_or_not

  private

    def netvote
      upvotes - downvotes
    end

    def check_votes_negative_or_not
      self.upvotes = [upvotes, 0].max
      self.downvotes = [downvotes, 0].max
    end

    def check_netvotes_negative_or_not
      if netvote < 0
        errors.add(:netvotes, "cannot be negative")
      end
    end

    def check_downvotes_greater_or_not
      if downvotes > upvotes
        errors.add(:downvotes, "cannot be more than upvotes")
      end
    end
end
