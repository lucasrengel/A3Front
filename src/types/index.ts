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

export interface Movimentacao {
  id?: number;
  produtoId: number;
  data?: string;
  quantidade: number;
  tipo: 'ENTRADA' | 'SAIDA';
}

export interface RelatorioListaPreco {
  itens: ItemListaPreco[];
}

export interface ItemListaPreco {
  nome: string;
  preco: number;
  unidade: string;
  nomeCategoria: string;
}
