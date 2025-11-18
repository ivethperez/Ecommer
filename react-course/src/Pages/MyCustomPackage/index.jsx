
import { useShopiContext } from '../../Context'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../Imagenes/Logo.png'
import { useState } from 'react';

function MyCustomPackage() {
  const { login } = useShopiContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Login = () =>{
    login(email,password);
  }
  return (
    <div>
          <div className="auth-main relative">
      <div className="auth-wrapper v1 flex items-center w-full h-full min-h-screen">
        <div className="auth-form flex items-center justify-center grow flex-col min-h-screen relative p-6 ">
          <div className="w-full max-w-[350px] relative">
            
            <div className="card sm:my-12  w-full shadow-none">
              <div className="card-body !p-10">
                <div className="text-center mb-8">
                  <a href="#"><img src={logo} alt="img" className="mx-auto auth-logo"/></a>
                </div>
                <h4 className="text-center font-medium mb-4">Iniciar sesión</h4>
                <div className="mb-3">
                  <input type="email" className="form-control" id="floatingInput" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                  <input type="password" className="form-control" id="floatingInput1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex mt-1 justify-between items-center flex-wrap">
                  <div className="form-check">
                    <input className="form-check-input input-primary" type="checkbox" id="customCheckc1"  />
                    <label className="form-check-label text-muted">Remember me?</label>
                  </div>
                  <h6 className="font-normal text-primary-500 mb-0">
                    <a href="#"> Forgot Password? </a>
                  </h6>
                </div>
                <div className="mt-4 text-center">
                 <NavLink to="/pageStart">
                 <button type="button" onClick={Login} className="btn btn-primary mx-auto shadow-2xl">Login</button>
                 </NavLink>
                </div>
                <div className="flex justify-between items-end flex-wrap mt-4">
                  <h6 className="font-medium mb-0">Don't have an Account?</h6>
                  <a href="register-v1.html" className="text-primary-500">Create Account</a>
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
