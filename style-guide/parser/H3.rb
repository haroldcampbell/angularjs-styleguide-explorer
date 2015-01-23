$LOAD_PATH << File.dirname(__FILE__)

require 'line_processors/text_line'

module Parser
  class H3

    def initialize(line)
      puts "[h3] #{line}"
      @title = line.gsub(/^#*/, "").strip unless line.nil?
      @title = nil if line.nil?

      @h5s = []
    end

    def add_h5(h5)
      @h5s << h5
    end

    def add_text(line)
      puts "[h3-text] #{line}"

      @text_line ||= LineProcessors::TextLine.new

      @text_line.add_text(line)
    end

    def self.is_h3?(line)
      line.match(/^###/)
    end

    def to_data
      {
          title: @title,
          text: @text_line.nil? ? nil : @text_line.to_data,
          toc_h5: @h5s.map {|h5| h5.to_data}
      }
    end
  end
end
