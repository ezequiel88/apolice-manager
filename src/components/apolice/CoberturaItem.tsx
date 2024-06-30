"use client"

import { Cobertura } from '@/types/Cobertura'
import { TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'

type CoberturaItemProps = {
    cobertura: Cobertura
    index: number
    removeCobertura: (index: number) => void
}

export default function CoberturaItem({ cobertura, index, removeCobertura }: CoberturaItemProps) {
    return (
        <div className='flex border-l-[6px] border-l-slate-300 rounded py-3 px-3 bg-slate-100 border border-slate-200'>
            <div className="flex flex-col space-y-1 flex-1">
                <p className='text-xs text-slate-800 font-bold'>Nome:</p>
                <p className='text-xs text-slate-800'>{cobertura.nome}</p>
            </div>
            <div className="flex flex-col space-y-1 w-24">
                <p className='text-xs text-slate-800 font-bold'>Valor:</p>
                <p className='text-xs text-slate-800'>R$ {parseFloat(String(cobertura.valor)).toFixed(2)}</p>
            </div>

            <TrashIcon onClick={() => removeCobertura(index)} className="block h-6 w-6 cursor-pointer bg-red-500 text-white p-1 rounded hover:bg-red-800" />

        </div>
    )
}