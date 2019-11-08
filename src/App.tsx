import React, { FunctionComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import { MyForm } from './components/MyForm';
import TextField from './components/TextField';
import TicTacToe from './components/TicTacToe'
import KanyeRest from './components/KanyeRest'

const App: React.FC = () => {
  return (
    <div className="App">
        {/* <MyForm firstName="Hello" lastName="World" age={23} /> */}
        <TextField text="hellow world"/>
        <TicTacToe />
        {/* <KanyeRest /> */}
    </div>
  );
}

export default App;
 