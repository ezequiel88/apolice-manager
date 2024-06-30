"use client"

import React from 'react';

type HeaderProps = {
    title: string,
    buttonText?: string,
    onActionClick?: () => void
}

export default function Header({ title, buttonText, onActionClick }: HeaderProps) {

    return (
        <header className="bg-[#1E743F] shadow-md shadow-slate-400 pt-20">
            <div className="mx-auto flex h-20 max-w-7xl px-4 items-center sm:px-6 lg:px-8">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-100">{title}</h3>
                </div>
                {
                    (title && onActionClick) &&

                    <button
                        onClick={onActionClick}
                        className="text-gray-100 bg-[#64C832] hover:bg-[#5bb32f] rounded-md m-0 px-4 py-2 text-sm font-medium"
                    >
                        {buttonText}
                    </button>
                }
            </div>
        </header>
    );
}