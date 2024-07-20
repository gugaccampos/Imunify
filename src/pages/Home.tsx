import { useNavigate } from "react-router-dom"
import { SearchBar } from "../components/SearchBar"
import { SideBar } from "../components/SideBar/SideBar"

export default function Home() {
    const Navigate = useNavigate()
    
    const openAgendar = async () => {
        Navigate('/agendamento')
    }

    const openHistorico = async () => {
        Navigate('/historico')
    }

    return (
        
        <div>
            <SideBar></SideBar>
            <div className="flex content-center justify-center ml-60 pt-12 mt[8rem]"><SearchBar></SearchBar></div>
            
            
                <div className='h-[calc(100vh-5.2rem)] max-h-[calc(100vh-5.2rem)] ml-80 bg-loginBG bg-cover bg-no-repeat bg-center bg-lightgray flex justify-center items-center gap-60 pt[8rem]'>
                    <div className="w-[30rem] h-[30rem] pl-10 py-16 pt[8rem] rounded-3xl bg-white text-preto leading-tight">
                        
                        <button onClick={openAgendar} className=' rounded-10 h-[20.125rem] w-[25.50rem] hover'>
                            
                            <div className='flex flex-col items-center justify-center h-[23.125rem] gap-2'>
                                <img src="src\assets\add.png" alt="add_button" />
                                <h4 className=''>
                                    Criar um novo Indicador
                                </h4>
                            </div>

                        </button>
                    </div>

                    <div className="w-[30rem] h-[30rem] pl-10 py-16 pt[8rem] rounded-3xl bg-white text-preto leading-tight">
                        
                        <button onClick={openHistorico} className=' rounded-10 h-[20.125rem] w-[25.50rem] hover'>
                            
                            <div className='flex flex-col items-center justify-center h-[23.125rem] gap-2'>
                                <img src="src\assets\32223.png" className=" w-24" />
                                <h4 className=''>
                                    Criar um novo Indicador
                                </h4>
                            </div>

                        </button>

                    </div>
                </div>
            </div>
        
    )
}

