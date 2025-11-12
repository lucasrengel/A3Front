import axios from 'axios';
import type { 
  Categoria, 
  Produto, 
  Movimentacao, 
  RelatorioListaPreco, 
  RelatorioBalanco, 
  RelatorioAbaixoMinimo,
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

export const getCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get<Categoria[]>('/categorias');
  return response.data;
};

export const getCategoria = async (id: number): Promise<Categoria> => {
  const response = await api.get<Categoria>(`/categorias/${id}`);
  return response.data;
};

export const addCategoria = async (categoria: Categoria): Promise<ApiResponse<Categoria>> => {
  const response = await api.post<ApiResponse<Categoria>>('/categorias', categoria);
  return response.data;
};

export const updateCategoria = async (id: number, categoria: Categoria): Promise<ApiResponse<Categoria>> => {
  const response = await api.put<ApiResponse<Categoria>>(`/categorias/${id}`, categoria);
  return response.data;
};

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

export const addProduto = async (produto: Produto): Promise<ApiResponse<Produto>> => {
  const response = await api.post<ApiResponse<Produto>>('/produtos', produto);
  return response.data;
};

export const updateProduto = async (id: number, produto: Produto): Promise<ApiResponse<Produto>> => {
  const response = await api.put<ApiResponse<Produto>>(`/produtos/${id}`, produto);
  return response.data;
};

export const deleteProduto = async (id: number): Promise<ApiResponse> => {
  const response = await api.delete<ApiResponse>(`/produtos/${id}`);
  return response.data;
};

export const ajustarPrecos = async (percentual: number): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>('/produtos/ajustar-precos', { percentual });
  return response.data;
};

export const getMovimentacoes = async (): Promise<Movimentacao[]> => {
  const response = await api.get<Movimentacao[]>('/movimentacoes');
  return response.data;
};

export const getMovimentacao = async (id: number): Promise<Movimentacao> => {
  const response = await api.get<Movimentacao>(`/movimentacoes/${id}`);
  return response.data;
};

export const addMovimentacao = async (movimentacao: Movimentacao): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>('/movimentacoes', movimentacao);
  return response.data;
};

export const updateMovimentacao = async (id: number, movimentacao: Movimentacao): Promise<ApiResponse> => {
  const response = await api.put<ApiResponse>(`/movimentacoes/${id}`, movimentacao);
  return response.data;
};

export const deleteMovimentacao = async (id: number): Promise<ApiResponse> => {
  const response = await api.delete<ApiResponse>(`/movimentacoes/${id}`);
  return response.data;
};

export const getRelatorioListaPrecos = async (): Promise<RelatorioListaPreco> => {
  const response = await api.get<RelatorioListaPreco>('/relatorios/lista-precos');
  return response.data;
};

export const getRelatorioBalanco = async (): Promise<RelatorioBalanco> => {
  const response = await api.get<RelatorioBalanco>('/relatorios/balanco');
  return response.data;
};

export const getRelatorioAbaixoMinimo = async (): Promise<RelatorioAbaixoMinimo> => {
  const response = await api.get<RelatorioAbaixoMinimo>('/relatorios/abaixo-minimo');
  return response.data;
};
