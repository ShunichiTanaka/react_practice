Rails.application.routes.draw do
  root 'top#index'

  resources :comments, only: [:index]
  namespace :api, format: 'json' do
    namespace :v1 do
      resources :comments
    end
  end
end
