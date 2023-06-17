import React from 'react'
import Createform from './Createform'
function Createpost() {
  return (
    <div>
      <Createform></Createform>
    </div>
  )
}
//in the production mode we cant submit the form on the firebase so we go to rules and make it true for all rather than false for all and only then our submit button works and puts the data on the database

//in the rule we want only verified users with a proper valid auth id then we can write 
// if request.auth != null && request.auth.uid == request.resource.data.userId; this can be done for write
// for read we don't need only our auth id to be verified , we can view anyone's blog so only request.auth != null
export default Createpost
