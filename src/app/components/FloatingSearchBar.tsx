import { Camera, Send } from "lucide-react";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

export function FloatingSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Handle search logic
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <div className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-full md:max-w-3xl z-[10000]">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl shadow-primary/10 border border-white/50 rounded-full flex items-center px-3 py-2 md:px-6 md:py-4 gap-2 md:gap-4 transition-all hover:shadow-primary/20 hover:scale-[1.01]">
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 rounded-full w-8 h-8 md:w-10 md:h-10 hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <Camera className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
        </Button>

        <Input
          type="text"
          placeholder="Search symptoms, doctors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-auto text-sm md:text-lg placeholder:text-muted-foreground/60 min-w-0"
        />

        <Button
          size="icon"
          className="flex-shrink-0 rounded-full w-8 h-8 md:w-12 md:h-12 shadow-md bg-gradient-to-tr from-primary to-secondary border-none hover:shadow-lg transition-all"
          onClick={handleSearch}
        >
          <Send className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </Button>
      </div>
    </div>
  );
}
