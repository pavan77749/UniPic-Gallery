import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary ">
    <Container>
      <Navbar.Brand href="#home"><span style={{color:'red', fontFamily:'monospace'}}>UniPic</span> Gallery</Navbar.Brand>
    </Container>
  </Navbar>
  )
}
