import './App.css';
import { useState, createContext } from 'react';
import CodeEditor from './components/CodeEditor';
import Home from './Pages/Home';
import TerminalHistory from './components/TerminalHistory';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const OutputContext = createContext({
  outputRows: [],
  outputFields: [],
  outputResults: [],
  updateData: () => { }
});

export const MessageContext = createContext({
  error: "",
  success: "",
  updateMessage: () => { }
})


function App() {
  const [outputRows, setOutputRows] = useState([])
  const [outputFields, setOutputFields] = useState([])
  const [outputResults, setOutputResults] = useState([])
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [terminalHistory, setTerminalHistory] = useState([])

  const updateOutputData = (data, query) => {
    setOutputRows((prevState) => [...prevState, data.message.rows])
    setOutputFields((prevState) => [...prevState, data.message.fields])
    setOutputResults((prevState) => [...prevState, {
      query: query,
      status: `${data.message.command} proccessed successfully`,
      dateTime: Date.now()
    }])
  }

  const handleClearTerminaHistory = () => {
    setOutputFields([]);
    setOutputResults([]);
    setOutputRows([]);
    setTerminalHistory([]);
  }

  const updateMessage = (message, isError) => {
    if (isError)
      setError(message)
    else
      setSuccess(message)
    setTimeout(() => {
      setError("")
      setSuccess("")
    }, 10000)
  }

  const outputContextValue = {
    outputRows,
    outputFields,
    outputResults,
    updateOutputData
  }

  const messageContextValue = {
    error,
    success,
    updateMessage
  }

  return (
    <MessageContext.Provider
      value={messageContextValue}
    >
      <OutputContext.Provider
        value={outputContextValue}
      >
        <div className="App">
          <div className="left-section">
            <h2>MySQL Buddy</h2>
            <div className='terminal-history'>
              <h4 style={{ marginLeft: 10 }}>Terminal History</h4>
              <TerminalHistory terminalHistory={terminalHistory} />
            </div>
            <Button variant="contained"
              style={{ background: "#DCA3FF", color: "black", fontWeight: "700", width: 200 }}
              onClick={handleClearTerminaHistory}
            >
              <div style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}><p>Clear History</p> <DeleteIcon style={{ height: 14, width: 14 }} /></div>
            </Button>
          </div>
          <div className="right-section">
            <Home setTerminalHistory={setTerminalHistory} />
          </div>
        </div>
      </OutputContext.Provider>
    </MessageContext.Provider>
  );
}

export default App;
