import './App.css';

import React, { useEffect } from 'react';
import axios from 'axios';

function App() {

  useEffect(() => {
    axios
      .get("/api/users/test")
      .then((response) => {
        alert(response.data.message);
        console.log(response.data);
      })
      .catch((err) => {
        alert('Ocorreu um erro, cheque o console para mais informações');
        console.log(err);
      });
  });

  return (
   <div>
      <h1>Home</h1>
   </div>
  );
}

export default App;
