
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import ProductModal from '../../Components/ProductModal'
import { useShopiContext } from '../../Context'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
function Home() {
  const {openModal,items,search,searchByTitle,filteredItems} = useShopiContext();
  const renderView =() =>{
    if(searchByTitle?.length>0){
      if(filteredItems?.length>0){
        return(
          filteredItems?.map(item =>(
          <Card key={item.id} data={item}> </Card>
          )) 
        )
      }else{
        return(
          <div>No hay resultados</div>
        )
      }
    }
    else{ return(
      items?.map(item =>(
        <Card key={item.id} data={item}> </Card>
        )) 
    )
     
    }
  }
   return(
    <Layout>
     <div className='flex w-80 items-center justify-center relative mb-4'>
        <h1 className='font-medium text-lg'>Productos exclusivos</h1>
      </div>
      <input type='text' placeholder='Buscar producto' className='w-80 rounded-lg border border-green-200 shadow p-4 mb-4 focus:outline-none'
      onChange={search}></input>
      <div className='grid gap-4  grid-cols-2 sm:grid-cols-4 w-full max-w-screen-lg px-2'>
      { //renderizado
          renderView()
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
