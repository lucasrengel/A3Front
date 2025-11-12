import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// Componentes temporários para fazer o roteamento funcionar
const Home = () => <h2>Dashboard</h2>;
const Categorias = () => <h2>Categorias</h2>;
const Produtos = () => <h2>Produtos</h2>;
const Movimentacoes = () => <h2>Movimentações</h2>;
const Relatorios = () => <h2>Relatórios</h2>;

function App() {
  return (
    <Router>
      <div>
        <nav>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Dashboard
          </NavLink>
          <NavLink to="/categorias" className={({ isActive }) => isActive ? 'active' : ''}>
            Categorias
          </NavLink>
          <NavLink to="/produtos" className={({ isActive }) => isActive ? 'active' : ''}>
            Produtos
          </NavLink>
          <NavLink to="/movimentacoes" className={({ isActive }) => isActive ? 'active' : ''}>
            Movimentações
          </NavLink>
          <NavLink to="/relatorios" className={({ isActive }) => isActive ? 'active' : ''}>
            Relatórios
          </NavLink>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/movimentacoes" element={<Movimentacoes />} />
            <Route path="/relatorios" element={<Relatorios />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
