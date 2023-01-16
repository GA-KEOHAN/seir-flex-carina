# p "radar".reverse == "radar"
# p ['a', 'b' , :c]
#

# Class Definition
class World
  attr_accessor :shape, :name
  attr_reader :people

  def initialize name, shape = "Oblate Spheroid"
    @name = name
    @people = []
    @shape = shape
  end

  def populate name, age
      @people << {name: name, age: age }
  end

end

world1 = World.new "Tatooine", "sphere"

p world1

p world1.name

p world1.class

world1.name = "Tatooine Patrick"

p world1.name

world1.populate "Isaac", 25
world1.populate "James", 32
world1.populate "Cody", 23

p world1.people
