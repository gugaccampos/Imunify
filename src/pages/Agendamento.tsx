import { agendamentoType } from '../types';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from '../components/Modal';
import { SideBar } from '../components/SideBar/SideBar';
import { SearchBar } from '../components/SearchBar';
import { useContext, useEffect, useState } from 'react';
import { AgendamentoContext } from '../contexts/AgendamentoContext';

// Definindo o schema de validação com Zod
const agendamentoSchema = z.object({
  nome: z.string().nonempty("Nome é obrigatório"),
  data_hora: z.date({
    required_error: "Data e Hora são obrigatórios",
    invalid_type_error: "Formato de data e hora inválido",
  }),
  nascimento: z.date({
    required_error: "Data de nascimento é obrigatória",
    invalid_type_error: "Formato de data inválido",
  }),
  realizado: z.string().nonempty("Horário é obrigatório")
});

export default function Agendamento() {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<agendamentoType>({
    resolver: zodResolver(agendamentoSchema)
  });
  const {createAgendamento, setOpenModal} = useContext(AgendamentoContext);
  const [errorMessage, setErrorMessage] = useState("");

  const usuarioLocal = JSON.parse(localStorage.getItem('user') || '{}');
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');

  useEffect(() => {
    if (usuarioLocal) {
      setValue('nome', usuarioLocal.nome);
      setValue('nascimento', new Date(usuarioLocal.nascimento));
      console.log(new Date(usuarioLocal.nascimento));
    }
  }, [setValue, usuarioLocal]);

  const onSubmit = async (data: agendamentoType) => {
    const agendamentoDate = new Date(data.data_hora.toISOString().split('T')[0] + data.realizado);
    const agendamentosNoHorario = agendamentos.filter((agendamento: agendamentoType) =>
      new Date(agendamento.data_hora).getTime() === agendamentoDate.getTime()
    );

    if (agendamentosNoHorario.length >= 2) {
      setErrorMessage("Já existem 2 agendamentos para este horário.");
      return;
    }

    console.log('Dados enviados:', data);
    data.data_hora = agendamentoDate;
    data.idUsuario = usuarioLocal.id;
    createAgendamento(data);
    setOpenModal(true);
  };

  return (
    <div className='w-full h-screen flex '>
        <SideBar></SideBar>
            <div className="flex flex-col items-center w-full">
                <div className="flex content-center justify-center pt-12 pb-20 w-full"><SearchBar></SearchBar></div>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-6 rounded-lg shadow-md w-[50rem]'>
                    <h2 className="text-2xl font-bold mb-4">Agendamento</h2>
                    
                    {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
                    
                    <div className='mb-4'>
                    <label htmlFor="nome" className="block mb-2">Nome</label>
                    <Controller
                        name="nome"
                        control={control}
                        render={({ field }) => (
                        <input
                            {...field}
                            id="nome"
                            className="w-full px-4 py-2 border rounded-lg"
                            type="text"
                            placeholder="Nome"
                        />
                        )}
                    />
                    {errors.nome && <span className="text-red-600">{errors.nome.message}</span>}
                    </div>
                    
                    <div className='mb-4'>
                    <label htmlFor="nascimento" className="block mb-2">Data de Nascimento</label>
                    <Controller
                        name="nascimento"
                        control={control}
                        render={({ field }) => (
                        <DatePicker
                            selected={field.value}
                            onChange={(date: Date | null ) => field.onChange(date)}
                            dateFormat="dd/MM/yyyy"
                            className="w-[46.875rem] px-4 py-2 border rounded-lg"
                            placeholderText="Selecione a data de nascimento"
                        />
                        )}
                    />
                    {errors.nascimento && <span className="text-red-600">{errors.nascimento.message}</span>}
                    </div>

                    <div className='mb-4'>
                    <label htmlFor="data_hora" className="block mb-2">Data do Agendamento</label>
                    <Controller
                        name="data_hora"
                        control={control}
                        render={({ field }) => (
                        <DatePicker
                            selected={field.value}
                            onChange={(date: Date | null) => field.onChange(date || new Date())}
                            //showTimeSelect
                            dateFormat="dd/MM/yyyy"//Pp
                            className="w-[46.875rem] px-4 py-2 border rounded-lg"
                            placeholderText="Selecione a data e hora"
                        />
                        )}
                    />
                    {errors.data_hora && <span className="text-red-600">{errors.data_hora.message}</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="realizado" className="block mb-2">Horarios Disponíveis</label>
                        <Controller
                            name="realizado"
                            control={control}
                            render={({ field }) => (
                                <select {...field} className="w-full px-4 py-2 border rounded-lg" name="realizado" id="realizado">
                                    <option value="">Selecione uma opção</option>
                                    <option value="T08:00:00.00Z">08:00</option>
                                    <option value="T09:00:00.00Z">09:00</option>
                                    <option value="T10:00:00.00Z">10:00</option>
                                    <option value="T11:00:00.00Z">11:00</option>
                                    <option value="T12:00:00.00Z">12:00</option>
                                    <option value="T13:00:00.00Z">13:00</option>
                                    <option value="T14:00:00.00Z">14:00</option>
                                    <option value="T15:00:00.00Z">15:00</option>
                                    <option value="T16:00:00.00Z">16:00</option>
                                    <option value="T17:00:00.00Z">17:00</option>
                                </select>
                            )}
                        />
                    {errors.realizado && <span className="text-red-600">{errors.realizado.message}</span>}
                    </div>
                    
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:border-vermelho hover:border-4 hover:bg-vermelho">
                    Agendar
                    </button>
                </form>
            </div>
      <Modal message={"Agendamento Criado com sucesso!"}></Modal>
    </div>
  );
}
