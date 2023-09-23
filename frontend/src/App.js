import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './SignIn';
import Otp from './Otp';

const App = ()=>{
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<SignIn/>}/>
          <Route path='/otp' element={<Otp/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
