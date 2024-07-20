import { agendamentoType } from "../types";
import { SearchBar } from "../components/SearchBar"
import { SideBar } from "../components/SideBar/SideBar"


export default function Historico() {
    const agendamentosUsuario = JSON.parse(localStorage.getItem('agendamentosUsuario') || '[]');
    const teste = async (testado: Date) => {
        console.log(testado)
    }

    return (
        <div className="flex">
            <SideBar></SideBar>
            <div className="flex flex-col items-center w-full">
                <div className="flex content-center justify-center pt-12 pb-16 w-full"><SearchBar></SearchBar></div>
                <h1 className="text-center text-branco text-5xl pb-12">Histórico de Agendamento do Usuário</h1>
                <div className="grid grid-cols-2 gap-12 items-center justify-center p-4">
                    {agendamentosUsuario.map((agendamento: agendamentoType, index: number) => (
                        <li key={index} className="list-none">
                            <div className="">
                                <div className="w-[25rem] h-[25rem] rounded-3xl bg-white text-preto leading-tight">
                            
                                    <button className=' rounded-10 h-[20rem] w-[25rem] hover' onClick={() => teste(agendamento.data_hora)}>
                                        
                                        <div className='flex flex-col items-center justify-center h-[23.125rem] gap-2'>
                                            <h4 className='text-2xl font-semibold'>Vacinou-se: {agendamento.realizado}</h4>
                                            <p className="text-lg">Nome: {agendamento.nome}</p>
                                            <p className="text-lg">Nascimento: {agendamento.nascimento ? new Date(agendamento.nascimento).toLocaleDateString() : 'Data não disponível'}</p>
                                            <p className="text-xl">{agendamento.data_hora ? new Date(agendamento.data_hora).toString() : 'Data não disponível'}</p>
                                        </div>

                                    </button>

                                </div>
                            </div>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    );
}