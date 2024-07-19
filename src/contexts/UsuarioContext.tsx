import { createContext, SetStateAction, useState, Dispatch, ReactNode, useContext } from 'react';
import { usuarioType  } from '../types';
import { AgendamentoContext } from './AgendamentoContext';
import { useNavigate } from "react-router-dom"

import Api from '../Api';

interface UsuarioContextType {
    usuario: usuarioType;
    setUsuario: Dispatch<SetStateAction<usuarioType>>
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>
    createUsuario: (usuario: usuarioType) => Promise<void>;
    updateUsuario: (id: string) => Promise<void>;
    getUsuario: (email: string, senha: string) => Promise<void>;
}

interface UsuarioProviderProps {
    children: ReactNode
}

export const UsuarioContext = createContext({} as UsuarioContextType);

export function UsuarioProvider({ children }: UsuarioProviderProps) {
    const [usuario, setUsuario] = useState<usuarioType>({} as usuarioType)
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { getAgendamentos, getAgendamentosUsuario } = useContext(AgendamentoContext);
    const navigate = useNavigate();

    const createUsuario = async (usuario: usuarioType) => {

        try {
            const url = 'usuarios'

            const headers = {
                'Content-Type': 'application/json'
            }

            Api.post(url, { usuario }, { headers }).then(response => {
                console.log(response)
                setUsuario(response.data)
                getAgendamentos()
                getAgendamentosUsuario(response.data.id)

            });
        } catch (error) {
            console.log(error)
        }
    }

    const updateUsuario = async (id: string) => {
        try {
            const url = 'usuarios/' + id

            const headers = {
                'Content-Type': 'application/json'
            }

            Api.put(url, {
                id: usuario.id, nome: usuario.nome, email: usuario.email,
                senha: usuario.senha, data_nascimento: usuario.data_nascimento
            }, { headers }).then(response => {
                console.log(response)
            });

        } catch (error) {
            console.log(error)
        }
    }


    const getUsuario = async (email: string, senha: string) => {

        const url = 'usuarios/login/' + email + '/' + senha

        try {

            Api.get(url).then(response => {
                const user = response.data
                setUsuario(user)
                getAgendamentos();
                getAgendamentosUsuario(user.id);
                navigate('/home');
                

                })
                console.log(usuario)

        } catch (error) {
            console.log(error)
        }

        

    }

    return (
        <UsuarioContext.Provider value={{ usuario, setUsuario, openModal, setOpenModal, createUsuario, updateUsuario, getUsuario }}>
            {children}
        </UsuarioContext.Provider>
    )

}