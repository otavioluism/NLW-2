import { StatusBar } from 'expo-status-bar';
import React from 'react';

import AppStack from './src/routes/AppStack';

const App:React.FC = () => {
  return (
    <>
      <AppStack />
      <StatusBar style="light" />
    </> 
  );
}

export default App;

