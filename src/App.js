import Pay from './Pay';
import Success from './Success';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/pay' element={<Pay />}></Route>
      </Routes>
      <Routes>
        <Route path='/success' element={<Success />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
