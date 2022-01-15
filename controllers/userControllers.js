const express= require ("express")
const utils=require('../utils/utils')
const usersData=require('../json/data.json')
// const { json } = require("body-parser");
const { redirect } = require("express/lib/response");
// const { path } = require("express/lib/application");
const app = express();
const path='./json/data.json';


const findUser=(id)=>{
return usersData.find((user)=> user.id===+id)
}
const findUserIndex=(id)=>{
    return usersData.findIndex((user)=>user.id===+id)
}


const transfer=(myIndexId, targetIndexId, amount)=>{
    let cash= usersData[myIndexId].cash;
    let credit=usersData[myIndexId].credit
    if(cash+credit<amount){
        return false
    } 
    if(cash>=amount){
        usersData[myIndexId].cash-amount
    }
    if(cash<amount){
        amount= usersData[myIndexId].cash
        usersData[myIndexId].cash=0
    }
    if(amount>0){
        usersData[myIndexId].credit-amount
    }
    return true
}

///
const depositOrWithdraw=(id, targetId, amount, num, active)=>{
let userIndex=findUserIndex(id)
let targetUserIndex=findUserIndex(id)
if(userIndex){
    if(targetId){
        if(!targetUserIndex){
            return false
        }
        return transfer(userIndex, targetIndex, amount)
    }

else{
    if(num===-1 && usersData[userIndex][active]<amount){
        return false
    }
    usersData[userIndex][active]+=amount
    return true
}
}
return false
}



const depositAndWithdraw=(id,targetId,amount,num, active)=>{
let userIndex= findUserIndex(id)
let targetIndex= findUserIndex(id)
if(userIndex){
    if(targetId){
        if(!targetIndex){
            return false
        }
        return transfer(userIndex, targetIndex, amount)
    }
else{
    if(num===-1&&usersData[userIndex][active]<amount){
      return false  
    }
    usersData[userIndex][active]+=amount*num
    return true
}
}
    return false
}


const getUser=(req,res)=>{
    try{
        const {id}=req.params
        let user=findUser(id)
        if(user){
            res.send(user)
        }else{
            res.send('there is no such user')
        }

    }catch(err){
        res.send('404 error')
    }
}
const getAllUsers=(req,res)=>{
    res.send(utils.parserClients(path))
}

const addUser = (req, res) => {
    try{
      const{id}=req.body;
      // check if id is exiseted
      if(findUser(id)){
        res.send("this user is already exist");
      }
      else{
        usersData.push(req.body);
        utils.addClient(path,usersData);
      } 
      
    }catch(err){
      res.send("404 Error")
    }
   
  
    res.send("ok");
  };

const updateuser=(req,res)=>{
    const {id}=req.params
    const {targetId, amount, transactions}=req.body
    console.log(req.body)
    try{
        let check=null;
        if(transactions==="deposit"){
            check=depositAndWithdraw(id,null,amount,1,"cash" )
        }
        else if(transactions==="withdraw"){
            check=depositAndWithdraw(id,null,amount,-1,"cash" )
        }
        else if(transactions==="updateCredit"){
            check=depositAndWithdraw(id,null,amount,1,"credit" )
        }
        else if(transactions==="transfer"){
            check=depositAndWithdraw(id,targetId,amount,1,"" )
        }
        if(!check&&transactions==='transfer'){
            res.send('you dont have enough money to transfer')
        }
        if(!check){
            res.send('user does not exist')
        }
        utils.addClient(path, usersData)

    }catch(err){
        res.send('404 error')
    }
    res.send('data has been change')
    }

const deleteUser=(req,res)=>{
    const {id}=req.params;
    let index=findUserIndex(id)
    if(!index){
        res.send('user is not exist')
     }   
        
        usersData.splice(index, 1)
        utils.addClient(path, usersData)
        res.send('user has been deleted')
    
}

module.exports={
    addUser,getUser, getAllUsers, deleteUser, updateuser, transfer
}