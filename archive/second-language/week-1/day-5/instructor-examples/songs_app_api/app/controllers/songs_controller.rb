class SongsController < ApplicationController

  def index
    puts "==========params============="
    puts params
    puts "==========params============="
    render json: { 
      status: 200, 
      songs: Song.all 
    }
  end

  def show
    # Puts the params hash to server output:
    puts "==========params============="
    puts params
    puts !!params[:stuff]
    puts params[:stuff].present?
    puts "==========params============="
    @song = Song.find(params[:id])
    render json: { status: 200, song: @song}
  end

  def create
    puts "==========params============="
    puts params
    puts "==========params============="
    puts "==========song_params============="
    puts song_params
    puts "==========song_params============="
    @song = Song.create(song_params)
    # @song = Song.new
    # @song.title = params[:song][:title]
    # @song.artist_name = params[:song][:artist_name]
    # @song.artwork = params[:song][:artwork]
    # @song.save
    render json: @song

  end

  private

    def song_params
      params.required(:song).permit(:title, :artist_name, :artwork)
    end

end