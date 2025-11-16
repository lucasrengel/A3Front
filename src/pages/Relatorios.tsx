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

  const getNomeProduto = (produtoId: number) => {
    const prod = produtos.find(p => p.id === produtoId);
    return prod?.nome || `Produto #${produtoId}`;
  };

  const tabs = [
    { id: 'lista-precos', label: 'Lista de Preços' },
    { id: 'balanco', label: 'Balanço' },
    { id: 'abaixo-minimo', label: 'Abaixo do Mínimo' },
    { id: 'por-categoria', label: 'Por Categoria' },
    { id: 'maiores-movimentacoes', label: 'Maiores Movimentações' }
  ];

  const renderContent = () => {
    if (loading) return <div>Carregando relatório...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    switch (activeTab) {
      case 'lista-precos':
        return (
          <div>
            <h3>Lista de Preços</h3>
            {listaPrecos?.itens && listaPrecos.itens.length > 0 ? (
              <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Categoria</th>
                    <th>Unidade</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {listaPrecos.itens.map((item, i) => (
                    <tr key={i}>
                      <td>{item.nome}</td>
                      <td>{item.nomeCategoria || 'N/A'}</td>
                      <td>{item.unidade}</td>
                      <td>R$ {item.preco.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>Nenhum produto cadastrado</div>
            )}
          </div>
        );

      case 'balanco':
        return (
          <div>
            <h3>Balanço de Estoque</h3>
            {balanco && (
              <>
                <div style={{ marginBottom: '1rem', padding: '10px', border: '1px solid #ccc' }}>
                  <h3>R$ {balanco.valorTotalEstoque.toFixed(2)}</h3>
                  <p>Valor Total do Estoque</p>
                </div>
                {balanco.itens && balanco.itens.length > 0 ? (
                  <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {balanco.itens.map((item, i) => (
                        <tr key={i}>
                          <td>{item.nome}</td>
                          <td>{item.quantidade}</td>
                          <td>R$ {item.valorTotal.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>Nenhum produto em estoque</div>
                )}
              </>
            )}
          </div>
        );

      case 'abaixo-minimo':
        return (
          <div>
            <h3>Produtos Abaixo do Mínimo</h3>
            {abaixoMinimo.length > 0 ? (
              <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Estoque Atual</th>
                    <th>Mínimo</th>
                    <th>Diferença</th>
                  </tr>
                </thead>
                <tbody>
                  {abaixoMinimo.map((prod) => (
                    <tr key={prod.id}>
                      <td>{prod.nome}</td>
                      <td>{prod.quantidadeEstoque}</td>
                      <td>{prod.quantidadeMinima}</td>
                      <td style={{ color: 'red' }}>
                        {prod.quantidadeEstoque - prod.quantidadeMinima}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ color: 'green' }}>
                ✅ Todos os produtos estão acima do estoque mínimo!
              </div>
            )}
          </div>
        );

      case 'por-categoria':
        return (
          <div>
            <h3>Produtos por Categoria</h3>
            {porCategoria?.itens && porCategoria.itens.length > 0 ? (
              <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Categoria</th>
                    <th>Quantidade de Produtos</th>
                  </tr>
                </thead>
                <tbody>
                  {porCategoria.itens.map((item, i) => (
                    <tr key={i}>
                      <td>{item.nomeCategoria}</td>
                      <td>{item.quantidade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>Nenhuma categoria cadastrada</div>
            )}
          </div>
        );

      case 'maiores-movimentacoes':
        return (
          <div>
            <h3>Maiores Movimentações</h3>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1, padding: '15px', border: '1px solid #ccc', background: '#e6fffa' }}>
                <h4>📥 Maior Entrada</h4>
                {maioresMovimentacoes?.maiorEntrada ? (
                  <>
                    <h3>{maioresMovimentacoes.maiorEntrada.quantidade} unidades</h3>
                    <p>{getNomeProduto(maioresMovimentacoes.maiorEntrada.produtoId)}</p>
                    <small>{maioresMovimentacoes.maiorEntrada.data}</small>
                  </>
                ) : (
                  <p>Nenhuma entrada registrada</p>
                )}
              </div>
              <div style={{ flex: 1, padding: '15px', border: '1px solid #ccc', background: '#fff5f5' }}>
                <h4>📤 Maior Saída</h4>
                {maioresMovimentacoes?.maiorSaida ? (
                  <>
                    <h3>{maioresMovimentacoes.maiorSaida.quantidade} unidades</h3>
                    <p>{getNomeProduto(maioresMovimentacoes.maiorSaida.produtoId)}</p>
                    <small>{maioresMovimentacoes.maiorSaida.data}</small>
                  </>
                ) : (
                  <p>Nenhuma saída registrada</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Relatórios</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              backgroundColor: activeTab === tab.id ? '#007bff' : '#f0f0f0',
              color: activeTab === tab.id ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
}
