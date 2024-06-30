import { ApoliceService } from '@/services/apoliceService';
import { Apolice } from '@/types/Apolice';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);
const apoliceService = new ApoliceService(axios);

const mockApolice: Apolice = {
    "id": "1a2b",
    "numero": "1001",
    "valor_premio": 50000,
    "segurado": {
        "nome": "João Silva",
        "email": "joao.silva@example.com",
        "cpf_cnpj": "12345678901"
    },
    "coberturas": [
        {
            "nome": "Incêndio",
            "valor": 20000
        },
        {
            "nome": "Roubo",
            "valor": 30000
        }
    ]
};

describe('Apolice Service', () => {
    afterEach(() => {
        mock.reset();
    });

    it('createApolice deve criar uma nova apólice', async () => {
        mock.onGet(`/apolices?segurado.cpf_cnpj=${mockApolice.segurado.cpf_cnpj}`).reply(200, []);
        mock.onPost('/apolices').reply(200);

        const response = await apoliceService.createApolice({ apolice: mockApolice });
        expect(response).toEqual({
            error: false,
            message: "Apólice inserida com sucesso"
        });
    });

    it('createApolice deve retornar erro ao tentar criar uma nova apólice existente', async () => {
        mock.onGet(`/apolices?segurado.cpf_cnpj=${mockApolice.segurado.cpf_cnpj}`).reply(200, [mockApolice]);
        mock.onPost('/apolices').reply(200);

        const response = await apoliceService.createApolice({ apolice: mockApolice });
        expect(response).toEqual({
            error: true,
            message: "Já existe uma apólice para o CPF/CNPJ informado"
        });
    });

    it('createApolice deve retornar erro ao falhar na criação da apólice', async () => {
        mock.onGet(`/apolices?segurado.cpf_cnpj=${mockApolice.segurado.cpf_cnpj}`).reply(200, []);
        mock.onPost('/apolices').reply(500);

        await expect(apoliceService.createApolice({ apolice: mockApolice }))
            .rejects
            .toThrow('Request failed with status code 500');
    });

    it('readApolice deve ler uma apólice existente', async () => {
        const responseData = { ...mockApolice };
        mock.onGet(`/apolices/${mockApolice.id}`).reply(200, responseData);

        const fetchedApolice = await apoliceService.readApolice({ id: mockApolice.id });
        expect(fetchedApolice).toEqual(responseData);
    });

    it('readApolice deve retornar erro ao tentar ler uma apólice inexistente', async () => {
        mock.onGet('/apolices/1234').reply(404, { message: 'Apólice não encontrada' });

        await expect(apoliceService.readApolice({ id: '1234' }))
            .rejects
            .toThrow('Request failed with status code 404');
    });

    it('readApolices deve retornar uma lista de apólices paginadas', async () => {
        const responseData = [mockApolice];
        const page = 1;
        const per_page = 10;
        mock.onGet(`/apolices?_page=${page}&_per_page=${per_page}`).reply(200, responseData);

        const fetchedApolices = await apoliceService.readApolices({ page, per_page });
        expect(fetchedApolices).toEqual(responseData);
    });

    it('readApolices deve retornar erro ao tentar obter a lista de apólices', async () => {
        const page = 1;
        const per_page = 10;
        mock.onGet(`/apolices?_page=${page}&_per_page=${per_page}`).reply(500);

        await expect(apoliceService.readApolices({ page, per_page }))
            .rejects
            .toThrow('Request failed with status code 500');
    });

    it('updateApolice deve atualizar uma apólice existente', async () => {
        mock.onGet(`/apolices?segurado.cpf_cnpj=${mockApolice.segurado.cpf_cnpj}`).reply(200, [mockApolice]);
        mock.onPatch(`/apolices/${mockApolice.id}`).reply(200);

        const response = await apoliceService.updateApolice({ apolice: mockApolice });
        expect(response).toEqual({
            error: false,
            message: "Apólice atualizada com sucesso"
        });
    });

    it('updateApolice deve retornar erro ao tentar atualizar uma apólice inexistente', async () => {
        mock.onGet(`/apolices?segurado.cpf_cnpj=${mockApolice.segurado.cpf_cnpj}`).reply(200, []);
        mock.onPatch(`/apolices/${mockApolice.id}`).reply(404);

        await expect(apoliceService.updateApolice({ apolice: mockApolice }))
            .rejects
            .toThrow('Request failed with status code 404');
    });

    it('deleteApolice deve deletar uma apólice existente', async () => {
        const responseData = { message: 'Apólice deletada com sucesso' };
        mock.onDelete(`/apolices/${mockApolice.id}`).reply(200, responseData);

        const deleteResult = await apoliceService.deleteApolice({ id: mockApolice.id });
        expect(deleteResult).toEqual(responseData);
    });

    it('deleteApolice deve retornar erro ao tentar deletar uma apólice inexistente', async () => {
        mock.onDelete('/apolices/1234').reply(404, { message: 'Apólice não encontrada' });

        await expect(apoliceService.deleteApolice({ id: '1234' }))
            .rejects
            .toThrow('Request failed with status code 404');
    });
});
