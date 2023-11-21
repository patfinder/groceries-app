import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from 'react';

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
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
                <tr key={p.id}>
                <th scope="row"><a href={p.url}>{p.name}</a></th>
                <td>{p.price}</td>
                <td><img src={p.image} width="100" height="100" /></td>
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
