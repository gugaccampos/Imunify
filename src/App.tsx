import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { UsuarioProvider } from "./contexts/UsuarioContext"
import { AgendamentoProvider } from "./contexts/AgendamentoContext"
import PrivateRoutes from "./components/PrivateRoutes"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Cadastro from "./pages/Cadastro"

function App() {
  

  return (
      <>  
      
          <AuthProvider>
          <AgendamentoProvider>
              <UsuarioProvider>
                  <Routes>
                      <Route element={< PrivateRoutes />}>
                          <Route path="/" element={<Login />} />
                          <Route path="/home" element={<Home/>} />
                          <Route path="/cadastro" element={<Cadastro/>} />
                      </Route>
                  </Routes>
              </UsuarioProvider>
          </AgendamentoProvider>
          </AuthProvider>
          
      </>


  )
}

export default App
