'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";

import {
  SearchIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  
  const handleSearch = () => {
    if (searchText.trim()) {
      router.push(`/chat?search=${encodeURIComponent(searchText)}`);
    }else{
      toast.error("Please enter a query to search");
    }
  };

  const handleQueryClick = (query: string) => {
    setSearchText(query);
  };
  const exampleQueries = [
    "Top cat breeds",
    "What is the capital of France?",
    "How to make a pizza",
    "What is the tallest mountain in the world?",
    "What is the population of India?",
    "What is the largest city of the United States?",
    "What is the largest desert in the world?",
    "How Solar Panels Work",
  ];

  return (
    <div className="px-4 mx-4">
      <div className="min-h-screen bg-gradient-to-b from-background/50 to-muted/30 dark:from-background dark:to-muted/10">
        <main className="container">
          {/* Hero Section */}
          <section className="py-24 text-center space-y-6">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Search Smarter with AI
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Ask complex questions. Get answers powered by Gemini AI.
            </p>

            {/* Animated Search Bar */}
            <div className="max-w-3xl mx-auto relative animate-fade-in-up">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative">
                  <Input
                    placeholder="Ask me anything..."
                    className="h-14 text-lg pl-14 pr-24 rounded-full shadow-lg border-0 ring-2 ring-muted/50 focus:ring-primary focus-visible:ring-offset-0 bg-background"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <SearchIcon className="absolute left-4 top-4 w-6 h-6 text-muted-foreground" />
                  <Button
                    size="lg"
                    className="absolute right-2 top-2 rounded-full px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-primary/20 transition-all duration-300"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Example Queries */}

          <section className="py-16 mx-auto px-10">
            <h3 className="text-xl font-semibold text-center mb-8 text-muted-foreground">
              Try asking something like...
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {exampleQueries.map((query, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-4 border rounded-xl cursor-pointer",
                    "hover:border-primary/30 hover:bg-muted/10",
                    "transition-all duration-300 hover:-translate-y-1",
                    "bg-background/80 backdrop-blur-sm",
                    "group relative overflow-hidden border-muted/30"
                  )}
                  onClick={() => handleQueryClick(query)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <p className="text-muted-foreground group-hover:text-foreground">
                    {query}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Toaster richColors closeButton position="bottom-right" expand={false} />
    </div>
  );
}
