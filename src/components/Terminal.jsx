import React, { useContext, useState } from 'react'
import CodeEditor from './CodeEditor';
import { Button } from '@mui/material';
import axios from 'axios';
import TerminalHistory from './TerminalHistory';
import "../components/style.css";
import CircularProgress from '@mui/material/CircularProgress';
import { MessageContext, OutputContext } from '../App';

const Terminal = ({ setTerminalHistory }) => {
    const { updateOutputData } = useContext(OutputContext)
    const { updateMessage } = useContext(MessageContext)
    const [sqlQuery, setSqlQuery] = useState('Type SQL Query Here ...');
    const [isQueryFetching, setIsQueryFetching] = useState(false)

    const handleQueryChange = (newQuery) => {
        setSqlQuery(newQuery);
    };

    const onSubmitQuery = async () => {
        try {
            setIsQueryFetching(true)
            const apiResponse = await axios.post("https://atlan-backend.onrender.com/", { query: sqlQuery })
            setTerminalHistory(prevState => [...prevState, sqlQuery])
            updateOutputData(apiResponse.data, sqlQuery)
            setSqlQuery("");
            if (apiResponse.status === 200)
                updateMessage(`${apiResponse.data.message.command} proccessed command successfully`, false)
            else
                updateMessage(`${apiResponse.data.message.command} command failed`, true)
            setIsQueryFetching(false)
        } catch (error) {
            setIsQueryFetching(false)
            updateMessage(error.response.data, true)
        }
    }

    return (
        <div className='terminal-container'>
            <div className='code-editor' style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, padding: 20 }}>
                <CodeEditor value={sqlQuery} onChange={handleQueryChange} />
                <Button variant="contained"
                    disabled={isQueryFetching}
                    style={{ background: "#DCA3FF", color: "black", fontWeight: "700", width: 200 }}
                    onClick={onSubmitQuery}
                >
                    {isQueryFetching ?
                        <div style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}><p>Proccessing</p> <CircularProgress style={{ height: 14, width: 14 }} /></div>
                        :
                        "Query"}
                </Button>
            </div>
        </div>
    )
}

export default Terminal