import { useState, useContext } from "react";
import { UsuarioContext } from "../contexts/UsuarioContext.tsx";
import { useNavigate } from "react-router-dom"

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { getUsuario, usuario } = useContext(UsuarioContext);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email, password);
        getUsuario(email, password);
        console.log(usuario);           
    }

    const handleCadastro = () => {
        navigate('/cadastro');
    }

    return (

        <>
            <div className='w-full h-screen'>
                <div className='w-screen px-20 py-7'>
                    
                </div>
                <div className='h-[calc(100vh-5.2rem)] max-h-[calc(100vh-5.2rem)] bg-loginBG bg-cover bg-no-repeat bg-center bg-lightgray flex justify-center items-center gap-60'>
                    <div className="text-white flex flex-col gap-[1.76rem] max-w-[36rem]">
                        <h2 className="text-[3.785rem] [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] font-bold leading-tight">Nosso aplicativo é referência nacional na área de saúde</h2>
                        <p className="text-[1.3rem] font-medium">Mais de 1.000.000 de usuários.<br/>Experimente agora mesmo</p>
                    </div>

                    <div className="w-[34.5rem] h-[39.7rem] pl-10 py-16 rounded-3xl bg-white text-preto leading-tight">
                        <h2 className="font-bold text-4xl">Logue na sua conta</h2>
                        <form action="" className="flex flex-col pr-[2.5rem] mt-16" onSubmit={handleLogin}>
                            <label htmlFor="email" className="mb-2">Email</label>
                            <input type="email" name="email" id="email" className="w-full h-16 rounded-lg border border-cinza-400 text-xl mb-16 p-4" onChange={e => setEmail(e.target.value)}/>
                            <label htmlFor="password" className="mb-2">Senha</label>
                            <input type="password" name="password" id="password" className="w-full h-16 rounded-lg border border-cinza-400 text-xl mb-16 p-4" onChange={e => setPassword(e.target.value)}/>

                            <div className="flex justify-around">
                                <button className="w-[12rem] h-[4.2rem] `px-12 py-3 rounded-17 text-white bg-vermelho hover:bg-vermelho-700 self-center" type="submit">
                                    Avançar
                                </button>
                                <button className="w-[12rem] h-[4.2rem] `px-12 py-3 rounded-17 text-white bg-vermelho hover:bg-vermelho-700 self-center" onClick={handleCadastro}>
                                    Cadastrar
                                </button>

                            </div>
                            
                        </form>
                            
                    </div> 
                </div>
            </div>
        </>


    )
}