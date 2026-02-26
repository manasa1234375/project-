function startApp(){
welcome.style.display="none"
login.style.display="flex"
}

function loginUser(){
let email = document.getElementById("email").value
let p = pass.value

let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!emailPattern.test(email)){
alert("Enter valid email address")
return
}

if(p.length<6){
alert("Password must be at least 6 characters")
return
}

login.style.display="none"
app.style.display="block"
}

let restaurants=[
{name:"Tiffin Center",type:"veg",img:"https://tse2.mm.bing.net/th/id/OIP.7vmsjf6t0WNu18iVTPOAOwHaE8",
menu:[{name:"Idly",price:40},{name:"Dosa",price:60}]},

{name:"Pizza Corner",type:"veg",img:"https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_1280.jpg",
menu:[{name:"Margherita Pizza",price:180},{name:"Farmhouse Pizza",price:220}]}
]

let cart=JSON.parse(localStorage.getItem("cart")) || []
let orders=JSON.parse(localStorage.getItem("orders")) || []
let history=JSON.parse(localStorage.getItem("history")) || []

function saveData(){
localStorage.setItem("cart",JSON.stringify(cart))
localStorage.setItem("orders",JSON.stringify(orders))
localStorage.setItem("history",JSON.stringify(history))
}

const restaurantsDiv=document.getElementById("restaurants")

function loadRestaurants(list=restaurants){
restaurantsDiv.innerHTML=""
list.forEach((r,i)=>{
restaurantsDiv.innerHTML+=`<div class="card" onclick="openMenu(${i})">
<img src="${r.img}">
<h3>${r.name}</h3>
</div>`
})
}

loadRestaurants()

function openMenu(i){
let r=restaurants[i]
let h=`<h2>${r.name} Menu</h2>`
r.menu.forEach(m=>{
h+=`<p>${m.name} - ₹${m.price}
<button onclick="addCart('${m.name}',${m.price})">Add</button>
</p>`
})
menu.innerHTML=h
}

function addCart(n,p){
cart.push({n,p})
saveData()
renderCart()
}

const cartDiv=document.getElementById("cart")

function renderCart(){
let t=0
cartDiv.innerHTML=""

cart.forEach(i=>{
t+=i.p
cartDiv.innerHTML+=`<p>${i.n} ₹${i.p}</p>`
})

total.innerText="Total ₹"+t
}

renderCart()