class LocationsController < ApplicationController
  # GET /locations
  def index
    @locations = Location.all

    # render json: @locations.to_json(only: [:name])
    render json: @locations
  end

  # GET /locations/1
  def show
    @location = Location.find(params[:id])

    render json: @location.to_json(include: :temperatures)
    # render json: @location.to_json(include: {
    #   temperatures: {
    #     only: [:month]
    #   }
    # })
  end
end
