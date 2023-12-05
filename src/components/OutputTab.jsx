import React, { useContext, useEffect, useRef, useState } from 'react';
import './style.css'
import { MessageContext, OutputContext } from '../App';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import OutputList from '../Pages/OutputList';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: "#DCA3FF",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        color: "white"
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const OutputTab = () => {

    const { outputRows, outputFields, outputResults } = useContext(OutputContext)

    const { error, success } = useContext(MessageContext);

    const scrollableDivRef = useRef(null);

    const [selectedQuery, setSelectedQuery] = useState("")

    useEffect(() => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    }, [outputResults]);

    const formatDateTime = (dateTimeString) => {
        const inputDate = new Date(dateTimeString);
        const currentDate = new Date();
        const isToday =
            inputDate.getDate() === currentDate.getDate() &&
            inputDate.getMonth() === currentDate.getMonth() &&
            inputDate.getFullYear() === currentDate.getFullYear();

        if (isToday) {
            const hours = inputDate.getHours();
            const minutes = inputDate.getMinutes();

            const formattedTime =
                (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;

            return formattedTime;
        } else {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return inputDate.toLocaleDateString(undefined, options);
        }
    }

    const handleCloseOutputList = () => {
        setSelectedQuery("")
    }

    return (
        <div className='output-container'>
            {success !== "" &&
                <Alert style={{ position: "absolute", top: 20, width: "60vw", right: 20 }} severity="success">{success}</Alert>
            }
            {error !== "" &&
                <Alert style={{ position: "absolute", top: 20, width: "60vw", right: 50 }} severity="error">Error: {error}</Alert>
            }
            <h4>Output</h4>
            {
                <OutputList open={selectedQuery !== ""} query={selectedQuery} handleClose={handleCloseOutputList} />
            }
            <div ref={scrollableDivRef} className='output-container-box'>
                {
                    outputFields.map((fields, index) => {
                        return (
                            <div>
                                <div className='output-details-container'>
                                    <p className='result-tag'>{outputResults[index].status}</p>
                                    <p>Time: {formatDateTime(outputResults[index].dateTime)}</p>

                                </div>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            {
                                                fields.length !== 0 && fields.map(field => {
                                                    return (
                                                        <StyledTableCell>{field.name}</StyledTableCell>
                                                    )
                                                })
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {outputRows[index] &&
                                            outputRows[index].length !== 0 &&
                                            outputRows[index].map((row, rowIndex) => {
                                                if (rowIndex < 3)
                                                    return (
                                                        <StyledTableRow key={row.name}>
                                                            {
                                                                fields.length !== 0 && fields.map(field => {
                                                                    return (
                                                                        <StyledTableCell style={{ color: "white" }} align="right">{row[field.name]}</StyledTableCell>
                                                                    )
                                                                })
                                                            }
                                                        </StyledTableRow>
                                                    )
                                            })}

                                    </TableBody>
                                </Table>
                                {
                                    outputRows[index].length >= 3 &&
                                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", marginBottom: 20 }}>
                                        <div
                                            className='show-more'
                                            onClick={() => {
                                                setSelectedQuery(outputResults[index].query)
                                            }}
                                        >
                                            <p>Show Full Table (current)</p>
                                            <OpenInFullIcon style={{ width: 15 }} />
                                        </div>
                                    </div>
                                }
                                <div className="output-divider"></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OutputTab