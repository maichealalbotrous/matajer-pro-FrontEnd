import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext/AuthContext'
import AppRoutes from './Routes/AppRoutes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;