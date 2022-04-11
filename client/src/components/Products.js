import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import { publicRequest } from '../requestMethods';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: center;
`;

function Products({ cat, filters, sorts }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = cat ? `/product/all?cat=${cat}` : `/product/all`;
        const resp = await publicRequest.get(url);
        setProducts(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, val]) => (val ? item[key].includes(val) : true))
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sorts === 'newest') {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt));
    } else if (sorts === 'asc') {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    }
    if (sorts === 'desc') {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sorts]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products.slice(0, 8).map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
}

export default Products;
