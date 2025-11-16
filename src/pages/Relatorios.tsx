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

  useEffect(() => {
    loadRelatorio(activeTab);
  }, [activeTab]);

  const loadRelatorio = async (tipo: string) => {
    setLoading(true);
    setError('');
    
    try {
      switch (tipo) {
        case 'lista-precos':
          setListaPrecos(await getRelatorioListaPrecos());
          break;
        case 'balanco':
          setBalanco(await getRelatorioBalanco());
          break;
        case 'abaixo-minimo':
          setAbaixoMinimo(await getRelatorioAbaixoMinimo());
          break;
        case 'por-categoria':
          setPorCategoria(await getRelatorioPorCategoria());
          break;
        case 'maiores-movimentacoes':
          const [movs, prods] = await Promise.all([
            getRelatorioMaioresMovimentacoes(),
            getProdutos()
          ]);
          setMaioresMovimentacoes(movs);
          setProdutos(prods);
          break;
      }
    } catch (err) {
      setError('Erro ao carregar relatório');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Relatórios</h2>
      <p>Carregando estrutura...</p>
    </div>
  );
}
