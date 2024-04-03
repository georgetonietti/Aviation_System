import { z } from "zod"

// Função para validar dados usando Zod
export default function validarComZod<T extends object>(schema: z.Schema<T>) {
    // Retorna um decorador de classe
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            // Sobrescreve o construtor original
            constructor(...args: any[]) {
                try {
                    // Chama o construtor original com os dados validados pelo schema Zod
                    super(schema.parse(args[0]));
                } catch (error) {
                    // Trata erros de validação Zod
                    if (error instanceof z.ZodError) {
                        console.error("------------------------ ERRO ------------------------ \n");
                        console.error("Dados inválidos: \n");
                        // Mapeia os erros e os imprime no console
                        error.errors.map(e => console.error({ [String(e.path)]: e.message }));
                        console.error("\n------------------------------------------------------ \n");
                        // Lança uma exceção indicando que os valores precisam ser corrigidos
                        throw new Error("\nCorrija os valores para prosseguir \n");
                    } else {
                        // Se ocorrer um erro que não seja de validação Zod, lança o erro original
                        throw error;
                    }
                }
            };
        };
    };
}
