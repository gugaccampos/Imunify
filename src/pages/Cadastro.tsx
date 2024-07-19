import { useState, useContext } from "react";
import { UsuarioContext } from "../contexts/UsuarioContext.tsx";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dataNascimento, setDataNascimento] = useState<Date | null>(null);
    const { createUsuario, usuario } = useContext(UsuarioContext);
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validação simples como exemplo
        if (!nome || !email || !password || !dataNascimento) {
        toast.error('Por favor, preencha todos os campos.', {
            position: "top-right",
            theme: "light",
        });
        return;
        }
        console.log(nome, email, password, dataNascimento);
        
        createUsuario({
            id: '', 
            nascimento: dataNascimento, 
            nome: nome, 
            email: email, 
            senha: password
        });
        console.log(usuario);
        toast.error('Email já cadastrado!', {
            position: "top-right",
            theme: "light",
        });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                closeOnClick
                theme="light"
            />
            <div className='w-full h-screen'>
                <div className='w-screen px-20 py-7 pt[8rem]'></div>
                <div className='h-[calc(100vh-5.2rem)] max-h-[calc(100vh-5.2rem)] bg-loginBG bg-cover bg-no-repeat bg-center bg-lightgray flex justify-center items-center gap-60 pt[8rem]'>
                    <div className="w-[34.5rem] h-[55.7rem] pl-10 py-16 pt[8rem] rounded-3xl bg-white text-preto leading-tight">
                        <h2 className="font-bold text-4xl">Crie sua conta</h2>
                        <form className="flex flex-col pr-[2.5rem] mt-16" onSubmit={handleLogin}>
                            <label htmlFor="nome" className="mb-2">Nome</label>
                            <input type="nome" name="nome" id="nome" className="w-full h-16 rounded-lg border border-cinza-400 text-xl mb-16 p-4" onChange={e => setNome(e.target.value)} />
                            <label htmlFor="email" className="mb-2">Email</label>
                            <input type="email" name="email" id="email" className="w-full h-16 rounded-lg border border-cinza-400 text-xl mb-16 p-4" onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="password" className="mb-2">Senha</label>
                            <input type="password" name="password" id="password" className="w-full h-16 rounded-lg border border-cinza-400 text-xl mb-16 p-4" onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="dataNascimento" className="mb-2">Data de Nascimento</label>
                            <DatePicker
                                selected={dataNascimento}
                                onChange={(date: Date | null) => setDataNascimento(date)}
                                dateFormat="dd/MM/yyyy"
                                className="w-full h-16 rounded-lg border border-cinza-400 text-xl mb-16 p-4"
                                id="dataNascimento"
                                name="dataNascimento"
                                placeholderText="Selecione sua data de nascimento"
                            />
                            <button className="w-[12rem] h-[4.2rem] px-12 py-3 rounded-17 text-white bg-vermelho hover:bg-vermelho-700 self-center" type="submit">
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
