import { Route, Routes } from "react-router-dom"
import { UsuarioProvider } from "./contexts/UsuarioContext"
import { AgendamentoProvider } from "./contexts/AgendamentoContext"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Cadastro from "./pages/Cadastro"

function App() {
  

  return (
      <>  
      
          
          <AgendamentoProvider>
              <UsuarioProvider>
                  <Routes>
                      <Route path="/" element={<Login />} />
                      <Route path="/home" element={<Home/>} />
                      <Route path="/cadastro" element={<Cadastro/>} />
                  </Routes>
              </UsuarioProvider>
          </AgendamentoProvider>
          
      </>


  )
}

export default App
