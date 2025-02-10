'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

async function searchWeb(text: string) {
  if (!text.trim()) return '';
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify("(GIVE ONLY 1 detailed RESPONSE):" + text),
    });
    return await response.text();
  } catch {
    return "Sorry, I'm having trouble connecting. Please try again later.";
  }
}

function ChatContent() {
  const searchParams = useSearchParams();
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [inputText, setInputText] = useState(searchParams.get('search') || '');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    
    const userMessage = inputText;
    setChatHistory(prev => [...prev, `You: ${userMessage}`]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await searchWeb(userMessage);
      setChatHistory(prev => [...prev, `Bot: ${response}`]);
    } catch  {
      setChatHistory(prev => [...prev, `Bot: Failed to get response. Please try again.`]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/50 to-muted/30 dark:from-background dark:to-muted/10">
      <main className="container mx-auto p-4 md:p-6 max-w-2xl">
        <Card className="w-full p-6 space-y-6 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
            <p className="text-muted-foreground">Ask me anything and I&apos;ll help you out</p>
          </div>
          
          <ScrollArea className="h-[60vh] rounded-md border">
            <div className="p-4 space-y-8">
              {chatHistory.map((message, index) => {
                const isUser = message.startsWith('You: ');
                const content = message.replace(/^(You|Bot): /, '');
                const timestamp = format(new Date(), 'HH:mm');

                return (
                  <div 
                    key={index}
                    className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      {isUser ? (
                        <>
                          <AvatarImage src="/user-avatar.png" />
                          <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="/bot-avatar.png" />
                          <AvatarFallback className="bg-secondary text-secondary-foreground">AI</AvatarFallback>
                        </>
                      )}
                    </Avatar>

                    <Card className={`max-w-[75%] p-4 rounded-xl shadow-sm ${
                      isUser 
                        ? 'bg-primary/10 border-primary/20'
                        : 'bg-muted/50 border-muted'
                    }`}>
                      <p className="text-sm text-foreground">{content}</p>
                      <p className="text-xs mt-2 text-muted-foreground/70">
                        {timestamp}
                      </p>
                    </Card>
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">AI</AvatarFallback>
                  </Avatar>
                  <Card className="p-4 rounded-xl bg-muted/50 border-muted">
                    <div className="flex gap-2 items-center">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-100" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-200" />
                    </div>
                  </Card>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend} 
              className="gap-2 px-6"
              disabled={isLoading || !inputText.trim()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              Send
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}