import React from 'react';
import './App.css';
import LifecycleEx from './LifecycleEx';

function App() {
  const [is_show, setIsShow] = React.useState(true);
  return (
    <div className="App">
      
      {is_show ? (<LifecycleEx />) : null }

      <button onClick={()=>{setIsShow(false)}}>없어져라 !</button>
    </div>
  );
}

export default App;
