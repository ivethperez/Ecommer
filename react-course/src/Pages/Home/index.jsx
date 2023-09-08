import { useState, useEffect } from 'react'
import Layout from '../../Components/Layout'
import Car from '../../Components/Card'
import { data } from 'autoprefixer'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import ProductModal from '../../Components/ProductModal'
import { useShopiContext } from '../../Context'
function Home() {

  const [items,setItems] = useState(null)
  const {openModal} = useShopiContext();

useEffect(()=>{
fetch('https://api-product-5iv7.onrender.com/products')
.then(response=> response.json())
.then(data => setItems(data))
},[])
   return(
    <Layout>
      Home
      <div className='grid gap-4  grid-cols-2 sm:grid-cols-4 w-full max-w-screen-lg px-2'>
      {
        items?.map(item =>(
          <Card key={item.id} data={item}> </Card>
          )) 
      }
      </div>  

      {openModal && (
        <ProductModal>
          <ProductDetail></ProductDetail>
        </ProductModal>
      )}   
     
    </Layout>
   )
}

export default Home
