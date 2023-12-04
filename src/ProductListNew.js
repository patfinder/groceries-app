import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, InputGroup, FormControl, Pagination } from 'react-bootstrap';

function capitalize(str) {
  return (str || ' ').charAt(0).toUpperCase() + str.slice(1);
}

function unit_name(unit) {
  let units_map = {
    'ea': 'each'
  }

  return unit in units_map ? units_map[unit] : unit;
}

const ProductListNew = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Load product from server
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
      products =  products.toSorted((a, b) => a.name > b.name)
      
      products.forEach(p => {
        p.retailer = capitalize(p.retailer);
        p.created_time = p.created_time.slice(0, 10);
      });

      setAllProducts(products);
  }

    // call the function
    fetchData().catch(console.error);
  }, []);

  // Sort products based on the selected column
  const sortProducts = (columnName) => setSortBy(columnName);

  // Filter products based on input text
  const filterProducts = (filterText) => setFilterText(filterText);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // ===============================
  // Process products to show

  var currentProducts = filterText ? allProducts.filter((product) => product.name.toLowerCase().includes(filterText)) 
  : allProducts;

  const sortedProducts = currentProducts.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1);

  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text id="filter">Filter by Name</InputGroup.Text>
            <FormControl
              placeholder="Type to filter"
              aria-label="Filter"
              aria-describedby="filter"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value.toLowerCase())}
              // onBlur={filterProducts}
            />
          </InputGroup>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => sortProducts('retailer')}>Retailer</th>
            <th onClick={() => sortProducts('name')}>Name</th>
            <th onClick={() => sortProducts('category')}>Category</th>
            <th onClick={() => sortProducts('price')}>Price</th>
            <th onClick={() => sortProducts('unit')}>Unit</th>
            <th onClick={() => sortProducts('image')}>Image</th>
            <th onClick={() => sortProducts('created_time')}>Last update</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(p => (
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

      <Pagination>
        {/* length: Math.ceil(allProducts.length / productsPerPage) */}
        {Array.from({ length: 7 }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default ProductListNew;
