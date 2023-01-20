import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import './App.css'
import NavbarComponent from './components/navbar.component'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StorePage from './pages/store.page'
import SuccessPage from './pages/success.page'
import CancelPage from './pages/cancel.page'
import { CartContextProvider } from './cart.context'

function App() {
  return (
    <CartContextProvider>
      <Container>
        <NavbarComponent></NavbarComponent>
        <BrowserRouter>
          <Routes>
            <Route index element={<StorePage />} />
            <Route path='success' element={<SuccessPage />} />
            <Route path='cancel' element={<CancelPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </CartContextProvider>
  )
}

export default App
