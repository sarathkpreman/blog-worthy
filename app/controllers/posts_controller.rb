# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.includes(:user).all
    render status: :ok, json: { posts: posts.as_json(include: { user: { only: :name } }) }
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("Successfully_created", entity: "Task"))
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
