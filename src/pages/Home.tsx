import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategorias, getProdutos, getMovimentacoes } from '../services/api';
import type { Produto } from '../types';

export default function Home() {
  const [stats, setStats] = useState({
    categorias: 0,
    produtos: 0,
    movimentacoes: 0,
    valorEstoque: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [categorias, produtos, movimentacoes] = await Promise.all([
        getCategorias(),
        getProdutos(),
        getMovimentacoes()
      ]);
      
      const valorEstoque = produtos.reduce(
        (acc: number, p: Produto) => acc + (p.precoUnitario * p.quantidadeEstoque), 
        0
      );

      setStats({
        categorias: categorias.length,
        produtos: produtos.length,
        movimentacoes: movimentacoes.length,
        valorEstoque
      });
    } catch (err) {
      setError('Erro ao carregar estatísticas. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Carregando...</div>;

  if (error) {
    return (
      <div>
        <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
        <button onClick={loadStats}>Tentar Novamente</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', margin: '0 0 10px 0' }}>{stats.categorias}</h3>
          <p style={{ margin: 0, color: '#666' }}>Categorias</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', margin: '0 0 10px 0' }}>{stats.produtos}</h3>
          <p style={{ margin: 0, color: '#666' }}>Produtos</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', margin: '0 0 10px 0' }}>{stats.movimentacoes}</h3>
          <p style={{ margin: 0, color: '#666' }}>Movimentações</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center', background: '#f0f9ff', borderColor: '#bae6fd' }}>
          <h3 style={{ fontSize: '2rem', margin: '0 0 10px 0', color: '#0284c7' }}>
            R$ {stats.valorEstoque.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
          <p style={{ margin: 0, color: '#0284c7' }}>Valor Total em Estoque</p>
        </div>
      </div>

      <div>
        <h2>🚀 Acesso Rápido</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <Link to="/categorias" style={{ textDecoration: 'none', color: 'inherit', padding: '20px', border: '1px solid #eee', borderRadius: '8px', display: 'block', transition: 'transform 0.2s' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🏷️</div>
            <h3 style={{ margin: '0 0 10px 0' }}>Categorias</h3>
            <p style={{ margin: 0, color: '#666' }}>Gerencie as categorias de produtos do seu estoque</p>
          </Link>
          <Link to="/produtos" style={{ textDecoration: 'none', color: 'inherit', padding: '20px', border: '1px solid #eee', borderRadius: '8px', display: 'block', transition: 'transform 0.2s' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📦</div>
            <h3 style={{ margin: '0 0 10px 0' }}>Produtos</h3>
            <p style={{ margin: 0, color: '#666' }}>Cadastre e controle todos os produtos disponíveis</p>
          </Link>
          <Link to="/movimentacoes" style={{ textDecoration: 'none', color: 'inherit', padding: '20px', border: '1px solid #eee', borderRadius: '8px', display: 'block', transition: 'transform 0.2s' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔄</div>
            <h3 style={{ margin: '0 0 10px 0' }}>Movimentações</h3>
            <p style={{ margin: 0, color: '#666' }}>Registre entradas e saídas do estoque</p>
          </Link>
          <Link to="/relatorios" style={{ textDecoration: 'none', color: 'inherit', padding: '20px', border: '1px solid #eee', borderRadius: '8px', display: 'block', transition: 'transform 0.2s' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📈</div>
            <h3 style={{ margin: '0 0 10px 0' }}>Relatórios</h3>
            <p style={{ margin: 0, color: '#666' }}>Visualize balanços e estatísticas detalhadas</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
