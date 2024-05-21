import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import ProductItem from './components/ProductItem';
import { FurrlProvider } from './context/furrlContext';
import './App.css';

const App = () => {

  return (
    <BrowserRouter>
      <FurrlProvider>
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route exact path='/productitem/:id' Component={ProductItem} />
        </Routes>
      </FurrlProvider>
    </BrowserRouter>
  )
}
export default App;
