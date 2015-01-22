module Parser
  module LineProcessors

    class TextLine
      REGEX_PATTER = /^\*\*\[Back to top\]/

      def initialize
        @text = ""
      end

      def add_text(line)
        return if line.strip.match(REGEX_PATTER)

        puts "[pr-text] #{line}"
        @text << line
      end

      def to_data
        @text.strip.split("\n")
      end

    end

  end
end
