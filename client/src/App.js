import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateEntity from './components/CreateEntity';
import DeleteEntity from './components/DeleteEntity';
import ReadEntity from './components/ReadEntity';
import UpdateEntity from './components/UpdateEntity';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEntity/>}></Route>
          <Route path="/read" element={<ReadEntity/>}></Route>
          <Route path="/update" element={<UpdateEntity/>}></Route>
          <Route path="/delete" element={<DeleteEntity/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
