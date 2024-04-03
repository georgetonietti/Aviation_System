import { z } from "zod";

// Esquema para validação de dados de piloto
export const pilotoSchema = z.object({
    matricula: z.string().min(5).max(10),
    nome: z.string().min(3).max(50),
    habilitacaoAtiva: z.boolean()
});

// Esquema para validação de dados de aeronave
export const aeronaveSchema = z.object({
    prefixo: z.string().min(1),
    velocidadeCruzeiro: z.number().min(800),
    autonomia: z.number().min(1600)
});

// Esquema para validação de dados de aeronave particular
export const aeronaveParticularSchema = aeronaveSchema.extend({
    respManutencao: z.string().min(3)
});

// Esquema para validação de dados de aeronave comercial
export const aeronaveComercialSchema = aeronaveSchema.extend({
    nomeCia: z.string().min(3)
});

// Esquema para validação de dados de aeronave de passageiros
export const aeronavePassageirosSchema = aeronaveComercialSchema.extend({
    maxPassageiros: z.number().min(20)
});

// Esquema para validação de dados de aeronave de carga
export const aeronaveCargaSchema = aeronaveComercialSchema.extend({
    pesoMax: z.number().min(20)
});

// Esquema para validação de dados de aerovia
export const aeroviaSchema = z.object({
    id: z.string().min(2),
    origem: z.string().min(3),
    destino: z.string().min(3),
    tamanho: z.number().min(200)
});

// Esquema para validação de dados de plano de voo
export const planoDeVooSchema = z.object({
    id: z.string().min(4),
    matricPiloto: z.string().min(5).max(10),
    idAerovia: z.string().min(2),
    data: z.date(),
    horario: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    altitude: z.number().min(25000).max(35000),
    slots: z.array(z.number()).max(24),
    cancelado: z.optional(z.boolean())
});

// Esquema para validação de dados de aerovia ocupada
export const aeroviaOcupadaSchema = z.object({
    idAerovia: z.string().min(2),
    data: z.date(),
    altitude: z.number().min(25000).max(35000),
    slot: z.number().or(z.array(z.number()))
});

// Esquema para validação de dados de arquivo
export const arquivoSchema = z.string().min(5); // Nome do arquivo (mínimo de 5 caracteres)
