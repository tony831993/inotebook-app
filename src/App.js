import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import AlertState from './context/alert/AlertState';

function App() {
  return (
    <>
      <AlertState>
        {/* <UserContext> */}
        <NoteState>
          <Router>
            <Navbar></Navbar>
            <Alert />
            <div className="container my-2">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </Router>
        </NoteState>
        {/* </UserContext> */}
      </AlertState>
    </>
  );
}

export default App;
