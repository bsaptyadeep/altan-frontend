import React, {useEffect, useRef} from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const TerminalHistory = ({ terminalHistory }) => {

    const scrollableDivRef = useRef(null);

    useEffect(() => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    }, []);

    return (
        <div ref={scrollableDivRef}>
            {
                terminalHistory.map((command) => {
                    return (
                        <SyntaxHighlighter language="sql" style={vscDarkPlus}>
                            {command}
                        </SyntaxHighlighter>
                    )
                })
            }
        </div>
    )
}

export default TerminalHistory