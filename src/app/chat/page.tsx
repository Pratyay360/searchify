'use client';
import { useSearchParams } from 'next/navigation';
export default function ChatPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');
  const searchLinks =
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/50 to-muted/30 dark:from-background dark:to-muted/10 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 container mx-auto p-6 flex items-center justify-center">
        {searchQuery ? (
          <div className="bg-background rounded-lg shadow-lg dark:shadow-gray-700/30 p-6 max-w-md w-full border border-muted/50">
            <h2 className="text-xl font-semibold mb-2 text-foreground">
              Search Result
            </h2>
            <p className="text-muted-foreground">
              You searched for: {' '}
              <span className="font-medium bg-clip-text text-bold">
                {searchQuery}
              </span>
            </p>
          </div>
        ) : (
          <div className="bg-background rounded-lg shadow-lg dark:shadow-gray-700/30 p-6 max-w-md w-full text-center border border-muted/50">
            <p className="text-muted-foreground">
              Welcome to the chat page. Try adding a {' '}
              <code className="bg-muted/10 text-foreground px-2 py-1 rounded border border-muted/30">
                ?search=yourquery
              </code>{' '}
              parameter in the URL.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
