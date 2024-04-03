// Função para converter os dados
export default function convert(dados: any[]) {
    // Mapeia cada item dos dados
    return dados.map(item => (
        // Se o item pode ser convertido para um número, converte para número
        Number(item)
        ? Number(item)
        // Se o item for a string 'true', converte para true
        : item === 'true'
        ? true
        // Se o item for a string 'false', converte para false
        : item === 'false'
        ? false 
        // Se a string não puder ser convertida para uma data, retorna a string original
        : !Number.isNaN(Date.parse(item))
        ? new Date(item)
        // Se a string puder ser convertida para uma data, converte para data
        : item[0] === "["
        ? JSON.parse(item)
        : item
    ));
}
