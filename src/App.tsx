// feature 1
import React from 'react';
import DressList from './components/DressList';
import DressContextPovider from '../src/contexts/DressContext';

const App: React.FC = () => {
  return (
    <div className="grid-container">
      <header>
        <a href="/">Syl Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
          <DressContextPovider>
          <DressList />
          </DressContextPovider>
          </div>

          <div className="sidebar">
            Cart Items
          </div>
        </div>
      </main>
      <footer>
        All right is reserved
      </footer>
    </div>
  );
}

export default App;
