module Parser
  module LineProcessors

    class WhyLine
      REGEX_PATTER = /^\*Why\?\*:/

      def initialize(line)
        puts "[pr-why] #{line}"
        @line = line.strip.gsub(REGEX_PATTER, "").strip

      end

      def self.is_match?(line)
        return true if line.strip.match(REGEX_PATTER)

        false
      end

      def to_data
        @line
      end

    end

  end
end
