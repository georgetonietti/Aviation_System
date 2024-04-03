import { z } from "zod";
import {
    aeronaveCargaSchema,
    aeronaveComercialSchema,
    aeronaveParticularSchema,
    aeronavePassageirosSchema,
    aeronaveSchema,
    aeroviaOcupadaSchema,
    aeroviaSchema,
    arquivoSchema,
    pilotoSchema,
    planoDeVooSchema
} from "./schemas.js";

// Definição dos tipos inferidos dos esquemas de validação
type typePiloto = z.infer<typeof pilotoSchema>; // Tipo de dados para piloto
type typeAeronave = z.infer<typeof aeronaveSchema>; // Tipo de dados para aeronave
type typeAeronaveParticular = z.infer<typeof aeronaveParticularSchema>; // Tipo de dados para aeronave particular
type typeAeronaveComercial = z.infer<typeof aeronaveComercialSchema>; // Tipo de dados para aeronave comercial
type typeAeronavePassageiros = z.infer<typeof aeronavePassageirosSchema>; // Tipo de dados para aeronave de passageiros
type typeAeronaveCarga = z.infer<typeof aeronaveCargaSchema>; // Tipo de dados para aeronave de carga
type typeAerovia = z.infer<typeof aeroviaSchema>; // Tipo de dados para aerovia
type typePlanoDeVoo = z.infer<typeof planoDeVooSchema>; // Tipo de dados para plano de voo
type typeAeroviaOcupada = z.infer<typeof aeroviaOcupadaSchema>; // Tipo de dados para aerovia ocupada
type arquivo = z.infer<typeof arquivoSchema>; // Tipo de dados para arquivo
