import logo from './logo.svg';
import './App.css';
import Table from './components/Table.js'

import products from './data/products.json'
import categories from './data/categories.json'

for (const category of categories) {
  let numProducts = 0;
  products.forEach((product) => {
    if (product.categoryId === category.id) numProducts++;
  })
  category.numProducts = numProducts;
}

const headerStyles = { fontSize: "25px" };

function App() {
  return (
    <div className="App">
      <h style={headerStyles}>Categories:</h>
      <Table data={categories} />
      <h style={headerStyles}>Products:</h>
      <Table data={products} hasFilter hasPagination/>
    </div>
  );
}

export default App;
