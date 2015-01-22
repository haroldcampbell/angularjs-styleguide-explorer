$LOAD_PATH << File.dirname(__FILE__)

require 'line_processors/rule_line'
require 'line_processors/text_line'
require 'line_processors/why_line'

module Parser

  class SectionText

    def initialize()
      @rule_lines = []
      @why_lines = []
      @should_process_pr = true
      @found_first_text = false

      @text_line = LineProcessors::TextLine.new
    end

    def is_new_rule?(line)
      return true if (@should_process_pr && LineProcessors::RuleLine.is_match?(line))

      false
    end

    def add_rule(line)
      @rule_lines << LineProcessors::RuleLine.new(line)
    end

    def add_text(line)
      @text_line.add_text(line)
    end

    def process_line(line)
      if (@should_process_pr)
        if LineProcessors::WhyLine.is_match?(line)
          @why_lines << LineProcessors::WhyLine.new(line)
          @should_process_pr = false

        elsif is_blank(line)
          ## Skip blank lines
          ##
        else
          add_text(line)
          @should_process_pr = false
          @found_first_text = true
        end
      else
        if LineProcessors::WhyLine.is_match?(line)
          @why_lines << LineProcessors::WhyLine.new(line)
        else
          add_text(line)
        end
      end
    end

    def to_data
      {
          rules: @rule_lines.map {|rule| rule.to_data},
          whys: @why_lines.map {|why| why.to_data},
          text_lines: @text_line.to_data
      }
    end

    private

    def is_blank(line)
      line.strip.length == 0
    end

  end
end
