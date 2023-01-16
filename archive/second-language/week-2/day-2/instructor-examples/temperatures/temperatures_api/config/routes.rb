Rails.application.routes.draw do
  resources :temperatures, only: [:index]
  resources :locations, only: [:index, :show] do
    resources :temperatures, only: [:create]
  end

  # # Or do it this way instead:
  # get "/temperatures", to: "temperatures#index"
  # get "/locations/:id", to: "locations#show"
  # get "/locations", to: "locations#index"
  # post "/locations/:id/temperatures", to: "temperatures#create"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
