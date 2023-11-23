import logo from './banner.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  ProductList from './ProductList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" width="2000px" height="400px" />
        <h1 style={{fontSize: 100}}>
          Select products to buy
        </h1>
        <ProductList />
      </header>
    </div>
  );
}

export default App;
