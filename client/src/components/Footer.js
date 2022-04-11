import { Facebook, Instagram, MailOutline, Phone, Room, Twitter } from '@mui/icons-material';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  display: flex;
  ${mobile({
    flexDirection: 'column',
  })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({
    display: 'none',
  })}
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({
    backgroundColor: '#fff8f8',
  })}
`;
const Logo = styled.h1``;
const Description = styled.p`
  margin: 20px 0;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  height: 15%;
  width: 80%;
`;

function Footer() {
  return (
    <Container>
      <Left>
        <Logo>Elite</Logo>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dolores nam, eum fugit sunt
          magnam exercitationem sint praesentium. Ut ipsum reprehenderit voluptas dolores sapiente,
          pariatur inventore natus minima fugit voluptates.
        </Description>
        <SocialContainer>
          <SocialIcon color="#3b5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="#E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="#55ACEE">
            <Twitter />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Men Fashion</ListItem>
          <ListItem>Women Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms & Cond.</ListItem>
          <ListItem>Privacy & Policy</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contacts</Title>
        <ContactItem>
          <Room /> &nbsp;ABC City, ABC State, ABC Country
        </ContactItem>
        <ContactItem>
          <Phone /> &nbsp;+XX XXXXXXXXXX
        </ContactItem>
        <ContactItem>
          <MailOutline /> &nbsp;contact@elite.com
        </ContactItem>
        <Payment src="/payment.png" />
      </Right>
    </Container>
  );
}

export default Footer;
