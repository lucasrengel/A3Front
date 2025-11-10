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
