# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.all
    render status: :ok, json: { posts: }
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: { notice: "Post was successfully created", post: }, status: :created
    else
      render json: { error: post.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
