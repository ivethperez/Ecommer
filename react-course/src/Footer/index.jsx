import React from "react"
import {Container,Row,Col,Nav} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'
const Footerr = ()=>{
    return(
  
<footer className=" py-10 bg-body-tertiary">
<Container fluid>
    <Row>
        <Col className="text-center  copyright"> &copy; ProShop</Col>
    </Row>
    <Row>
    <Nav className="justify-content-center" activeKey="/home">
    <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Siguenos en
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/home"><i class="bi bi-facebook"></i></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1"><i class="bi bi-whatsapp"></i></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2"><i class="bi bi-tiktok"></i></Nav.Link>
        </Nav.Item>
        
      </Nav>

    </Row>
</Container>
</footer>



    )
}

export default Footerr