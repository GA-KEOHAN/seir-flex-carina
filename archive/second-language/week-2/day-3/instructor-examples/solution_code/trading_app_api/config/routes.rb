Rails.application.routes.draw do
  resources :ledgers
  resources :commodities
  resources :traders

  get "/getweather", to: "ledgers#get_weather"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
