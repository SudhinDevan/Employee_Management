import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userAxios from '../../../Axios/user';
import {baseImageUrl} from '../../../Constans/Url'
import {defaultImage} from '../../../Constans/Url'

const Profile = () => {

  const navigate = useNavigate();

  const [userData,setData]=useState('')
  const [imgUrl,setImgUrl]=useState('')

  const {Token}= useSelector((state)=>state.Client)

  useEffect(()=>{
    console.log(Token);
    if(Token){
      userAxios.get('/profiledetails',{
        headers:{Authorization:Token}
      }).then((res)=>{
        if(!res.data.success){
          navigate('/login')
        }
        else{
          setData(res.data.userData)
          if (res.data.userData.image) {
            setImgUrl(res.data.userData.image);
          }
        }
      })
    }else{
      navigate('/login')
    }
  },[])
  return (
<section className='h-screen h-80' >
  <div className="bg-transparent min-h-screen flex flex-col items-center justify-center">
  <div className="w-full lg:w-4/12 px-4 mx-auto mt-0">
    <div className="relative flex flex-col min-w-0 break-words bg-white bg-opacity-70 w-full shadow-xl rounded-lg">
      <div className="px-6">
        <div className="text-center my-10">
          <div className="flex justify-center">
              <img
                src={
                  userData.image
                    ? baseImageUrl+imgUrl
                    : defaultImage
                }
                alt="......"
                className="avatar rounded-full h-48 w-48 border-4 border-white"
              />
          </div>
          <h3 className="text-xl font-semibold leading-normal mb-2 mb-2">
            {userData.username}
          </h3>
        <div className="user-info">
          <h5>
            <i className="text-lg">Email: {userData.email}</i>
          </h5>
          <p className="mb-0 text-red-500">
            {userData.image ? null : "Please Update Your Photo!!"}
          </p>
        </div>

        <div className="input-group mb-3 w-75 mx-auto">
        <button
          className="bg-green-300 hover:bg-green-700 text-dark font-bold py-2 px-4 rounded w-full"
          onClick={() => {
            navigate("/editprofile");
          }}
        >
          Edit Profile
        </button>

        </div>

        </div>
      </div>
    </div>
  </div>
  </div>
</section>


);
};

export default Profile;
