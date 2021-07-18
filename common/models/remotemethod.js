'use strict';

 const instra = require("../../server/instraauth-api");
 var counter = 1 ;
 module.exports = function(Remotemethod) {
         
  Remotemethod.getFollowers = async function(data,cb) {
      const Instagram = require('instagram-web-api')
      // const  username =  "umangmehta41"
      // const password = "Dev@123"
      // const client = new Instagram({ username, password },{proxy: 'http://sp43962951:test1234@us.smartproxy.com:10001'})
      const client = instra.getClient();
      console.log("called",client)
      ;(async () => {
        // await client.login() 
        await checkRequestCount()
        const me = await client.getUserByUsername({ username: data.username})
        counter ++
        console.log("me",me)
         var usr = await Remotemethod.app.models.Request.create({"createdAt": new Date(), "username": data.username, "status":"In Progress","follower": me.edge_followed_by.count,"userId":data.userId})
          loopFollower(me.edge_followed_by.count,usr.id,me.id,client);
          return(null, {status:200, message:"found"})

      })()
    }

  async function loopFollower(totalFollow, userId, meId, client) {
    let followData = [], hitCount = 0;
    await checkRequestCount()
    var followers = await client.getFollowers({ userId: meId})
    counter ++
    followData= [...followData, ...followers.data]

    let nextPage = followers.page_info.has_next_page
    //true if you have an other page of followers
    let cursor = followers.page_info.end_cursor
    //next page of follower
    //loop to navigate into all the pages of followers
    while(nextPage) {
      console.log("nextpage",nextPage,meId,cursor)
      await checkRequestCount()
      followers = await client.getFollowers({ userId: meId, first: 50, after: cursor}) 
      counter++
      console.log("followers",followers)
      nextPage = followers.page_info.has_next_page
      cursor = followers.page_info.end_cursor
      followData= [...followData, ...followers.data]
      hitCount++;
      console.log("followers",hitCount,followers.data[0],followers.data.length,followData.length,meId,userId,totalFollow,counter,"counter")
    }
    console.log("nnnnn")
    await getCount(followData,userId,client) 
    
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
   async function getCount(followers,id,client) {
     console.log("followers",followers.length)
     var allPe = []
      for(let i=0;i< followers.length; i ++) {
        console.log("loop inside",counter)
        await checkRequestCount()
        const temp = await client.getUserByUsername({ username: followers[i].username})
        counter++
        var follow = temp.edge_followed_by.count
        console.log("follow",follow,allPe)
        addfollow(allPe,follow,followers[i].username)
        if( i == followers.length - 1) {
         let upuser = await Remotemethod.app.models.Request.updateAll({'id':id},{'updatedAt':new Date(),'status':'Followers Found' ,'followersData':allPe});
        }
      }
    }
    const timer = ms => new Promise(res => setTimeout(res, ms))
   async function checkRequestCount() {
      if(counter >= 150) {
         await timer(4000 * 60);
        console.log("start time", new Date())
      
        counter = 0 
        console.log("end time", new Date())
      }
    }
    Remotemethod.remoteMethod("getFollowers",{
      description:"to get the followers",
      accepts: { arg: "data", type: "object", required: true , http: { source:"body" }},
      returns: {arg : "response", type: "object" , root: true, http: {source :"body" }}
    })
};
