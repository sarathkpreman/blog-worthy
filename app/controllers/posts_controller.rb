# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.includes(:user).all
    render status: :ok, json: { posts: posts.as_json(include: { user: { only: :name } }) }
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: { notice: "Post was successfully created", post: }, status: :created
    else
      render json: { error: post.errors.full_messages.to_sentence }, status: :unprocessable_entity
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
