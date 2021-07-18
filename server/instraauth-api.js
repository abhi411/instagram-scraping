const Instagram = require('instagram-web-api')
const config = require("./instra-config.json")
var client;
console.log("file called", client)
exports.loginInstra =async function () {
  const  username =  config.username
  const password = config.password
  client = new Instagram({ username, password },{proxy:config.proxy })
  await client.login() 
  console.log("the function called",client)
}

exports.getClient = function() {
  return client
}


