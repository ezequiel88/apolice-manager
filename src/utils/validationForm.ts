import { z } from "zod";

const validateCoberturas = z.array(
    z.object({
        nome: z.string().min(2, { message: 'A descrição da cobertura deve ter pelo menos 2 caracteres.' }),
        valor: z.string().min(1, { message: 'O valor não pode ser vazio.' }),
    })
);

export const validateApolice = z.object({
    numero: z.string().min(1, { message: 'O número não pode ser vazio.' }),
    valor_premio: z.string().min(1, { message: 'O valor do prêmio não pode ser vazio.' }),
    segurado: z.object({
        nome: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
        email: z.string().email({ message: 'O e-mail deve ser válido.' }),
        cpf_cnpj: z.string().min(11, { message: 'O CPF ou CNPJ deve ter pelo menos 11 caracteres.' }),
    }),
    coberturas: validateCoberturas.refine((coberturas) => coberturas.length > 0, {
        message: 'Deve haver pelo menos uma cobertura na apólice.',
        path: ['coberturas'],
    }),
});