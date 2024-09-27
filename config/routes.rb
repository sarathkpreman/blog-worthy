# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, only: %i[index create show], param: :slug do
      member do
        patch :update_votes
      end
    end
    resources :users, only: %i[index create]
    resource :session, only: [:create, :destroy]
  end
  resources :organizations, only: [:index], defaults: { format: :json }

  root "home#index"
  get "*path", to: "home#index", via: :all
end
