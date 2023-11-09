import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import ProductModal from '../../Components/ProductModal'
import { useShopiContext } from '../../Context'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'

import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import { Container, Row } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';

function Home() {
  const { openModal, search, filteredItems } = useShopiContext();
  const renderView = () => {
      if (filteredItems?.length > 0) {
        return (

          <Row xs={2} md={4} className="g-4">
            {Array.from(filteredItems)?.map((item) => (
            <Col  > 
           <Card key={item.id} data={item}></Card>
            </Col>
           ))}

          </Row>
        )
      } else {
        return (
          <div>No hay resultados</div>
        )
      } 
  }
  return (
    <div className="container-fluid bg-body-tertiary">
      <Carousel>
      <Carousel.Item>
      <img className="w-full h-36 object-cover rounded-lg" src='https://images.pexels.com/photos/209345/pexels-photo-209345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='img'></img>
      
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className="w-full h-36 object-cover rounded-lg" src='https://images.pexels.com/photos/209345/pexels-photo-209345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='img'></img>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className="w-full h-36 object-cover rounded-lg" src='https://images.pexels.com/photos/209345/pexels-photo-209345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='img'></img>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <Container className=' mt-5 items-center justify-center'>
    <Row >
        <Col  md={{ span: 6, offset: 6 }} sm={{ span: 12, offset: 12 }} >
        <Form.Control
              type="text"
              placeholder="Buscar producto"
              onChange={search}
              
            />
            </Col>
        </Row>
    </Container>
       

      {/* <div className=' flex mt-5 w-full items-center justify-center'>
        <input type='text' placeholder='Buscar producto' className='w-80 rounded-lg border border-green-200 shadow p-4 mb-4 focus:outline-none' 
          onChange={search}></input>
      </div> */}
      <div className='container grid mt-3 '>
        { //renderizado  gap-4 mt-4 grid-cols-2 sm:grid-cols-4 w-full max-w-screen-lg px-2

   
          renderView()

     
        }


      </div>
      {openModal && (
        <ProductModal>
          <ProductDetail></ProductDetail>
        </ProductModal>
      )}
      <CheckoutSideMenu></CheckoutSideMenu>
    </div>
  )
}

export default Home