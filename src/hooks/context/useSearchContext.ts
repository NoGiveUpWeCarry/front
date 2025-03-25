import { useContext, createContext } from 'react';

interface SearchContextType {
  isLoading: boolean;
  keyword: string;
  onNavigate: (path: string) => void;
}

export const SearchContext = createContext<SearchContextType | null>(null);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchContext');
  }
  return context;
};
