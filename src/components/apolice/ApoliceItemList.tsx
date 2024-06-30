"use client"

import { Apolice } from '@/types/Apolice'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

type ApoliceItemListProps = {
  apolice: Apolice
}

export default function ApoliceItemList({ apolice }: ApoliceItemListProps) {
  const router = useRouter()
  return (
    <li key={apolice.id} onClick={() => router.push(`/apolice/${apolice.id}`)} className="flex justify-between px-5 py-3 bg-gray-50 border-gray-200 border rounded-lg cursor-pointer hover:bg-white hover:shadow-lg hover:shadow-gray-200">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{apolice.segurado.nome}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-700 flex items-center gap-2"><EnvelopeIcon className='w-4 h-4 text-slate-600'/><span>{apolice.segurado.email}</span></p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <p className="text-sm font-semibold leading-6 text-gray-900">Nº {apolice.numero}</p>
        <p className="mt-1 text-xs leading-5 text-red-700">Prêmio R$ {Number(apolice.valor_premio).toFixed(2)}</p>
      </div>
    </li>
  )
}