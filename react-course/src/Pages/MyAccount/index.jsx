import { useRef, useState } from 'react'
import storage from '../../utils/storage'
import { useShopiContext } from '../../Context'
function MyAcount() {  

  const {setAccount} = useShopiContext();
  const [view,setView] = useState('user-info')
  const form = useRef(null)

  const parsedAccount = storage.getItem('account')
  const editAccount = () =>{
    const formData = new FormData(form.current)
    const data ={
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    storage.setItem('account',data)
    setAccount(data)
  }

  const renderUserInfo = () =>{
    return (
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>Name: </span>
          <span>{parsedAccount?.name}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <button
          className='border border-black rounded-lg mt-6 py-3'
          onClick={() => setView('edit-user-info')}>
          Edit
        </button>
      </div>
    )
  } 
  const renderEditUserInfo = () =>{
    return (
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='font-light text-sm'>Your name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount.name}
            placeholder="Peter"
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='font-light text-sm'>Your email:</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={parsedAccount.email}
            placeholder="hi@helloworld.com"
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password" className='font-light text-sm'>Your password:</label>
          <input
            type="text"
            id="password"
            name="password"
            defaultValue={parsedAccount.password}
            placeholder="******"
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <button
          className='bg-black text-white w-full rounded-lg py-3'
          onClick={() => {setView('user-info'), editAccount()}}>
          Edit
        </button>
      </form>
    )
  }

  const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()
   return(
 <div>
   <div className='flex w-80 items-center justify-center relative mb-4'>
        <h1 className='font-medium text-lg'>Mi cuenta</h1>
      </div>
    {renderView()}
 </div>
   )
}

export default MyAcount
