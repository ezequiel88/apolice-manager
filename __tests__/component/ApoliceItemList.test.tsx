import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { Apolice } from '@/types/Apolice';
import ApoliceItemList from '../../src/components/apolice/ApoliceItemList';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

const mockApolice: Apolice = {
    id: '1a2b',
    numero: '1001',
    valor_premio: 50000,
    segurado: {
        nome: 'João Silva',
        email: 'joao.silva@example.com',
        cpf_cnpj: '12345678901',
    },
    coberturas: [
        {
            nome: 'Incêndio',
            valor: 20000,
        },
        {
            nome: 'Roubo',
            valor: 30000,
        },
    ],
};

describe('ApoliceItemList Component', () => {
    const push = jest.fn();
    const useRouterMock = useRouter as jest.Mock;

    beforeEach(() => {
        useRouterMock.mockReturnValue({
            push,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve renderizar corretamente as informações da apólice', () => {
        render(<ApoliceItemList apolice={mockApolice} />);

        expect(screen.getByText(mockApolice.segurado.nome)).toBeInTheDocument();
        expect(screen.getByText(mockApolice.segurado.email)).toBeInTheDocument();
        expect(screen.getByText(`Nº ${mockApolice.numero}`)).toBeInTheDocument();
        expect(screen.getByText(`Prêmio R$ ${Number(mockApolice.valor_premio).toFixed(2)}`)).toBeInTheDocument();
    });

    it('deve navegar para a página da apólice ao clicar no item da lista', () => {
        render(<ApoliceItemList apolice={mockApolice} />);

        const listItem = screen.getByRole('listitem');
        fireEvent.click(listItem);

        expect(push).toHaveBeenCalledWith(`/apolice/${mockApolice.id}`);
    });
});
