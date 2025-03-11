import router from '@/routes/router';
import queryClient from '@/utils/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Theme } from '@radix-ui/themes';
import MetaTag from '@/utils/MetaTags';

const App = () => {
  const appRouter = createBrowserRouter(router);
  return (
    <QueryClientProvider client={queryClient}>
      <MetaTag />
      <Theme>
        <RouterProvider router={appRouter} />
      </Theme>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
