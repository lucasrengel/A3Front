import axios from 'axios';
import type { 
  Categoria, 
  Produto, 
  Movimentacao, 
  RelatorioListaPreco, 
  RelatorioBalanco, 
  RelatorioProdutosPorCategoria,
  RelatorioMaioresMovimentacoes,
  ApiResponse
} from '../types';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const deleteCategoria = async (id: number): Promise<ApiResponse> => {
  const response = await api.delete<ApiResponse>(`/categorias/${id}`);
  return response.data;
};

export const getProdutos = async (): Promise<Produto[]> => {
  const response = await api.get<Produto[]>('/produtos');
  return response.data;
};

export const getProduto = async (id: number): Promise<Produto> => {
  const response = await api.get<Produto>(`/produtos/${id}`);
  return response.data;
};
