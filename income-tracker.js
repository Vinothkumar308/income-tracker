const button = document.getElementById("btn")
const amount = document.getElementById("amount")
const describtion = document.getElementById("describtion")
const con = document.getElementById("container")
const form = document.getElementById("frm")

const balance = document.getElementById("rupee1")
const income = document.getElementById("rupee2")
const expense = document.getElementById("buy1")
const ul = document.getElementById("ule")
const deletee = document.getElementById("x")


const localtrans = JSON.parse(localStorage.getItem("trans"))
let transaction =localStorage.getItem("trans")!==null?localtrans:[]


function remove(id){
   if(confirm("Are you sure to delete?")){
    transaction  = transaction.filter((data)=>data.id!=id)
    config()
    updatetrans()
   }
   else{
      return
   }
 
   
}

function addedvalue(){
   
   const added = transaction.map((cval)=>cval.money)
   const total = added.reduce((total,val)=>
      (total = total + val),0)
      balance.innerHTML = total.toFixed(2)
      
   
   const incomeval = added.filter(val=>val>0).reduce((acc,item)=>(
      acc+=item
   ),0)
   income.innerHTML = incomeval.toFixed(2)

   const expenseval = added.filter(val=>val<0).reduce((acc,val)=>(acc+=val),0)
   expense.innerHTML = Math.abs(expenseval).toFixed(2)
   
}



function loaded(transaction){

      const sign = transaction.money>0?"+":"-"
      const item = document.createElement("li")
      item.classList.add(transaction.money>0?"active":"non-active")
      item.classList.add("box")
      item.innerHTML = `<div>${transaction.Description}</div>
                        <div>${sign}${Math.abs(transaction.money)}</div>
                        <button id=x onclick="remove(${transaction.id})">x</button>`
    ul.appendChild(item)
}


function config(){
     ul.innerHTML=""
     transaction.forEach(loaded)
     addedvalue()
}

   
function addtrans(e){
      e.preventDefault()
      if(describtion.value.trim() == "" || amount.value.trim() == ""){
         alert("Please enter all details ")
      }
      else{
      const transactions ={id:Math.floor(Math.random()*10000),Description:describtion.value,money:parseInt(amount.value)}
      
      transaction.push(transactions)
      loaded(transactions)
      describtion.value=""
      amount.value=""
      addedvalue()
      updatetrans()
      }
   }


   form.addEventListener("submit",addtrans)
   window.addEventListener("load",function(){
      config()
   })
   
function updatetrans(){
   localStorage.setItem("trans",JSON.stringify(transaction))
}
