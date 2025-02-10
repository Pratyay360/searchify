import { Button } from "@/components/ui/button";
import { BrainCircuitIcon } from "lucide-react";
import { ModeToggle } from "@/components/themer/themer";

export default function Navbar() {
  return (
    <>
    <nav className="sticky top-0 bg-white/50 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900/50 shadow-sm z-10">
      <div className="container flex items-center justify-between h-20 px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-3 group">
          <div className="p-2 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 group-hover:scale-105 transition-transform">
            <BrainCircuitIcon className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            AISearch
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            className="text-md font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            About
          </Button>
          <Button 
            variant="ghost" 
            className="text-md font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Features
          </Button>
          
          {/* Divider */}
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-4" />

          <ModeToggle />
        </div>
      </div>
    </nav>
    </>
  );
}