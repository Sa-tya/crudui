import Page from './ui/page'
import './App.css';
import FirstPage from './ui/firstPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('logged');
    if (token)
      axios.get('http://localhost:5000/', {
        params: { token }
      }).then(function (response) {
        console.log(response.data.login)
        setLogin(true);
      })
  }, [login]);
  return (
    <div className="App">
      {/* <Router> */}
        {/* <Routes>
        <Route path='/' element= */}
        <FirstPage login={login} setLogin={setLogin} />
          {/* {login ? <Page setLogin={setLogin} /> :<FirstPage setLogin={setLogin} />} */}
        {/* > */}

        {/* </Route> */}
          {/* <Route exact path='/show' element={<Page setLogin={setLogin} />}></Route> :
          <Route path='/' element={<FirstPage setLogin={setLogin} />}></Route>} */}
        {/* </Routes> */}
      {/* </Router> */}
    </div>
  );
}

export default App;
