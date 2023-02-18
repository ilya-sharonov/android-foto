import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <form action="/foto" method="post" encType="multipart/form-data">
                <input accept="image/*" id="icon-button-file" name="foto" type="file" capture="environment" />
                <input type="submit" value="Send" />
            </form>
        </div>
    );
}

export default App;
