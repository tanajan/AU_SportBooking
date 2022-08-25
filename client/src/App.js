import Index from "./components/pages/index"
import React, {useState,useEffect} from 'react'
function App() {
  useEffect(() => {
    document.title = 'AU Sport Booking'
  }, [])
  return (
    <div className="App">
      <Index />
    </div>
  );
}

export default App;
