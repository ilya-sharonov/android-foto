import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <form action="http://192.168.10.116:2424/foto" method="post" encType="multipart/form-data">
                <input accept="image/*" id="icon-button-file" name="foto" type="file" capture="environment" />
                <input type="submit" value="Send" />
            </form>
        </div>
    );
}

export default App;
