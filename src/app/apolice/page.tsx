import React from 'react';
import ApoliceForm from "@/components/apolice/ApoliceForm";
import Header from "@/components/ui/Header";

export default function ApoliceCreate() {

    return (
        <>
            <Header title={"Criar Apólice"} />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <ApoliceForm />
            </main>
        </>
    )
}