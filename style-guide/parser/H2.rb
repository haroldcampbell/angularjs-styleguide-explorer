module Parser
  class H2

    def initialize(line)
      puts "[h2] #{line}"

      @h3s = []
      @notes = ""
      @title = line.gsub(/## /, "").strip

    end

    def add_note(line)
      puts "[h2-note] #{line}"

      @notes << line
    end

    def add_h3(h3)
      @h3s << h3
    end

    def self.is_h2?(line)
      line.match(/^##/)
    end

    def to_data
      {
          title: @title,
          url: @title.gsub(" ", "").downcase,
          notes: @notes.strip,
          toc_h3: @h3s.map {|h3| h3.to_data}
      }
    end
  end
end
