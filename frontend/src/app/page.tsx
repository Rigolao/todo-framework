"use client";

import {AppProvider} from "@/contexts/app-context";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import App from "@/temp/app";

export default function Home() {

  const queryClient = new QueryClient();

  return (
      <div className='flex flex-col h-screen w-screen p-8'>
          <QueryClientProvider client={queryClient}>
              <AppProvider>
                  <App />
              </AppProvider>
          </QueryClientProvider>
      </div>
  );
}
