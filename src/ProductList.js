import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const response = await fetch(
        'http://127.0.0.1:8000/products/?format=json&page_size=1000',
      );
      let json_res = await response.json()
      setProducts(json_res.results);
    }

    // call the function
    fetchData().catch(console.error);
  }, [])

  return (
    <Container fluid>
      {
        (products.length && (
          <table class="table">
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
            {products.map(p => (
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
        </table>
        ))
          || 'Data is loading'}
    </Container>
  );
}

export default ProductList;
