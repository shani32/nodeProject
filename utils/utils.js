const fs = require("fs");

const parserClients = (path) => {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
};
// const parserClients=(path)=>{
//     return JSON.parse(fs.readFileSync(path, "utf-8"))
// }
const addClient= (path, data)=>{
     console.log(data);
    fs.writeFileSync(path, JSON.stringify(data))
}


module.exports = {parserClients,addClient};

