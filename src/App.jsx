import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { BookingProvider } from './context/BookingContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <AppRoutes />
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;

