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

export interface RelatorioBalanco {
  itens: ItemBalanco[];
  valorTotalEstoque: number;
}

export interface ItemBalanco {
  nome: string;
  quantidade: number;
  valorTotal: number;
}

export interface RelatorioProdutosPorCategoria {
  itens: ItemCategoria[];
}

export interface ItemCategoria {
  nomeCategoria: string;
  quantidade: number;
}

export interface RelatorioMaioresMovimentacoes {
  maiorEntrada: Movimentacao | null;
  maiorSaida: Movimentacao | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}
