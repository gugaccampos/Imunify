import { agendamentoType } from "../types";
import { SearchBar } from "../components/SearchBar"
import { SideBar } from "../components/SideBar/SideBar"
import { AgendamentoContext } from "../contexts/AgendamentoContext";
import { useContext } from "react";
import Modal from "../components/Modal";


export default function Historico() {
    const agendamentosUsuario = JSON.parse(localStorage.getItem('agendamentosUsuario') || '[]');
    const { updateAgendamento, setOpenModal } = useContext(AgendamentoContext);
    const upRealizou = async (agendamento: agendamentoType) => {
        agendamento.realizado = 'Sim';
        console.log(agendamento)
        updateAgendamento(agendamento);
        setOpenModal(true);
    }

    const upFaltou = async (agendamento: agendamentoType) => {
        agendamento.realizado = 'Não';
        console.log(agendamento)
        updateAgendamento(agendamento);
        setOpenModal(true);
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
                                <div className="w-[25rem] h-[25rem] rounded-3xl bg-white text-preto leading-tight flex flex-col items-center justify-center">
                            
                                    <div className='rounded-10 h-[20rem] w-[25rem] hover flex flex-col items-center justify-center'>
                                        
                                        <div className='flex flex-col items-center justify-center h-[23.125rem] gap-2'>
                                            {agendamento.realizado ? (
                                                <h4 className='text-2xl font-semibold'>Vacinou-se: {agendamento.realizado}</h4>
                                            ) : (
                                                <div className="flex justify-around w-[22rem] pb-10">
                                                    <button onClick={() => upRealizou(agendamento)} className="w-[10rem] h-[5rem] rounded-3xl bg-lime-500 text-brano leading-tight flex flex-col items-center justify-center hover:border-blue-800 hover:border-4 hover:scale-[1.05]">Realizou</button>
                                                    <button onClick={() => upFaltou(agendamento)} className="w-[10rem] h-[5rem] rounded-3xl bg-vermelho-500 text-brano leading-tight flex flex-col items-center justify-center hover:border-blue-800 hover:border-4 hover:scale-[1.05]">Faltou</button>
                                                </div>
                                            )}
                                            
                                            <p className="text-lg">Nome: {agendamento.nome}</p>
                                            <p className="text-lg">Nascimento: {agendamento.nascimento ? new Date(agendamento.nascimento).toLocaleDateString() : 'Data não disponível'}</p>
                                            <p className="text-xl ml-4">{agendamento.data_hora.toString()}</p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </li>
                    ))}
                </div>
            </div>
            <Modal message={'Agendamento atualizado com sucesso!'}></Modal>
        </div>
    );
}