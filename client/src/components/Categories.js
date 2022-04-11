import styled from 'styled-components';
import { categories } from '../data';
import CategoryItem from './CategoryItem';
import { mobile } from '../responsive';

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({
    flexDirection: 'column',
    padding: 0,
  })}
`;

function Category() {
  return (
    <Container>
      {categories.map((elm) => (
        <CategoryItem item={elm} key={elm.id} />
      ))}
    </Container>
  );
}

export default Category;
