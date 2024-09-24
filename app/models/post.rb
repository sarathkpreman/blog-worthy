# frozen_string_literal: true

class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125 unless defined?(MAX_TITLE_LENGTH)

  belongs_to :user
  belongs_to :organization
  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }

  validates :upvotes, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  validates :downvotes, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  # validates_inclusion_of :is_blog_worthy, in: [true, false]

  # validate :check_downvotes_greater_or_not, :check_votes_negative_or_not, :check_netvotes_negative_or_not

  # validates :slug, uniqueness: true

  # validate :slug_not_changed

  before_create :generate_unique_id, :set_slug

  private

    def generate_unique_id
      self.id = SecureRandom.uuid
    end

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

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_post_slug = Post.where(
        regex_pattern,
        "^#{title_slug}$|^#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_post_slug.present?
        slug_count = latest_post_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, I18n.t("post.slug.immutable"))
      end
    end
end
