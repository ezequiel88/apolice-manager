"use client";

import { Apolice } from "@/types/Apolice";
import ApoliceForm from "@/components/apolice/ApoliceForm";
import Header from "@/components/ui/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApoliceService } from "@/services/apoliceService";

export default function ApoliceDetail({ params }: { params: { id: string } }) {
    const [data, setData] = useState<Apolice | undefined>(undefined);
    const router = useRouter();
    const apoliceService = new ApoliceService()

    useEffect(() => {
        if (params.id) {
            getData();
        } else {
            router.replace("/");
        }
    }, [params.id]);

    const getData = async () => {
        try {
            const data = await apoliceService.readApolice({ id: params.id });
            if (data) {
                setData(data);
            } else {
                router.replace("/");
            }
        } catch (error) {
            toast.error('Erro ao localizar Apólice');
            router.replace("/");
        }
    };


    return (

        data ?
            <>
                <Header title={`Apólice Nº ${data.numero}`} />
                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <ApoliceForm apolice={data} />
                </main>
            </>
            :
            <Header title={`Localizando Apólice ...`} />

    );
}
