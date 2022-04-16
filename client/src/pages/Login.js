import { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import login from '../utils/authUtil';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url('/auth.jpg') center no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: #353d3b;
  color: white;
  text-align: center;
  ${mobile({
    width: '80%',
  })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  flex: 1;
  width: 50%;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`;
const Button = styled.button`
  width: 30%;
  padding: ${(props) => props.top}px 20px;
  border: none;
  color: white;
  background-color: #2f6b70;
  cursor: pointer;
  margin: 10px 0;
`;
const Link = styled.a`
  margin: 5px 0;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

function Login() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Title>Welcome Back</Title>
        <Form>
          <Input
            name="email"
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            placeholder="Email"
          />
          <Input
            name="password"
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            placeholder="Password"
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              login(dispatch, formData, 'login');
            }}
            top={user.loading ? '7' : '15'}
            disabled={user.loading ? true : false}
          >
            {user.loading ? <CircularProgress sx={{ color: 'red' }} size={30} /> : 'LOG IN'}
          </Button>
          <Link>FORGOT PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login;
