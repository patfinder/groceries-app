import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';

function capitalize(str) {
  return (str || ' ').charAt(0).toUpperCase() + str.slice(1);
}

function unit_name(unit) {
  let units_map = {
    'ea': 'each'
  }

  return unit in units_map ? units_map[unit] : unit;
}

function ProductList() {

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const response = await fetch(
        'http://127.0.0.1:8000/products/?format=json&page_size=1000',
      );
      let products = (await response.json()).results

      // let al_p = products.filter(a => a.retailer == 'alpremium').slice(0, 10)
      // let no_p = products.filter(a => a.retailer == 'nofrills').slice(0, 10)
      // products =  al_p.concat(no_p).toSorted((a, b) => a.name > b.name)
      
      products.forEach(p => {
        p.created_time = p.created_time.slice(0, 10)
      });
      setProducts(products);
    }

    // call the function
    fetchData().catch(console.error);
  }, [])

  // Handle filter change
  function handleFilter(e) {
    setFilter(e.target.value);
  }

  // Sort and filter products
  let filteredProducts = filter && products.filter(p => p.name.toLowerCase().includes(filter)) || products;

  return (
    <div style={{fontSize: '30px'}}>
      <div style={{textAlign: 'left', padding: 20}}>
        <label htmlFor='filter'>Filter:</label>&nbsp;<input id='filter' onChange={handleFilter} value={filter} type="search" />
      </div>
      <Container fluid>
        {
          (filteredProducts.length && (
            <Table striped bordered hover>
            <thead>
              <tr>
                <th scope="col">Retailer</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Unit</th>
                <th scope="col">Image</th>
                <th scope="col">Last update</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                  <tr key={p.id}>
                    <td scope="row">{capitalize(p.retailer)}</td>
                    <th><a href={p.url}>{p.name}</a></th>
                    <td>{p.categories}</td>
                    <td>${p.price}</td>
                    <td>{unit_name(p.unit)}</td>
                    <td><img src={p.image} width="100" height="100" /></td>
                    <td>{p.created_time}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          ))
            || 'No data'}
      </Container>
    </div>
  );
}

export default ProductList;
