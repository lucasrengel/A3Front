export interface Categoria {
  id?: number;
  nome: string;
  tamanho: string;
  embalagem: string;
}

export interface Produto {
  id?: number;
  nome: string;
  precoUnitario: number;
  unidade: string;
  quantidadeEstoque: number;
  quantidadeMinima: number;
  quantidadeMaxima: number;
  categoriaId: number;
}
