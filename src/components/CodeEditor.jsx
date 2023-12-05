// MonacoEditor.jsx

import React, { useRef, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { languages } from 'monaco-editor';

const CodeEditor = ({ value, onChange }) => {
    const editorRef = useRef(null);

    const options = {
        selectOnLineNumbers: true,
      };

      const handleEditorChange = (newValue) => {
        if (onChange) {
          onChange(newValue);
        }
      };

    return (
        <MonacoEditor
            language="sql"
            theme="vs-dark" // You can change the theme as needed
            value={value}
            width="100%"
            height="200px"
            options={options}
            onChange={handleEditorChange}
        />
    );
};

export default CodeEditor;
