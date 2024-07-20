import { createContext, SetStateAction, useState, Dispatch, ReactNode } from 'react';
import { agendamentoType } from '../types';
import Api from '../Api';

interface AgendamentoContextType {
    agendamentos: agendamentoType[];
    setAgendamentos: Dispatch<SetStateAction<agendamentoType[]>>
    agendamentosUsuario: agendamentoType[];
    setAgendamentosUsuario: Dispatch<SetStateAction<agendamentoType[]>>
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>
    createAgendamento: (agendamento: agendamentoType) => Promise<void>;
    updateAgendamento: (agendamento: agendamentoType) => Promise<void>;
    getAgendamentos: () => Promise<void>;
    getAgendamentosUsuario: (idUsuario: string) => Promise<void>;
}

interface AgendamentoProviderProps {
    children: ReactNode
}

export const AgendamentoContext = createContext({} as AgendamentoContextType);

export function AgendamentoProvider({ children }: AgendamentoProviderProps) {
    const [agendamentos, setAgendamentos] = useState<agendamentoType[]>([])
    const [agendamentosUsuario, setAgendamentosUsuario] = useState<agendamentoType[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false);

    const createAgendamento = async (agendamento: agendamentoType) => {

        try {
            const url = 'agendamentos'

            const headers = {
                'Content-Type': 'application/json'
            }
            console.log(agendamento)

            Api.post(url, { nome:agendamento.nome, data_hora:agendamento.data_hora, 
                nascimento:agendamento.nascimento, idUsuario:agendamento.idUsuario }, { headers }).then(response => {
                console.log(response)
                setAgendamentos([...agendamentos, response.data])
                setAgendamentosUsuario([...agendamentosUsuario, response.data])

                const currentData = JSON.parse(localStorage.getItem('agendamentos') || '[]');
                const updatedData = [...currentData, response.data];
                localStorage.setItem('agendamentos', JSON.stringify(updatedData));

                const currentData2 = JSON.parse(localStorage.getItem('agendamentosUsuario') || '[]');
                const updatedData2 = [...currentData2, response.data];
                localStorage.setItem('agendamentosUsuario', JSON.stringify(updatedData2));

            });
        } catch (error) {
            console.log(error)
        }
    }

    const updateAgendamento = async (agendamento: agendamentoType) => {
        try {
            const url = 'agendamentos/' + agendamento.id

            const headers = {
                'Content-Type': 'application/json'
            }

            Api.put(url, {
                id: agendamento.id, nome: agendamento.nome, data_hora: agendamento.data_hora,
                nascimento: agendamento.nascimento, realizado: agendamento.realizado, idUsuario: agendamento.idUsuario
            }, { headers }).then(response => {
                console.log(response)
                setAgendamentos(agendamentos.map(agendamentoMap => agendamentoMap.id === agendamento.id ? agendamento : agendamentoMap))
                setAgendamentosUsuario(agendamentosUsuario.map(agendamentoMap => agendamentoMap.id === agendamento.id ? agendamento : agendamentoMap))
                localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
                localStorage.setItem('agendamentosUsuario', JSON.stringify(agendamentosUsuario));
                
            });

        } catch (error) {
            console.log(error)
        }
    }


    const getAgendamentos = async () => {

        const url = 'agendamentos/todos'

        try {

            Api.get(url).then(response => {
                const res = response.data
                setAgendamentos(res)
                localStorage.setItem('agendamentos', JSON.stringify(res));

                })
                console.log(agendamentos)

        } catch (error) {
            console.log(error)
        }

    }

    const getAgendamentosUsuario = async (idUsuario: string) => {

        const url = 'agendamentos/usuarios/' + idUsuario

        try {

            Api.get(url).then(response => {
                const res = response.data
                setAgendamentosUsuario(res)
                localStorage.setItem('agendamentosUsuario', JSON.stringify(res));

                })
                console.log(agendamentosUsuario)

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <AgendamentoContext.Provider value={{ agendamentos, setAgendamentos, agendamentosUsuario, setAgendamentosUsuario, openModal, setOpenModal, createAgendamento, updateAgendamento, getAgendamentos, getAgendamentosUsuario }}>
            {children}
        </AgendamentoContext.Provider>
    )

}