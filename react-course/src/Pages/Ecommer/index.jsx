import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import ProductModal from '../../Components/ProductModal'
import { useShopiContext } from '../../Context'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import Carousel from 'react-bootstrap/Carousel';
import Alert from '../../Components/Alert'
import '../../Styles/styles.css'

function Ecommer() {
  const { openModal, search, filteredItems, setSearchByCategory, isActiveChocolate, isActiveGomitas,
    isActiveBotanas, isActiveTodo,showAlert,setShowEcomm } = useShopiContext();
  const filtro = (val) => {
    setSearchByCategory(val);
  }
  const renderView = () => {
    if (filteredItems?.length > 0) {
      return (

        // <Row xs={2} md={4} className="g-4">
        //   {Array.from(filteredItems)?.map((item) => (
        //   <Col  > 
        //  <Card key={item.id} data={item}></Card>
        //   </Col>
        //  ))}

        // </Row>

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
  setShowEcomm(true)
  return (
    <div className="container-fluid ">
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


      {/* <Container className=' mt-5 items-center justify-center'>
    <Row >
        <Col  md={{ span: 6, offset: 6 }} sm={{ span: 12, offset: 12 }} >
        <Form.Control
              type="text"
              placeholder="Buscar producto"
              onChange={search}
              
            />
            </Col>
        </Row>
    </Container> */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


        <div className="grid grid-cols-1 items-start lg:grid-cols-4">
          <div className="relative -mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:block sm:overflow-visible sm:pb-0">
            {/* <h2 id="speakers-title" className="font-display text-4xl font-medium tracking-tighter color-rosa-text sm:text-5xl">Speakers</h2> 
      <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
        Learn from the experts on the cutting-edge of deception at the most sinister companies.
        </p> */}

          </div>
          <div className="lg:col-span-3">
            <div className='mt-4 font-display text-2xl tracking-tight text-blue-900'>
              <input type='text' placeholder='Buscar producto' className='block w-80 appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'
                onChange={search}></input>
            </div>
          </div>
        </div>
        {showAlert ?
 <Alert></Alert>
 :
 <div></div>
        }
       
        <div className="mt-4 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:mt-2 sm:gap-y-16 lg:mt-24 ">
          <div className="relative -mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:block sm:overflow-visible sm:pb-0">
            <div className="absolute bottom-0 left-0.5 top-2 hidden w-px bg-slate-200 lg:block"></div>
            <div className="grid auto-cols-auto grid-flow-col justify-start gap-x-10 gap-y-10 whitespace-nowrap px-8 sm:mx-auto sm:max-w-2xl sm:grid-cols-3 sm:px-0 sm:text-center  lg:text-left" role="tablist" aria-orientation="vertical">
              <div className="relative lg:pl-8">             
              <div className="relative">           
                <time datetime="2022-04-04" className="block text-2xl font-semibold tracking-tight">Todo</time>
                <div className={`mt-1.5 font-mono text-sm ${!isActiveTodo ? 'text-slate-500' : 'color-rosa-text'}`}>
                  <button onClick={() => filtro()} className="ui-not-focus-visible:outline-none" id="headlessui-tabs-tab-:R6cqlaqlla:" role="tab" type="button" aria-selected="false" tabindex="-1" data-headlessui-state="" aria-controls="headlessui-tabs-panel-:R3alaqlla:"><span className="absolute inset-0"></span>Todo tipo de dulce</button>
                </div>
              </div>
              <svg aria-hidden="true" viewBox="0 0 6 6" className={`absolute left-[-0.5px] top-[0.5625rem] hidden h-1.5 w-1.5 overflow-visible lg:block fill-transparent ${!isActiveTodo ? 'fill-slate-500 stroke-slate-500' : 'fill-blue-600 stroke-rosa'} `}>
                <path d="M3 0L6 3L3 6L0 3Z" strokeWidth="2" strokeLinejoin="round"></path>
              </svg>
            </div>
              <div className="relative lg:pl-8">
                <svg aria-hidden="true" viewBox="0 0 6 6" className={`absolute left-[-0.5px] top-[0.5625rem] hidden h-1.5 w-1.5 overflow-visible lg:block fill-transparent ${!isActiveBotanas ? 'fill-slate-500 stroke-slate-500' : 'fill-blue-600 stroke-rosa'} `}><path d="M3 0L6 3L3 6L0 3Z" strokeWidth="2" strokeLinejoin="round">
                </path>
                </svg>
                <div className="relative">                 
                  <time datetime="2022-04-05" className="block text-2xl font-semibold tracking-tight ">Botanas</time>
                  <div className={`mt-1.5 font-mono text-sm ${!isActiveBotanas ? 'text-slate-500' : 'color-rosa-text'} `}>
                    <button onClick={() => filtro('botanas')} className="ui-not-focus-visible:outline-none" id="headlessui-tabs-tab-:R6kqlaqlla:" role="tab" type="button" aria-selected="false" tabindex="-1" data-headlessui-state="" aria-controls="headlessui-tabs-panel-:R5alaqlla:">
                      <span className="absolute inset-0"></span>Salado</button>
                  </div>
                </div>
              </div>
              <div className="relative lg:pl-8">
                <svg aria-hidden="true" viewBox="0 0 6 6" className={`absolute left-[-0.5px] top-[0.5625rem] hidden h-1.5 w-1.5 overflow-visible lg:block fill-transparent ${!isActiveGomitas ? 'fill-slate-500 stroke-slate-500' : 'fill-blue-600 stroke-rosa'} `}><path d="M3 0L6 3L3 6L0 3Z" strokeWidth="2" strokeLinejoin="round">
                </path>
                </svg><div className="relative">                  
                  <time datetime="2022-04-06" className="block text-2xl font-semibold tracking-tight ">Gomitas</time>
                  <div className={`mt-1.5 font-mono text-sm ${!isActiveGomitas ? 'text-slate-500' : 'color-rosa-text'} `}>
                    <button onClick={() => filtro('gomitas')} className="ui-not-focus-visible:outline-none" id="headlessui-tabs-tab-:R6sqlaqlla:" role="tab" type="button" aria-selected="false" tabindex="0" data-headlessui-state="selected" aria-controls="headlessui-tabs-panel-:R7alaqlla:">
                      <span className="absolute inset-0"></span>Dulce</button></div>
                </div>
              </div>
              <div className="relative lg:pl-8">
                <svg aria-hidden="true" viewBox="0 0 6 6" className={`absolute left-[-0.5px] top-[0.5625rem] hidden h-1.5 w-1.5 overflow-visible lg:block fill-transparent ${!isActiveChocolate ? 'fill-slate-500 stroke-slate-500' : 'fill-blue-600 stroke-rosa'} `}><path d="M3 0L6 3L3 6L0 3Z" strokeWidth="2" strokeLinejoin="round"></path></svg><div className="relative">
                <time datetime="2022-04-06" className=" block text-2xl font-semibold tracking-tight ">Chocolates</time>
                  <div className={`mt-1.5 font-mono text-sm ${!isActiveChocolate ? 'text-slate-500' : 'color-rosa-text'} `}>
                    <button onClick={() => filtro('chocolates')} className="ui-not-focus-visible:outline-none" id="headlessui-tabs-tab-:R6sqlaqlla:" role="tab" type="button" aria-selected={isActiveChocolate} tabindex="0" data-headlessui-state="" aria-controls="headlessui-tabs-panel-:R7alaqlla:">
                      <span className="absolute inset-0"></span>Dulce y Salado</button></div>
             
                </div>
              </div>
     
            </div>
          </div>

       
          
          </div>
          
          <div className="lg:col-span-4 sm:col-span-2 mt-4">
            <ul role="list" className="grid grid-cols-1 ui-not-focus-visible:outline-none sm:grid-cols-2 md:grid-cols-4">
              {
                renderView()
              }
            </ul>
          </div>
  



{/* <div className=' items-center justify-center flex'>
<nav aria-label="Page navigation example">
  <ul class="flex items-center -space-x-px h-8 text-sm">
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span class="sr-only">Previous</span>
        <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
        </svg>
      </a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
    </li>
    <li>
      <a href="#" aria-current="page" class="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
    </li>
    <li>
      <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span class="sr-only">Next</span>
        <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
      </a>
    </li>
  </ul>
</nav>
</div>
         */}
          </div>





      {/* <div className=' flex mt-5 w-full items-center justify-center'>
        <input type='text' placeholder='Buscar producto' className='w-80 rounded-lg border border-green-200 shadow p-4 mb-4 focus:outline-none' 
          onChange={search}></input>
      </div> */}
      <div className='container grid mt-3 '>
        { //renderizado  gap-4 mt-4 grid-cols-2 sm:grid-cols-4 w-full max-w-screen-lg px-2
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

export default Ecommer