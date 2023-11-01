import React,{useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import userAxios from '../../../Axios/user.js'
import { useNavigate,useLocation } from 'react-router-dom'
import { clientLogout,adminLogout } from '../../../Redux/Client.js'


function Navbar() {
    const navigate = useNavigate(null)
    const dispatch = useDispatch();
    const { Token ,Authorized } = useSelector((state) => state.Client)
    const location = useLocation()
    const pathname = location.pathname
    const highlited = 'text-amber-700 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6'
    const normal = 'border-b-2 border-transparent hover:text-amber-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'
    useEffect(() => {
        if (Token) {
          userAxios.get('/', {
            headers: {
              Authorization: Token
            }
          }).then((res) => {
            if (!res.data.success) {
              navigate('/login')
            }
            console.log(res.data);
          })
        } else {
          navigate('/login')
        }
      }, [])
    
      const logout = () => {
        dispatch(clientLogout());
        dispatch(adminLogout());
        
        navigate("/login");
      };
  return (
    <nav className="bg-transparen sticky top-0 shadow dark:bg-gray-800">
      <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <a onClick={()=>navigate('/')} className={pathname==='/' ? highlited :normal}>
          home
        </a>
        <a onClick={()=>navigate('/profile')}  className={pathname==='/profile' ? highlited :normal}>
          Profile
        </a>
        <a  onClick={()=> {Authorized&&navigate('/dashboard')}}  className={pathname==='/dashboard' ? highlited :normal} >
          Dashboard
        </a>
        <a onClick={logout} className="border-b-2 border-transparent hover:text-amber-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
          logout
        </a>
        
      </div>
    </nav>
  );
}

export default Navbar;
