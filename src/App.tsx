import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Routers from './routes';
import ToastContainer from './components/ToastContainer';
import AppProvider from './hooks';
import { ToastProvider } from './hooks/toast';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routers />
        </ToastProvider>
      </AuthProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;


// import global from './styles/global';

// const App: React.FC = () => (
//   <h1>Hello world</h1>
// )
