# MySQL Buddy
## SQL query editor
Live Link: https://altan-frontent.vercel.app/

## Test table: employees
## test command: select * from employees

# Features:
1. MySQL Buddy has 3 main sections: SQL Terminal to query DB, Output Terminal, and Query History.
2. SQL Terminal is a rich code Editor, The Query button is Disabled while processing the query.
3. By default one can see only 3 rows on the Output terminal, on click of "show more", one can view the whole table in a paginated format. while the show more dialog is loading a skeleton is displayed.
4. There is a clear Terminal Button to empty the terminal.

## Page Load Time (from chrome dev tools)
DOMContentLoaded: 2.66 s
Load: 4.89 s

## Tech Stack: React, Node, PostgreSQL
## Libraries used:
material UI 5
Axios
Monaco Editor
react-syntax-highlighter
