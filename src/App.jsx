import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dealer from './home/dealer'
import Edit from './components/edit'
import Subdealer from './home/subdealer'
import Groupdealer from './home/groupdealer'
import Tabdealer from './home/tab'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dealer/>} />
    </Routes>
    <Routes>
      <Route path='/update' element={<Edit/>} />
    </Routes>
    <Routes>
      <Route path='/tab' element={<Tabdealer tab='1'/>} />
      <Route path='/subdealer' element={<Subdealer />} /> 
      <Route path="/groupdealer" element={<Groupdealer />} /> 
    </Routes>
    </BrowserRouter>
  )
}

export default App
