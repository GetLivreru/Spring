import logo from './logo.svg';
import './App.css';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

const App = () => {
  return (
      <div>
        <h1>Product Management</h1>
        <AddProduct />
        <ProductList />
      </div>
  );
};

export default App;
