import { ButtonSB } from './ButtonSB';
import { Link, useNavigate } from 'react-router-dom';
import { UsuarioContext } from '../../contexts/UsuarioContext';
import { AgendamentoContext } from '../../contexts/AgendamentoContext';
import { useContext } from 'react';
import { usuarioType } from '../../types';

export function SideBar(){

    const navigate = useNavigate();
    const { usuario, setUsuario } = useContext(UsuarioContext);
    const { agendamentosUsuario, setAgendamentosUsuario } = useContext(AgendamentoContext);

    const handleLogout = () => {
        //console.log('logout');
        setUsuario({} as usuarioType);
        setAgendamentosUsuario([]);
        console.log(usuario, agendamentosUsuario);
        navigate('/');
    }

    return (
        <div className="flex flex-col items-center h-screen fixed overflow-y-auto z-50 w-[15rem] max-w-[15rem] bg-branco border-r border-azul-400">
            <div className="pt-16 pb-12">
                <Link to={"/home"} >
                    <img src="src\components\SideBar\assets\vacine-se.png" alt="Vacine-se Logo" className=" w-[8rem] hover:scale-105 duration-300 ease-in-out"/>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-between h-full pt-24">
                <div className="flex flex-col gap-5">
                    
                    <div className="SideBarItem">
                        <Link to={"/home"}>
                            <ButtonSB pathIcon={"/src/components/SideBar/assets/IconHome.png"} buttonText={'Home'} />
                        </Link>
                    </div>
                    
                    <div className="SideBarItem">
                        <Link to={"/profile"}>
                            <ButtonSB pathIcon={"src/components/SideBar/assets/IconMeuPerfil.png"} buttonText={'Historico'}/>
                        </Link>
                    </div>
                    
                </div>

                <div className="flex flex-col justify-between content-between mb-16">

                        <div className="userInfo font-black sans font text-lg">
                            <p>{usuario.nome}</p>
                            <p>{usuario.email}</p>
                        </div>

                    <div className="SideBarItem mt-14">

                        <button onClick={() => handleLogout()}>
                            <ButtonSB pathIcon={"src/components/SideBar/assets/IconSair.png"} buttonText={'Sair'} />
                        </button>

                    </div>
                </div>
                
            </div>
        </div>
    );
} 