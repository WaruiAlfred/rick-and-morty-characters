import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Characters from "./components/characters";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Characters />
    </QueryClientProvider>
  );
}

export default App;
