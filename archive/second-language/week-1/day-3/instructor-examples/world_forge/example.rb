class Word
  attr_reader :word, :letters_display

  def initialize word
    @word = word
    letters = word.split('')
    @letters_display = letters.map do  |represent_value|
        { letter: represent_value, hidden: true }
    end
  end

  def render
      @letters_display.each do |represent_value|
          if  represent_value[:hidden]
            print "*"
          else
            print represent_value[:letter]
          end
      end
  end
end

list_of_words = ["scorpio", "bash", "cat", "drum", "book", "ruby"]

word = list_of_words.sample

p word

puts "Welcome to Arete Hangman... Try to guess my word if you can"

puts "The length of the word is #{word.length}"

current_word = Word.new word

loop do
  current_word.render
  input = gets.chomp
  the_right_word = current_word.word.split('')

  if input == current_word.word
       puts " Yea you figured out the whole word your so smart"
       break
  else
    puts "wrong... you didn't solve it"
    puts " try again (t), or quit (q)"
    again = gets.chomp.downcase
    break if again == "q"
  end

end
