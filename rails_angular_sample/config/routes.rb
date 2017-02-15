Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'site#index'
  namespace :api, defaults: { format: :json } do
    resources :todos, except: [:new, :edit]
  end
  get '*path', to: 'site#index'
end
