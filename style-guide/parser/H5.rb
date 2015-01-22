module Parser
  class H5
    REGEX_PATTER = /^######/

    def initialize(line, section_obj)

      rule = line.strip.gsub(REGEX_PATTER,"").strip
      @rule_name = rule.scan(/(Y\d+)/)[0][0]
      @rule_url = rule.scan(/(#style-y\d+)/)[0][0]
      @section_obj = section_obj

      puts "[h5] #{@rule_name}"

    end

    def self.is_h5?(line)
      line.strip.match(REGEX_PATTER)
    end

    def to_data
      {
          style_name: @rule_name,
          style_url: @rule_url,
          section: @section_obj.to_data
      }
    end
  end
end
