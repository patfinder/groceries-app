import logo from './banner.jpg';
import './App.css';
import  ProductList from './ProductList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" width="2000px" height="400px" />
        <p>
          Select product to buy
        </p>
        <ProductList />
      </header>
    </div>
  );
}

export default App;
