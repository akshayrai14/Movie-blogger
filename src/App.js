import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Pages/Main/Main';
import Login from './Pages/Login';
import Navbar from './components/Navbar';
import Createpost from './Pages/create-post/Createpost'
function App() {
  //Navbar should be inside Router because Link is a part of react router dom
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/home" element={<Main></Main>}></Route>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/createpost" element={<Createpost></Createpost>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
