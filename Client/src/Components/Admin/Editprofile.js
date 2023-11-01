import React,{useState,useEffect,useRef} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import adminaxios from '../../Axios/admin';
import {  ToastContainer } from 'react-toastify';
import {showErrorToast} from '../../Helpers/toaster'
import {baseImageUrl} from '../../Constans/Url'
import {defaultImage} from '../../Constans/Url'
const EditProfile = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id')
  const navigate = useNavigate();
  const [userData,Setuserdata]=useState({})
  const [isLoading, setIsLoading] = useState(false);
  const {adminToken}= useSelector((state)=>state.Client)

  useEffect(() => {
      console.log(id);
    //   console.log(adminToken);
        if (adminToken) {
            adminaxios.get(`/editprofile?id=${id}`, {
                headers: {
                    Authorization: adminToken
                }
            }).then((res)=>{
            if(!res.data.success){
                navigate('/login')
            }
            else{
                Setuserdata(res.data.userData)
                // console.log("am userData :",res.data.userData)
            }
            }).catch((error)=>{
              showErrorToast(error)
            })
        } else {
            navigate('/login')
        }
    }, [])

    const imgbtn=useRef(null)

   
    const [username,SetUsername]=useState('');
    const [Img,SetImg]=useState(null)


    
    const formSubmit=(e)=>{

        e.preventDefault()
        setIsLoading(true);
        if(username&&username.trim()===''){
          showErrorToast('Enter Valid Username')
          setIsLoading(false);
          return
        }
        if (Img&&!Img.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          showErrorToast('Select Valid Image')
          navigate('/editprofile');
          setIsLoading(false);
          return false
          }
        let postData = {
          username:username ? username : null,
          email:userData.email,
          image: Img ? Img : false
        }
        console.log(postData);
        adminaxios.post(`/updateprofile?id=${id}`,postData,
        {headers:{Authorization:adminToken,'Content-Type': 'multipart/form-data',
      }})
        .then((res)=>{
          if(res.data.success){
            showErrorToast(res.data.message)
            console.log(res.data);
            navigate('/dashboard')
          }
          else{
            showErrorToast(res.data.message)
            navigate('/dashboard/editprofile')
            console.log(res.data.message);
          }
        })
        .catch((error)=>{
          showErrorToast(error)
        })
        .finally(()=>{
          setIsLoading(false);
        })
      }

  return (
<section className="bg-transparent flex items-center justify-center min-h-screen">
  <div className="w-full lg:w-4/12 px-4 mx-auto mt-0">
    <div className="relative flex flex-col min-w-0 break-words bg-white bg-opacity-70 w-full shadow-xl rounded-lg">
      <div className="px-6">
        <form onSubmit={formSubmit} encType="multipart/form-data" className="text-center mt-12">
          <div className="flex flex-col items-center"> 
            <img
              src={Img ? `${URL.createObjectURL(Img)}` :(userData.image ? baseImageUrl+userData.image : defaultImage)}
              alt="Profile Avatar"
              className="avatar rounded-full h-48 w-48 border-4 border-white"
            />
            <input
              onChange={(e) => SetImg(e.target.files[0])}
              ref={imgbtn}
              type="file"
              className="hidden"
            />
            <div className="mt-4 text-center">
              <span className="text-2xl text-dark font-semibold">{userData.username}</span>
              <br />
              <span
                className="text-xs text-gray-500 cursor-pointer hover:underline"
                onClick={() => imgbtn.current.click()}
              >
                Change profile photo
              </span>
            </div>
          </div>
          <div className="user-info mt-4 text-center">
            <div className="edit-input-text">
              <label htmlFor="username">Username</label>
              <input
                placeholder={userData.username}
                onChange={(e) => SetUsername(e.target.value)}
                type="text"
                id="username"
                className="mt-2 p-2 border border-gray-300 rounded w-full"
              />
            </div>
          </div>
          <div className="input-group mb-3 w-75 mx-auto mt-4">
            <button
              className="bg-green-300 hover:bg-green-700 text-dark py-2 px-4 rounded w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Submiting...' : 'Submit'}
            </button>
            
          </div>
          <div className="text-right my-2">
              <button
                className="bg-gray-600 hover:bg-green-700 text-dark py-2 px-2 w-16 h-8 flex items-center justify-center relative"
                onClick={() => {
                  navigate('/dashboard');
                }}
              >
                <span className="text-white absolute right-2 top-1/2 transform -translate-y-1/2 text-sm">
                  Back ←
                </span>
              </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <ToastContainer />
</section>




);
};

export default EditProfile;
