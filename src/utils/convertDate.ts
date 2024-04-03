import { parse } from "date-fns";

// Função para fazer o parse de uma data no formato string para um objeto Date
export default function parseDate(date: string) {
    return parse(date, "dd/MM/yyyy", new Date())
}