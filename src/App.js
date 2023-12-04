import logo from './banner.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  ProductList from './ProductList';
import ProductListNew from './ProductListNew';

function App() {
  return (
    <div className="App">
      {/* className="App-header" */}
      <div>
        <img src={logo} alt="logo" width={'100%'}/>
        <h1 style={{fontSize: 30}}>
          Select products to buy
        </h1>
      </div>
      {/* <ProductList /> */}
      <ProductListNew />
    </div>
  );
}

export default App;
