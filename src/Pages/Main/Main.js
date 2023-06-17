import { getDocs,collection } from 'firebase/firestore'
import React from 'react'
import { db } from '../../config/firebase'
import { useState } from 'react';
import { useEffect } from 'react';
import Post from './Post';
import './Post.css'

// export interface Post{
//     id:string;
//     userId:string;
//     title:string;
//     username:string;
//     description:String;
// }needed for TYPESCRIPT
//an array of Post
//useState<Post[]|null>(null)
//setPostsList(*****something as Post[])


function Main() {
    const postsRef = collection(db,"posts");
    const [postlists,setpostlists]=useState(null);
    //setpostlists array as the data from firebase
    //all firebase operations require an await to be performed so we make functions which include them async
    const getPosts = async () =>{
        const data = await getDocs(postsRef);
        setpostlists(data.docs.map(
            (doc)=>(
                {...doc.data(),id: doc.id}
            )
        ));
    }

    useEffect(()=>{
        getPosts();
    },[]);//[] means run only once when mounted 

    //BEST WAY TO DISPLAY SUCH A TASK IS TO BRING ALL THE DATA AND PASS IT AS PROPS INTO A COMPONENT WHICH THEN DISPLAYS IT
    return (
      <div className='container'>
        {
        postlists?.map((post)=>(<Post post={post}/>))
        }
      </div>
    )
}

export default Main
