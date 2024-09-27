# frozen_string_literal: true

class PostsController < ApplicationController
  def initialize
    @vote_threshold = 5
    super()
  end

  before_action :set_post, only: [:show, :update_votes]

  def index
    posts = Post.where(user_id: current_user.id).includes(:user)
    render status: :ok, json: { posts: posts.as_json(include: { user: { only: :name } }) }
  end

  def create
    post = current_user.posts.new(post_params)
    post.organization_id = current_user.organization_id
    if post.save
      render_notice(t("Successfully_created", entity: "Post"))
    else
      render json: { error: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    post = Post.find_by!(slug: params[:slug])
    render json: { post: post.as_json(include: { user: { only: :name } }) }
  end

  def update_votes
    case params[:vote_type]
    when "upvote"
      @post.increment!(:upvotes)
      @post.decrement!(:downvotes) if @post.downvotes.positive? && downvote_clicked?
    when "downvote"
      @post.increment!(:downvotes)
      @post.decrement!(:upvotes) if @post.upvotes.positive? && upvote_clicked?
    else
      return render json: { error: "Invalid vote type" }, status: :unprocessable_entity
    end

    is_blog_worthy = (@post.upvotes - @post.downvotes) > @vote_threshold
    @post.update(is_blog_worthy:)

    render json: {
      upvotes: @post.upvotes,
      downvotes: @post.downvotes,
      is_blog_worthy:
    }
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end

    def set_post
      @post = Post.find_by(slug: params[:slug])
    end

    def upvote_clicked?
      params[:upvote_clicked] == "true"
    end

    def downvote_clicked?
      params[:downvote_clicked] == "true"
    end
end
