// feature 1
import React from 'react';
import DressList from './components/DressList';
import DressContextPovider from '../src/contexts/DressContext';
import Filter from './components/Filter';
import Cart from './components/Cart';

const App: React.FC = () => {
  return (
    <div className="grid-container">
      <header>
        <a href="/">Syl Shopping Cart</a>
      </header>
      <DressContextPovider>
      <main>
        <div className="content">
          <div className="main">
              <Filter />
              <DressList />
          </div>

          <div className="sidebar">
            <Cart />
          </div>
        </div>
      </main>
      </DressContextPovider>
      <footer>
        All right is reserved
      </footer>
    </div>
  );
}

export default App;
