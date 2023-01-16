Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :songs
  # get "/songs", to: "songs#index"
  # get "/songs/:id", to: "songs#show"
  # post "/songs", to: "songs#create"

end
