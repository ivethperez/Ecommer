import { useState, useEffect } from 'react'
import Layout from '../../Components/Layout'
import Car from '../../Components/Card'
import { data } from 'autoprefixer'
import Card from '../../Components/Card'
function Home() {

  const [items,setItems] = useState(null)

useEffect(()=>{
fetch('https://api.escuelajs.co/api/v1/products')
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
     

    </Layout>
   )
}

export default Home
