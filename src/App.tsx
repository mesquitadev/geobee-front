import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import AppProvider from '@/providers/AppProvider';
import { theme } from './styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <BrowserRouter>
        <AppProvider>
          <Routes />
        </AppProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
