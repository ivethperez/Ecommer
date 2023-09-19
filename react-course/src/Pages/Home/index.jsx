
import Layout from '../../Components/Layout'
import Car from '../../Components/Card'
import { data } from 'autoprefixer'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import ProductModal from '../../Components/ProductModal'
import { useShopiContext } from '../../Context'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
function Home() {
  const {openModal,items,search} = useShopiContext();

   return(
    <Layout>
     <div className='flex w-80 items-center justify-center relative mb-4'>
        <h1 className='font-medium text-lg'>Productos exclusivos</h1>
      </div>
      <input type='text' placeholder='Buscar producto' className='w-80 rounded-lg border border-green-200 shadow p-4 mb-4 focus:outline-none'
      onChange={search}></input>
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
       <CheckoutSideMenu></CheckoutSideMenu>
     
    </Layout>
   )
}

export default Home
