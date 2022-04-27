import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './router';
import GlobalStyles from './assets/styles/GlobalStyles';
import { store, persistor } from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'jquery/dist/jquery.min.js';

// FONTS
import './App.css';
import './assets/fonts/AirbnbCerealBold.woff';
import './assets/fonts/AirbnbCerealLight.woff';
import './assets/fonts/AirbnbCerealMedium.woff';
// AOS
import 'aos/dist/aos.css';
import 'aos/dist/aos.js';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles />
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;
