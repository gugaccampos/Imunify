import { useContext } from 'react';
import { AgendamentoContext } from '../contexts/AgendamentoContext';
import { useNavigate } from 'react-router-dom';

const Modal = ({ message }: { message: string }) => {
  const { openModal, setOpenModal } = useContext(AgendamentoContext);
  const navigate = useNavigate();

  const closeModal = () => {
    setOpenModal(false);
    navigate('/home');
  };

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center pb-6">
      <div className="bg-white rounded-lg p-6 relative">
        
        <p className='text-xl pb-6'>{message}</p>

        <button
          className="className= flex w-full bg-blue-500 text-white py-2 rounded-lg hover:border-vermelho hover:border-2 hover:bg-preto items-center justify-center"
          onClick={() => closeModal()}
        >
          <p className='text-lg'>Voltar para página inicial</p>
        </button>
      </div>
    </div>
  );
};

export default Modal;