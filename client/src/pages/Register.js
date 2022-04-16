import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { mobile } from '../responsive';
import register from '../utils/authUtil';

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
const Agreement = styled.span`
  font-size: 12px;
  margin: 10px 0;
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

function Register() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.conPassword) {
      console.error('password mismatch');
    } else {
      register(dispatch, formData, 'register');
    }
  };

  const user = useSelector((state) => state.user);
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            name="firstName"
            placeholder="First Name"
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
          <Input
            name="email"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
          <Input
            name="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
          <Input
            name="conPassword"
            placeholder="Confirm Password"
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal data in accordance
            with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button
            top={user.loading ? '7' : '15'}
            disabled={user.loading ? true : false}
            onClick={handleSubmit}
          >
            {user.loading ? <CircularProgress sx={{ color: 'red' }} size={30} /> : 'CREATE'}
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Register;
