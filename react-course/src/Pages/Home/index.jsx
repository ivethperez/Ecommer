import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import ProductModal from '../../Components/ProductModal'
import { useShopiContext } from '../../Context'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
function Home() {
  const { openModal, search, searchByTitle, filteredItems } = useShopiContext();
  const renderView = () => {
      if (filteredItems?.length > 0) {
        return (
          filteredItems?.map(item => (
            <Card key={item.id} data={item}> </Card>
          ))
        )
      } else {
        return (
          <div>No hay resultados</div>
        )
      } 
  }
  return (
    <div>
      <div className='flex w-full items-center justify-center mb-4 '>
        <h1 className='font-medium text-lg'>Productos </h1>
      </div>
      <div className=' flex mb-4 mt-2 w-full items-center justify-center'>
        <input type='text' placeholder='Buscar producto' className='w-80 rounded-lg border border-green-200 shadow p-4 mb-4 focus:outline-none' 
          onChange={search}></input>
      </div>
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
    </div>
  )
}

export default Home
