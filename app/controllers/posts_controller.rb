# frozen_string_literal: true

class PostsController < ApplicationController
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

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
