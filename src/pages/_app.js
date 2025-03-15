// import CartDrawer from "@/components/CartDrawer";
import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})


function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient} className={`${inter.variable} `}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
