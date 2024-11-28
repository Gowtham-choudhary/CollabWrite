import './App.css';
import TextEditor from './TextEditor';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
  Routes,
} from "react-router-dom"
import { v4 as uuidV4 } from "uuid"

function App() {
  return (
    <BrowserRouter>
       <Routes>
           <Route path='/' to={`/documents/${uuidV4()}`}></Route>
           <Route path="/documents/:id" element={ <TextEditor />}></Route>
       </Routes>
    </BrowserRouter>
  );
}

export default App;
