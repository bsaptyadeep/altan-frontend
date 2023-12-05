import React from 'react';
import Terminal from '../components/Terminal';
import OutputTab from '../components/OutputTab';


const Home = ({setTerminalHistory}) => {
  return (
    <div className="right-section">
      <OutputTab />
      <Terminal setTerminalHistory={setTerminalHistory}/>
    </div>
  )
}

export default Home