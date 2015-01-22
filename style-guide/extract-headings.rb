require 'json'
require './core'

#
# Utility method for standardizing the toc items that are used as keys
# def encode_toc(toc)
#   toc.gsub(" ", "").downcase
# end

# def is_blank(line)
#   line.strip.length == 0
# end

#
def extract_headings(in_file)
  found_toc = false
  parser = Parser::Parser.new

  File.open(in_file).each_line do |line|
    if (line.match(/1\. \[/))
      found_toc = true
    elsif found_toc
      parser.select_processor(line)
      parser.parse(line)
    end
  end

  parser.to_data
end

if (ARGV.length == 0)
  puts "Nothing to do."
  puts "USAGE: ruby extract-headings.rb Readme.md [output.json] [show_json]"
  puts "\tItems in the '[]' are optional, but must be used in the order listed if used at all."
  exit();
end

puts "Processing '#{ARGV.first}' file."
table_of_contents_array = extract_headings(ARGV.first)

if (ARGV.length == 1)
  puts "Showing the first two sections of the guide:"
  trimmed_results = table_of_contents_array[0, 2]
  puts JSON.pretty_generate(trimmed_results)
  exit()
end

if (ARGV.length == 2)
  File.open(ARGV[1], 'w') do |f|
    f.puts JSON.pretty_generate(table_of_contents_array)
  end
  puts "Written output to '#{ARGV[1]}'."
  exit()
end

if (ARGV.length == 3 && ARGV[2]=='show_json')
  puts JSON.pretty_generate(table_of_contents_array)
end
