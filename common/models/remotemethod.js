'use strict';

module.exports = function(Remotemethod) {
         
  Remotemethod.getFollowers = async function(data,cb) {
      const Instagram = require('instagram-web-api')
      const  username =  "rockingyash7"
      const password = "Test@123"
      const client = new Instagram({ username, password })
      ;(async () => {
        await client.login()
        const me = await client.getUserByUsername({ username: data.username})
        console.log("me",me)
         var usr = await Remotemethod.app.models.Request.create({"createdAt": new Date(), "username": data.username, "status":"In Progress","follower": me.edge_followed_by.count,"userId":data.userId})
        var followers = await client.getFollowers({ userId: me.id, first:100 })
        console.log("followers",followers)
        await getCount(followers.data,usr.id, client)
        return {
          status:true,
          statusCode:200
        }

      })()
    }

    function addfollow(followers,count, username) {
     return new Promise(async function(resolve,reject){
        if(followers && followers.length < 10) {
          let obj = {
            'username':username,
            'followers':count
          }
          followers.push(obj)
          followers = await followers.sort((a, b) => b.followers - a.followers);
         }
         else {
           if(count > followers[9].followers) {
             followers.pop()
             let obj = {
              'username':username,
              'followers':count
            }
            followers.push(obj)
            followers = await followers.sort((a, b) => b.followers - a.followers);
             resolve(followers)
           }
         }
      })
    }
   async function getCount(followers,id , client) {
     console.log("followers",followers.length)
     var allPe = []
      for(let i=0;i< followers.length; i ++) {
        console.log("loop inside")
        const temp = await client.getUserByUsername({ username: followers[i].username})
        var follow = temp.edge_followed_by.count
        console.log("follow",follow,allPe)
        addfollow(allPe,follow,followers[i].username)
        if( i == followers.length - 1) {
         let upuser = await Remotemethod.app.models.Request.updateAll({'id':id},{'updatedAt':new Date(),'status':'Followers Found' ,'followersData':allPe});
        }
      }
    }
    Remotemethod.remoteMethod("getFollowers",{
      description:"to get the followers",
      accepts: { arg: "data", type: "object", required: true , http: { source:"body" }},
      returns: {arg : "response", type: "object" , root: true, http: {source :"body" }}
    })
};
