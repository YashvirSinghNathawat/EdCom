import './App.css'
import Header from "./Component/AppBar";
import SignIn from "./Component/SignIn";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LogIn from './Component/LogIn';
import AddCourse from './Component/AddCourse';
function App() {
  return (
    <>
      <div className="Main" style={{width:"100%",height:"100%"}}>
      
          <Router>
          <Header/>
            <Routes>
              <Route path="/signup" element={<SignIn/>}></Route>
              <Route path="/login" element={<LogIn/>}></Route>
              <Route path="/addCourse" element={<AddCourse/>}></Route>
            </Routes>
          </Router> 
      </div>
    </>
    
  );
}
export default App;