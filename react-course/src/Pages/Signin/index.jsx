import { useRef, useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import { useShopiContext } from '../../Context'
import storage from '../../utils/storage'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

function Signin() {
  const { account, view, setView, setSignOut, setAccount } = useShopiContext();
  const form = useRef(null)
  const [showPassword, setShowPassword] = useState(false);

  const parsedAccount = storage.getItem('account')
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = account ? Object.keys(account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const createAnAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }
    storage.setItem('account', data)
    setAccount(data)

    handleSignIn()
  }
  const handleSignIn = () => {
    storage.setItem('sign-out', false)
    setSignOut(false)

    return <Navigate replace to={'/'}></Navigate>
  }
  // Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const renderLogIn = () => {
    return (
      <div>

        <div className="flex w-full shadow-2xl">
          <div className='flex flex-col w-80 items-center'>
            <p>
              <span className='font-light text-sm'>Email: </span>
              <span>{parsedAccount?.email}</span>
            </p>
            <p>
              <span className='font-light text-sm'>Password: </span>
              <span type='password'>{parsedAccount?.password}</span>
            </p>
            <Link to="/">
              <button className="bg-black disabled:bg-black/40 text-white w-72 rounded-lg py-3 mt-4 mb-2"
                disabled={!hasUserAnAccount}
                onClick={() => handleSignIn()}>
                Iniciar
              </button>
            </Link>
            <div className='text-center'>
              <a className='font-light text-xs underline underline-offset-4' href='/'>Olvide mi contraseña</a>
            </div>
            <button
              className='border border-black disabled:text-black/40 disabled:border-black/40 w-72
          rounded-lg mt-6 py-3 mb-4'
              disabled={hasUserAnAccount}
              onClick={() => setView('create-user-info')}>
              Registrarse
            </button>
          </div>

        </div>
      </div>
    )
  }

  const renderCreateUserInfo = () => {
    return (
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='font-light text-sm'>Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount?.name}
            placeholder="Peter"
            className='rounded-lg border border-black placeholder:font-light
            placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='font-light text-sm'>Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={parsedAccount?.email}
            placeholder="hi@helloworld.com"
            className='rounded-lg border border-black
            placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password" className='font-light text-sm'>Contraseña:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            defaultValue={parsedAccount?.password}
            placeholder="******"
            className='rounded-lg border border-black
            placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
          <button
            className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none'
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeSlashIcon
                className='h-5 w-5 text-gray-400 hover:text-gray-600'
                aria-hidden='true'
              />
            ) : (
              <EyeIcon
                className='h-5 w-5 text-gray-400 hover:text-gray-600'
                aria-hidden='true'
              />
            )}
          </button>

        </div>
        <Link to="/">
          <button
            className='bg-black text-white w-full rounded-lg py-3'
            onClick={() => createAnAccount()}>
            Create
          </button>
        </Link>
      </form>
    )
  }

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn()

  return (
    <div>
      <div className='flex w-80 items-center justify-center relative mb-4'>
        <h1 className='font-medium text-lg'>Bienvenido</h1>
      </div>
      {renderView()}
    </div>
  )
}

export default Signin