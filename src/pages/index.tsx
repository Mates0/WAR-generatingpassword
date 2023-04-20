import React from 'react';
import {AppProvider} from "@/components/AppContext";
import PasswordGenerator from "@/components/PasswordGenerator";

function App() {
  return (
      <AppProvider>
        <PasswordGenerator />
      </AppProvider>
  );
}

export default App;
