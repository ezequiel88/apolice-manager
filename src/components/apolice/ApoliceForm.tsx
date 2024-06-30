"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormMask } from 'use-mask-input';
import Loading from '../ui/Loading';
import { delay } from '@/utils/delay';
import { validateApolice } from '@/utils/validationForm';
import { Apolice } from '@/types/Apolice';
import { Cobertura } from '@/types/Cobertura';
import ModalCobertura from '../ui/ModalCobertura';
import CoberturaItem from './CoberturaItem';

import { toast } from 'react-toastify';
import { CheckIcon, ExclamationTriangleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ApoliceService } from '@/services/apoliceService';
import Swal from 'sweetalert2';

type ApoliceFormProps = {
  apolice?: Apolice
}

export default function ApoliceForm({ apolice }: ApoliceFormProps) {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [openModalCobertura, setOpenModalCobertura] = useState<boolean>(false);
  const apoliceService = new ApoliceService()

  const { handleSubmit, register, setValue, getValues, reset, formState: { errors } } = useForm<Apolice>({
    resolver: zodResolver(validateApolice),
    defaultValues: apolice || {
      numero: "",
      valor_premio: "",
      segurado: {
        nome: '',
        email: '',
        cpf_cnpj: ''
      },
      coberturas: []
    },
    mode: 'onSubmit'
  });

  const registerWithMask = useHookFormMask(register);

  useEffect(() => {
    if (apolice) {
      const { numero, valor_premio, segurado, coberturas } = apolice;
      setValue('numero', String(numero));
      setValue('valor_premio', parseFloat(String(valor_premio)).toFixed(2));
      setValue('segurado.nome', segurado.nome);
      setValue('segurado.email', segurado.email);
      setValue('segurado.cpf_cnpj', segurado.cpf_cnpj);

      coberturas.forEach((cobertura, index) => {
        setValue(`coberturas.${index}.nome`, cobertura.nome);
        setValue(`coberturas.${index}.valor`, parseFloat(String(cobertura.valor)).toFixed(2));
      });
    }
  }, [apolice, setValue]);


  const addCobertura = (cobertura?: Cobertura) => {
    if (cobertura) {
      const updatedCoberturas = [...getValues().coberturas, cobertura];
      setValue('coberturas', updatedCoberturas);
      reset({ ...getValues(), coberturas: updatedCoberturas })
    }
    setOpenModalCobertura(false)
  }

  const removeCobertura = (index: number) => {
    const updatedCoberturas = getValues().coberturas.filter((_, i) => i !== index);
    setValue('coberturas', updatedCoberturas);
    reset({ ...getValues(), coberturas: updatedCoberturas })
  };

  const onSubmit = async (formData: Apolice) => {
    try {
      setLoading(true);

      formData.numero = parseFloat(String(formData.numero).replace(',', '.'))
      formData.valor_premio = parseFloat(String(formData.valor_premio).replace(',', '.'))
      formData.coberturas = formData.coberturas.map((c) => ({
        ...c,
        valor: parseFloat(String(c.valor).replace(',', '.'))
      }))

      if (apolice) {
        formData.id = apolice.id
        const res = await apoliceService.updateApolice({ apolice: formData });
        if (res.error) {
          toast.warning(res.message);
          return
        }
        toast.success(res.message);
      } else {
        const res = await apoliceService.createApolice({ apolice: formData });
        if (res.error) {
          toast.warning(res.message);
          return
        }
        toast.success(res.message);
      }

      await delay(1000);
      router.replace('/');
    } catch (error) {
      toast.error('Verifique os dados informados e tente novamente');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.replace('/');
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Excluir Apólice?",
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      focusCancel: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await apoliceService.deleteApolice({ id });
          toast.success('Apólice excluída com sucesso');
          router.replace('/');
        } catch (error) {
          toast.error('Não foi possível excluir a Apólice');
        } finally {
          setLoading(false);
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="flex flex-col">
        <p className="text-sm font-semibold leading-6 text-gray-900 mb-2">📌 Dados do Segurado</p>

        <div className="flex flex-col mb-4 md:mb-0 md:w-1/2">
          <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
            Nome Completo
          </label>
          <input
            {...register('segurado.nome')}
            id="nome"
            autoComplete='off'
            name="segurado.nome"
            autoFocus={!apolice}
            className={`w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.segurado?.nome ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6`}
          />
          {errors.segurado?.nome && <p className="text-red-500 text-xs mt-1">{errors.segurado.nome.message}</p>}
        </div>

        <div className="flex flex-col md:mt-4 md:flex-row md:space-x-6 md:w-1/2">
          <div className="flex flex-1 flex-col mb-4 md:mb-0">
            <label htmlFor="cpf_cnpj" className="block text-sm font-medium leading-6 text-gray-900">
              CPF ou CNPJ
            </label>
            <input
              {...registerWithMask("segurado.cpf_cnpj", ["999.999.999-99", "99.999.999/9999-99"], {
                required: true,
                rightAlign: false,
                jitMasking: true
              })}
              id="cpf_cnpj"
              autoComplete='off'
              name="segurado.cpf_cnpj"
              className={`w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.segurado?.cpf_cnpj ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6`}
            />
            {errors.segurado?.cpf_cnpj && <p className="text-red-500 text-xs mt-1">{errors.segurado.cpf_cnpj.message}</p>}
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              E-mail
            </label>
            <input
              {...register('segurado.email')}
              id="email"
              autoComplete='off'
              name="segurado.email"
              className={`w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.segurado?.email ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6`}
            />
            {errors.segurado?.email && <p className="text-red-500 text-xs mt-1">{errors.segurado.email.message}</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <p className="text-sm font-semibold leading-6 text-gray-900 mb-2">📌 Dados da Apólice</p>
        <div className="flex flex-col md:flex-row md:space-x-6 md:w-1/2">
          <div className="flex flex-1 flex-col mb-4 md:mb-0">
            <label htmlFor="numero" className="block text-sm font-medium leading-6 text-gray-900">
              Número
            </label>
            <input
              {...register('numero')}
              id="numero"
              autoComplete='off'
              name="numero"
              className={`w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.numero ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6`}
            />
            {errors.numero && <p className="text-red-500 text-xs mt-1">{errors.numero.message}</p>}
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="valor_premio" className="block text-sm font-medium leading-6 text-gray-900">
              Valor Prêmio (R$)
            </label>
            <input
              {...register('valor_premio')}
              id="valor_premio"
              autoComplete='off'
              name="valor_premio"
              className={`w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.valor_premio ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6`}
            />
            {errors.valor_premio && <p className="text-red-500 text-xs mt-1">{errors.valor_premio.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-8">
        <div className="flex items-center space-x-4 mb-2">
          <p className="text-sm font-semibold leading-6 text-gray-900">📌 Coberturas</p>
          <button
            type="button"
            className={`text-gray-50 bg-green-600 hover:bg-green-800 hover:text-white rounded-md px-2 py-1 text-xs font-medium`}
            onClick={() => setOpenModalCobertura(true)}
          >
            Adicionar Cobertura
          </button>
        </div>

        <ModalCobertura open={openModalCobertura} onClose={addCobertura} />

        <div className="grid grid-cols md:grid-cols-3 mt-4 gap-6">
          {
            getValues().coberturas.length > 0 ?
              getValues().coberturas.map((c, index) => (
                <CoberturaItem key={index} cobertura={c} index={index} removeCobertura={removeCobertura} />
              ))
              :
              <div className='flex space-x-2'>
                <ExclamationTriangleIcon className='text-orange-600 h-4 w-4' />
                <p className='text-xs text-gray-700'>Apólice deve conter pelo menos uma cobertura!</p>
              </div>
          }
        </div>

      </div>
      <hr className="my-8" />
      <div className="flex flex-col md:flex-row gap-4">
        <button
          type="button"
          disabled={loading}
          className="w-full md:w-32 flex gap-2 items-center justify-center rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={handleCancel}
        >
          <XMarkIcon className='w-4 h-4 text-red' /><span>Cancelar</span>
        </button>
        <div className='flex flex-1 flex-col md:flex-row md:justify-end gap-4'>
          {apolice &&
            <button
              type="button"
              disabled={loading}
              onClick={() => handleDelete(apolice.id)}
              className="w-full md:w-32  flex gap-2 items-center justify-center rounded-md bg-red-400 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600"
            >
              <TrashIcon className='w-4 h-4 text-white' /><span>Excluir</span>
            </button>
          }
          <button
            type="submit"
            disabled={loading || !getValues().coberturas.length}
            className={`w-full md:w-32  flex gap-2 items-center justify-center rounded-md bg-green-400 py-2 text-sm font-semibold text-white shadow-sm ${!getValues().coberturas.length ? 'hover:bg-green-400' : 'hover:bg-green-600'}`}
          >
            {loading ? <Loading fill="#f2f2f2" size={24} /> : <CheckIcon className='w-4 h-4 text-white' />}<span>{apolice ? 'Atualizar' : 'Salvar'}</span>
          </button>
        </div>

      </div>
    </form>
  );
};
