import { Route, Routes } from "react-router-dom"
import { UsuarioProvider } from "./contexts/UsuarioContext"
import { AgendamentoProvider } from "./contexts/AgendamentoContext"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Cadastro from "./pages/Cadastro"
import Historico from "./pages/Historico"
import Agendamento from "./pages/Agendamento"

function App() {
  

  return (
      <>  
      
          
          <AgendamentoProvider>
              <UsuarioProvider>
                  <Routes>
                      <Route path="/" element={<Login />} />
                      <Route path="/home" element={<Home/>} />
                      <Route path="/cadastro" element={<Cadastro/>} />
                      <Route path="/historico" element={<Historico/>} />
                      <Route path="/agendamento" element={<Agendamento/>} />
                  </Routes>
              </UsuarioProvider>
          </AgendamentoProvider>
          
      </>


  )
}

export default App
