
import { useShopiContext } from '../../Context'
import { Link } from 'react-router-dom'
import logo from '../../Imagenes/Logo.png'

function MyCustomPackage() {
  const { order } = useShopiContext();
  return (
    <div className='mt-3'>
          <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link to='/ecommer' className=" decoration-transparent inline-flex items-center text-sm font-medium text-gray-700 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-white">
              <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Seguir comprando
            </Link>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap='round' strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Mis órdenes</span>
            </div>
          </li>
        </ol>
      </nav>




          <div class="auth-main relative">
      <div class="auth-wrapper v1 flex items-center w-full h-full min-h-screen">
        <div class="auth-form flex items-center justify-center grow flex-col min-h-screen relative p-6 ">
          <div class="w-full max-w-[350px] relative">
            <div class="auth-bg ">
              <span class="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] block rounded-full bg-theme-bg-1 animate-[floating_7s_infinite]"></span>
              <span class="absolute top-[150px] right-[-150px] w-5 h-5 block rounded-full bg-primary-500 animate-[floating_9s_infinite]"></span>
              <span class="absolute left-[-150px] bottom-[150px] w-5 h-5 block rounded-full bg-theme-bg-1 animate-[floating_7s_infinite]"></span>
              <span class="absolute left-[-100px] bottom-[-100px] w-[300px] h-[300px] block rounded-full bg-theme-bg-2 animate-[floating_9s_infinite]"></span>
            </div>
            <div class="card sm:my-12  w-full shadow-none">
              <div class="card-body !p-10">
                <div class="text-center mb-8">
                  <a href="#"><img src={logo} alt="img" class="mx-auto auth-logo"/></a>
                </div>
                <h4 class="text-center font-medium mb-4">Iniciar sesión</h4>
                <div class="mb-3">
                  <input type="email" class="form-control" id="floatingInput" placeholder="Email Address" />
                </div>
                <div class="mb-4">
                  <input type="password" class="form-control" id="floatingInput1" placeholder="Password" />
                </div>
                <div class="flex mt-1 justify-between items-center flex-wrap">
                  <div class="form-check">
                    <input class="form-check-input input-primary" type="checkbox" id="customCheckc1" checked="" />
                    <label class="form-check-label text-muted" for="customCheckc1">Remember me?</label>
                  </div>
                  <h6 class="font-normal text-primary-500 mb-0">
                    <a href="#"> Forgot Password? </a>
                  </h6>
                </div>
                <div class="mt-4 text-center">
                  <button type="button" class="btn btn-primary mx-auto shadow-2xl">Login</button>
                </div>
                <div class="flex justify-between items-end flex-wrap mt-4">
                  <h6 class="font-medium mb-0">Don't have an Account?</h6>
                  <a href="register-v1.html" class="text-primary-500">Create Account</a>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    </div>

    
  )
}

export default MyCustomPackage
