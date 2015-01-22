$LOAD_PATH << File.dirname(__FILE__)

module Parser
  require 'line_processors/rule_line'

  class Parser

    def initialize
      @h2s = []
      @current_h5
      @current_h3
      @current_section
      @current_processor
    end

    def select_processor(line)
      # if LineProcessors::RuleLine.is_match?(line) #
      if line.match(/^  \- /)
        @current_processor = :process_rule

      elsif line.match(/^######/) # toc_h5
        @current_processor = :process_toc_h5

      elsif line.match(/^####/)
        puts "unprocessed h4: #{line}"

      elsif line.match(/^###/) # toc_h3
        @current_processor = :process_toc_h3

      elsif line.match(/^##/) # toc_h2
        @current_processor = :process_toc_h2

      elsif line.match(/^#/)
        puts "lines 1: #{line}"
      end

    end

    def parse(line)
      case @current_processor
        when :process_rule
          process_rule(line)

        when :process_toc_h5
          process_toc_h5(line)

        when :process_toc_h3
          process_toc_h3(line)

        when :process_toc_h2
          process_toc_h2(line)
      end
    end

    def to_data
      @h2s.map {|h2| h2.to_data}
    end

    private

    def process_rule(line)

      if @current_section.is_new_rule?(line)
        @current_section.add_rule(line)
      else
        @current_section.process_line(line)
      end
    end

    def process_toc_h5(line)
      if is_blank(line)
        @current_section.add_text(line) unless @current_section.nil?
        return
      end

      if H5.is_h5?(line)
        @current_section = SectionText.new
        @current_h5 = H5.new(line, @current_section)
        if(@current_h3.nil?)
          # The current h2 doesn't have a h3, so we just have to create an empty one.
          @current_h3 = H3.new(nil)
          @h2s.last.add_h3(@current_h3)
        end
        @current_h3.add_h5(@current_h5)
      else
        @current_section.add_text(line) unless @current_section.nil?
      end
    end

    def process_toc_h3(line)
      if is_blank(line)
        @current_section.add_text(line) unless @current_section.nil?
        return
      end

      if H3.is_h3?(line)
        @current_h3 = H3.new(line)
        @h2s.last.add_h3(@current_h3)
      else
        @current_section.add_text(line) unless @current_section.nil?
      end
    end

    def process_toc_h2(line)
      if is_blank(line)
        return
      end

      if H2.is_h2?(line)
        @h2s << H2.new(line)
        # reset all the child variables for the new H2.
        @current_h5 = nil
        @current_h3 = nil
        @current_section = nil

      else
        @h2s.last.add_note(line)
      end
    end

    def is_blank(line)
      line.strip.length == 0
    end
  end

end
