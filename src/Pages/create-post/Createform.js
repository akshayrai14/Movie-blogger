import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import './Createform.css'
import { addDoc,collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
//adddoc creates new entry in firebase and collection specifies which collection we need to access among all
function Createform() {
  const [isTickVisible, setIsTickVisible] = useState(false);
  const [go,setgo] =useState(false);
  //this i have done so that once my tick animation is done then use effect is called and navigation occurs 
  useEffect(() => {
    if (go) {
      // Navigate to another page
      nav("/home");
    }
  }, [isTickVisible]);

  const nav = useNavigate();
  const [ user ] = useAuthState(auth);
  const schema = yup.object().shape({
    title : yup.string().required("You must add title."),
    description : yup.string().required("You must provide description"),
  });
  const {register,handleSubmit , formState : {errors},} =useForm({
    resolver: yupResolver(schema),
  });
  
  const onCreatePost= async (data)=>{

    //console.log(data);
    //we have the data now as 'data' , we just need to send it to firebase inside this function 
    //here addDoc will have the reference to the collection specified above as postsRef and the data to be added
    await addDoc(postsRef,{
      title: data.title,
      description : data.description,
      //two fields we got from submit and two fields below we'll take from firebase user only
      username : user?.displayName,
      userId : user?.uid,
      //can add new fields too
    });
    setIsTickVisible(true);

    // After 2 seconds, hide the tick animation
    setTimeout(() => {
      setIsTickVisible(false);
    }, 2000);
    setTimeout(() => {
      setgo(true);
    }, 2000);
  };
  //this wee need to merge both form and yup in react and then we put register for each element below to specify the yup for that element
  const postsRef = collection(db,"posts");
  //with this variable we have a reference to our post collection in db
  //whenever a function returns a promise , we have to make it async like the addDoc 
  return (
    <div className="container">
  <div className="form-container">

    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="Title..." {...register("title")} />
      <p className="error-message">{errors.title?.message}</p>
      <textarea placeholder="Description..." {...register("description")} />
      <p className="error-message">{errors.description?.message}</p>
      <input type="submit" />
    </form>
    
    <div className='ticky'>

    {isTickVisible && (
        <div className="tick-animation">
          <div className="circle"></div>
          <div className="tick">&#10004;</div>
        </div>
      )}

    </div>
  </div>
</div>
  )
}

export default Createform

