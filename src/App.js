
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import CreateNote from './components/CreateNote/CreateNote';
import MainNavbar from './components/Navbar/Navbar';
import MyNotes from './components/MyNotes/MyNotes'
import UpdateNote from './components/UpdateNote/UpdateNote';
import Detail from './components/Detail/Detail';
import Home from './components/Home/Home';


function App() {
  return (
    <div className="App">
      
        <BrowserRouter>
          <MainNavbar/>
          <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/detail' element={<Detail/>}/>
            <Route path='/updateNote' element={<UpdateNote/>}/>
            <Route path='/mynotes' element={<MyNotes/>}/>
            <Route path='/create' element={<CreateNote/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
