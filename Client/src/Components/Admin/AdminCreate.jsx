import React,{ useState} from "react";
import { useNavigate } from "react-router-dom";
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userAxios from '../../Axios/user';
import {showErrorToast,showToast} from '../../Helpers/toaster'

const AdminCreate = () => {
    const [username , setUsername] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [rPassword , setRpassword] = useState('');
    const navigate = useNavigate()

    

    const handleSubmit = (e) => {
        e.preventDefault()
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(username.trim()===''){
          showErrorToast('Enter Valid Username')
          return
        }
        if(email.trim()===''||!emailPattern.test(email)){
          showErrorToast('Enter Valid Email')
          return
        }
        if(password.trim()===''){
          showErrorToast('Enter Valid Enter Valid Password')
          return
        }
        if(password!==rPassword){
          showErrorToast('Passwords Arent Mathing')
          return
        }
        const userData = {
          username,
          email,
          password,
        }

        userAxios.post('signup',userData).then((res)=>{
          if(res.data.status){
            navigate('/dashboard')
            showToast('Registration successful');
          }else{
            showErrorToast('Cannot Register User')
            return
          }
        }).catch((error)=>{
          showErrorToast(error)
        })

        console.log(username,email,password,rPassword);
    }


  return (
    <div class="flex items-center justify-center min-h-screen">
    <div class="bg-gradient-to-r mt-20 mb-20 rounded-lg p-4 md:p-6 shadow-md max-w-md mx-auto flex flex-col items-center justify-center">
        <h4 class="text-blue-800 text-2xl md:text-3xl font-semibold text-center mb-2 md:mb-4">Sign Up</h4>
        <p class="text-dark text-sm md:text-base font-normal text-center mb-4 md:mb-6">Enter your details to register.</p>
        <form class="mt-2 md:mt-4 mb-2 overflow-y-auto">
            <div class="mb-4 space-y-2 md:space-y-2">
                <input
                    name="name"
                    class="border rounded-lg px-3 md:px-4 py-2 w-full text-sm md:text-base  focus:outline-none placeholder-gray-400"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Name"
                />
                <input
                    name="email"
                    class="border rounded-lg px-3 md:px-4 py-2 w-full text-sm md:text-base  focus:outline-none placeholder-gray-400"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    name="password"
                    class="border rounded-lg px-3 md:px-4 py-2 w-full text-sm md:text-base  focus:outline-none placeholder-gray-400"
                    type="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <input
                    name="rpassword"
                    class="border rounded-lg px-3 md:px-4 py-2 w-full text-sm md:text-base  focus:outline-none placeholder-gray-400"
                    type="password"
                    autoComplete="off"
                    value={rPassword}
                    onChange={(e) => setRpassword(e.target.value)}
                    placeholder="Repeat Password"
                />
            </div>

            <button
                onClick={handleSubmit}
                class="bg-blue-400 hover:bg-blue-500 mb-2 text-white rounded-lg px-4 py-2 w-full text-sm md:text-base"
                type="submit"
            >
                Register
            </button>
            <div class="text-right my-2">
                <button
                    class="bg-gray-600 hover:bg-blue-500 text-dark py-2 px-2 w-16 h-8 flex items-center justify-center relative"
                    onClick={() => {
                        navigate('/dashboard');
                    }}
                >
                    <span class="text-white absolute right-2 top-1/2 transform -translate-y-1/2 text-sm">
                        Back ←
                    </span>
                </button>
            </div>
        </form>
    </div>

    <ToastContainer />
  </div>

  );
};

export default AdminCreate;
