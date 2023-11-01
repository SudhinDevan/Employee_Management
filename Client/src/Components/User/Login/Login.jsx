import React,{useState,useEffect}  from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch , useSelector } from 'react-redux'
import {  ToastContainer } from 'react-toastify';
import {showErrorToast} from '../../../Helpers/toaster';
import userAxios from '../../../Axios/user';
import { clientLogin,adminLogin } from '../../../Redux/Client';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const {Token} = useSelector((state)=>state.Client)

  useEffect(()=>{

    if(Token){
      navigate('/')
    }
    
  },[])

  const handleLogin = (e)=>{
    e.preventDefault()
    if(!email&&!password){
      showErrorToast('Please Enter Email And Password')
      return
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(email.trim()===''||!emailPattern.test(email)){
      showErrorToast('Enter Valid Email')
      return
    }
    if(password.trim()===''){
      showErrorToast('Enter Valid Enter Valid Password')
      return
    }
    console.log('almost in');
    userAxios.post('/login',{email,password})
    .then((res)=>{
      console.log(res);
      const userDetails = res.data;
      if(userDetails.status){
        console.log(userDetails.isAdmin);
        if(userDetails.isAdmin){
          dispatch(
            adminLogin({
            adminToken :userDetails.user,
            adminName :userDetails.username,
            Authorized: true
          })
          )
          console.log('this guy is admin');
        }
          dispatch(
            clientLogin({
              token: userDetails.user,
              username: userDetails.username,
            }),
          );
          navigate('/');
      }else{
        showErrorToast(res.data.error)
      }
    }).catch((error)=>{
      showErrorToast(error.status)
    })

  }
      return (
      <div className="flex items-center  justify-center min-h-screen bg-gradient-to-r">
        <div className="bg-white opacity-90  rounded-lg p-6 shadow-md w-96">
          <h3 className="text-teal-800 text-2xl font-semibold text-center">Employee Management</h3>
          <h4 className="text-teal-500 text-2xl font-semibold mb-4 text-center">Sign In</h4>
          <p className="text-gray-600 font-normal text-center mb-4">Enter your details to sign in.</p>
          <form action="" className="mb-4">
            <div className="mb-4">
              <input
                type="text"
                className="border rounded-lg px-4 py-2 w-full text-gray-700 focus:ring focus:ring-teal-500 focus:outline-none placeholder-gray-400"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="border rounded-lg px-4 py-2 w-full text-gray-700 focus:ring focus:ring-teal-500 focus:outline-none placeholder-gray-400"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleLogin}
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4 py-2 w-full transition duration-300"
            >
              Sign In
            </button>
          </form>
          <p className="text-gray-600 text-center font-normal">
            Don't have an account?{' '}
            <span
              className="font-medium text-teal-500 hover:text-teal-600 cursor-pointer"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </span>
          </p>
        </div>
        <ToastContainer />
      </div>
  )
}

export default Login
