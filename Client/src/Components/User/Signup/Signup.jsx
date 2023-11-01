import React,{ useState} from "react";
import './Signup.css'
import { useNavigate } from "react-router-dom";
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userAxios from '../../../Axios/user';
import {showErrorToast,showToast} from '../../../Helpers/toaster'

const Signup = () => {
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
          showErrorToast('Passwords do not match')
          return
        }
        const userData = {
          username,
          email,
          password,
        }

        userAxios.post('signup',userData).then((res)=>{
          if(res.data.status){
            console.log("am here");
            navigate('/')
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
    <div className="bg-white opacity-90 mt-20 mb-20 rounded-lg p-4 md:p-6 shadow-md max-w-md mx-auto flex flex-col items-center justify-center space-y-4">
        <h3 className="text-teal-800 text-2xl md:text-3xl font-semibold text-center">Employee Management</h3>
        <h4 className="text-teal-500 text-2xl md:text-3xl font-semibold text-center mb-2 md:mb-4">Sign Up</h4>
        <p className="text-gray-600 text-sm md:text-base font-normal text-center mb-4 md:mb-6">Enter your details to register.</p>
        <form className="w-full">
            <div className="mb-4 space-y-2">
                <input
                    name="name"
                    className="border rounded-lg px-3 py-2 w-full text-sm focus:ring focus:ring-teal-500 focus:outline-none placeholder-gray-500"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Name"
                />
                <input
                    name="email"
                    className="border rounded-lg px-3 py-2 w-full text-sm focus:ring focus:ring-teal-500 focus:outline-none placeholder-gray-500"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    name="password"
                    className="border rounded-lg px-3 py-2 w-full text-sm focus:ring focus:ring-teal-500 focus:outline-none placeholder-gray-500"
                    type="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <input
                    name="rpassword"
                    className="border rounded-lg px-3 py-2 w-full text-sm focus:ring focus:ring-teal-500 focus:outline-none placeholder-gray-500"
                    type="password"
                    autoComplete="off"
                    value={rPassword}
                    onChange={(e) => setRpassword(e.target.value)}
                    placeholder="Repeat Password"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4 py-2 w-full text-sm md:text-base"
                type="submit"
            >
                Register
            </button>
            <p className="text-gray-600 mt-2 md:mt-4 text-center font-normal text-sm md:text-base">
                Already have an account?{" "}
                <span
                    className="font-medium text-teal-400 hover:text-teal-600 cursor-pointer"
                    onClick={() => navigate('/login')}
                >
                    Sign In
                </span>
            </p>
        </form>
    </div>
    <ToastContainer />
</div>


  );
};

export default Signup;
