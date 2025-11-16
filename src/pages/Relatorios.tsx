import { useState, useEffect } from 'react';
import { 
  getRelatorioListaPrecos, 
  getRelatorioBalanco, 
  getRelatorioAbaixoMinimo,
  getRelatorioPorCategoria,
  getRelatorioMaioresMovimentacoes,
  getProdutos
} from '../services/api';
import type { 
  RelatorioListaPreco, 
  RelatorioBalanco, 
  Produto,
  RelatorioProdutosPorCategoria,
  RelatorioMaioresMovimentacoes
} from '../types';

export default function Relatorios() {
  const [activeTab, setActiveTab] = useState('lista-precos');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Estados dos relatórios
  const [listaPrecos, setListaPrecos] = useState<RelatorioListaPreco | null>(null);
  const [balanco, setBalanco] = useState<RelatorioBalanco | null>(null);
  const [abaixoMinimo, setAbaixoMinimo] = useState<Produto[]>([]);
  const [porCategoria, setPorCategoria] = useState<RelatorioProdutosPorCategoria | null>(null);
  const [maioresMovimentacoes, setMaioresMovimentacoes] = useState<RelatorioMaioresMovimentacoes | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  return (
    <div>
      <h2>Relatórios</h2>
      <p>Carregando estrutura...</p>
    </div>
  );
}
