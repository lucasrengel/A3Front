import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Categorias from './pages/Categorias';
import Produtos from './pages/Produtos';
import Movimentacoes from './pages/Movimentacoes';
import Relatorios from './pages/Relatorios';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="navbar">
          <h1>
            <span className="logo-icon">📦</span>
            Estoque
          </h1>
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
        </header>

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
