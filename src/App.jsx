import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './App.css';
import Items from './Items';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Items />
    </QueryClientProvider>
  );
}

export default App;
