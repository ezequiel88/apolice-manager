import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Apolice } from '@/types/Apolice';
import { api } from '@/config/api';

interface ApoliceProps {
    apolice: Apolice;
}

interface ReadApoliceProps {
    id: string;
}

interface ReadApolicesProps {
    page: number;
    per_page?: number;
}

interface DeleteApoliceProps {
    id: string;
}

export class ApoliceService {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance = api) {
        this.axiosInstance = axiosInstance;
    }

    async createApolice({ apolice }: ApoliceProps) {
        try {
            const checkExists = await this.axiosInstance.get(`/apolices?segurado.cpf_cnpj=${apolice.segurado.cpf_cnpj}`);

            // Exemplo de validação (verificar regra de negócio)
            // Comentar o if abaixo para permitir mais de 1 Apólice para o mesmo CPF/CNPJ
            if (checkExists.data && checkExists.data.length > 0) {
                return {
                    error: true,
                    message: "Já existe uma apólice para o CPF/CNPJ informado"
                }
            }

            await this.axiosInstance.post('/apolices', apolice);
            return {
                error: false,
                message: "Apólice inserida com sucesso"
            }
        } catch (error) {
            throw error;
        }
    }

    async readApolice({ id }: ReadApoliceProps) {
        try {
            const { data } = await this.axiosInstance.get(`/apolices/${id}`);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async readApolices({ page, per_page }: ReadApolicesProps) {
        try {
            const { data } = await this.axiosInstance.get(`/apolices?_page=${page}&_per_page=${per_page}`);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async updateApolice({ apolice }: ApoliceProps) {
        try {
            const checkExists = await this.axiosInstance.get(`/apolices?segurado.cpf_cnpj=${apolice.segurado.cpf_cnpj}`);

            // Exemplo de validação (verificar regra de negócio)
            // Verifica se existe alguma apólice com o mesmo CPF/CNPJ que não seja a atual
            if (checkExists.data && checkExists.data.length > 0) {
                const existingApolice = checkExists.data.find((existing: Apolice) => existing.id !== apolice.id);
               
                if (existingApolice) {
                    return {
                        error: true,
                        message: "Já existe uma apólice para o CPF/CNPJ informado"
                    }
                }
            }
    
            await this.axiosInstance.patch(`/apolices/${apolice.id}`, apolice);
            return {
                error: false,
                message: "Apólice atualizada com sucesso"
            }
        } catch (error) {
            throw error;
        }
    }
    

    async deleteApolice({ id }: DeleteApoliceProps) {
        try {
            const { data } = await this.axiosInstance.delete(`/apolices/${id}`);
            return data;
        } catch (error) {
            throw error;
        }
    }
}