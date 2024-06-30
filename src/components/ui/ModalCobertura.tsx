import { Cobertura } from '@/types/Cobertura'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon, ShieldCheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

type ModalCoberturaProps = {
  open: boolean
  onClose: (cobertura?: Cobertura) => void
}

export default function ModalCobertura({ open, onClose }: ModalCoberturaProps) {
  const [cobertura, setCobertura] = useState<Cobertura>({
    nome: "",
    valor: ""
  })

  const [errors, setErrors] = useState<{ nome: string | null, valor: string | null }>({
    nome: null,
    valor: null
  })

  const resetModal = () => {
    setCobertura({
      nome: "",
      valor: ""
    })
    setErrors({
      nome: null,
      valor: null
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCobertura((prevCobertura) => ({
      ...prevCobertura,
      [name]: value
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null
    }))
  }

  const handleSave = () => {
    let formValid = true
    if (cobertura.nome === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nome: "Campo obrigatório"
      }))
      formValid = false
    }
    if (cobertura.valor === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        valor: "Campo obrigatório"
      }))
      formValid = false
    }

    if (formValid) {
      onClose(cobertura)
      resetModal()
    }
  }

  return (
    <Dialog className="relative z-10" open={open} onClose={() => {
      onClose();
      resetModal();
    }}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="bg-white px-4 py-5 sm:p-6 sm:pb-4">
              <div className="flex space-x-2 mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-red-600" />
                <h3 className="text-base font-semibold leading-6 text-gray-900">Adicionar Cobertura</h3>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  value={cobertura.nome}
                  onChange={handleChange}
                  required
                  data-autofocus
                  className="w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-66"
                />
                {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
              </div>

              <div className='flex flex-col mt-2'>
                <label htmlFor="valor" className="block text-sm font-medium leading-6 text-gray-900">
                  Valor (R$)
                </label>
                <input
                  id="valor"
                  name="valor"
                  value={cobertura.valor}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-66"
                />
                {errors.valor && <p className="text-red-500 text-xs mt-1">{errors.valor}</p>}
              </div>             

              <div className="flex space-x-4 justify-end mt-5 mb-2">
                <button
                  type="button"
                  className="w-full flex items-center gap-1 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-red shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                  onClick={() => {
                    onClose();
                    resetModal();
                  }}
                  data-autofocus
                >
                  <XMarkIcon className='w-4 h-4 text-red'/><span>Cancelar</span> 
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-1 justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  onClick={handleSave}
                >
                  <CheckIcon className='w-4 h-4 text-white' /><span>Adicionar</span>
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
