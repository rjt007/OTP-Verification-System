import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './SignIn';
import Otp from './Otp';
import Success from './Success';

const App = ()=>{
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<SignIn/>}/>
          <Route path='/otp' element={<Otp/>}/>
          <Route path='/success' element={<Success/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
