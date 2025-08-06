import React from 'react';
import OnboardingForm from './components/OnBoardingForm';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', paddingTop: 32 }}>
      <h2 style={{ textAlign: 'center' }}>Register Your Interest</h2>
      <OnboardingForm />
    </div>
  );
}

export default App;
