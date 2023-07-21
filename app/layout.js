'use client'

import React from 'react';
import "styles/globals.scss";
import Providers from "./providers";
import { Inter } from 'next/font/google'
import { useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


const inter = Inter({ subsets: ['latin'] });

const RootLayout = (props) => {
  const segment = useSelectedLayoutSegment();
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="en">
      {/* {isLoading ? <LoadingSpinner /> : null} */}
      <Providers>
        <body>
          <QueryClientProvider client={queryClient}>
            {props.children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
          {props.modal}
        </body>
      </Providers>
    </html >
  );
}

export default RootLayout;