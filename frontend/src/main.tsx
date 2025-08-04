import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import Router from './router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
          <ReactQueryDevtools />
      </QueryClientProvider>
  </StrictMode>
)
