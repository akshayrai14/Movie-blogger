import './Post.css'
import React, { useEffect, useState } from 'react'
import { db,auth } from '../../config/firebase';
import { addDoc, collection ,getDocs,query, where ,deleteDoc ,doc} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
// interface  Props{
//     post : Post
// } needed for TYPESCRIPT
function Post(props) {
    const [likenumber,setlikenumber] = useState([]);
    const [user] = useAuthState(auth);
    const { post } = props;
    const likesRef = collection(db,"likes");
    //firebase query being written below
    const likesDoc = query(likesRef, where ("postId","==",post.id))
    //only want to get the doc with data where postId == post.id that is likes for a spcific post only
    const addLike= async ()=>{
        try{
            await addDoc(likesRef,{
            userId: user?.uid,
            postId: post.id,
            //posts we are mapping have id also passed as props 
            });
            if(user){
            setlikenumber((prev)=>prev ? [...prev,{userId : user?.uid}] : [{userId : user?.uid}]
            );}
        }
        catch(err){
            console.log(err);
        }
      };
      const removeLike = async ()=>{
        try{
            const likeTodeletequery= query(likesRef, where ("postId","==",post.id), where("userId","==",user?.uid) );
            const liketodeletedata = await getDocs(likeTodeletequery);//one element in this now 
            const liked = liketodeletedata.docs[0].id;
            const likeTodelete = doc(db,"likes",liked);//delete the only one
            await deleteDoc(likeTodelete)
            //call firebase function finally
            if(user){
                setlikenumber((prev)=>prev?.filter((like)=>like.id === liked));
            }
        }
        catch(err){
            console.log(err);
        }
      }
    const getLike= async ()=>{
        const data = await getDocs(likesDoc);
        setlikenumber(data.docs.map((doc)=>({userId : doc.data().userId})));
        //(data.docs.map((doc)=>({...doc.data(),id: doc.id})))
        //the above piece of code it re usable for mapping everytime
    }

    useEffect(()=>{
        getLike();
    },[]);

    const hasUserliked = likenumber?.find((like)=>like.userId===user?.uid);
  return (
    // <div className='above-postt'>
    // <div className='postt'>
    //   <div className='title'>{post.title}</div>
    //   <div className='body'>{post.description}</div>
    //   <div className='footer'>@{post.username}</div>
    //   <button onClick={hasUserliked ? removeLike : addLike} className='like-button'>{hasUserliked ? <>&#128078;</> : <>&#128077;</>}
    //   </button>
    //   <div className='likess'>
    //   {likenumber && <p>Likes : {likenumber.length}</p>}
    //   </div>
    // </div>
    // </div>
    // <div className="container">
        <div className="box">
            <div className="prof"></div>
            <h1 className="Username">@{post.username}</h1>
            <div className='ocns'>
            <div className="img"></div>
            <div className="bookmark">{likenumber && <p>Likes :{likenumber.length}</p>}
            </div>
            <button onClick={hasUserliked ? removeLike : addLike} class="like">{hasUserliked ? <>&#128078;</> : <>&#128077;</>}</button>
            </div>
            <div className="name">{post.title}</div>
            <p>{post.description}</p>
        </div>
    // </div>
  )
  }
//in firebase for read we only put a mandate of auth but for write we put a mandate of auth and id being same so one can only read but not write others

export default Post

/*
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <div className="container">
        <div className="box">
            <div className="prof"></div>
            <h1 className="Username">@{post.username}</h1>
            <button onClick={hasUserliked ? removeLike : addLike} class="like"><i class="fa fa-heart"></i></button>
            <div className="bookmark">{likenumber && <p>Likes : {likenumber.length}</p>}</div>
            <div className="img"></div>
            <div className="name">{post.title}</div>
            <p>{post.description}</p>
        </div>
    </div>
*/