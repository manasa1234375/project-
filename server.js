const express = require("express");
const app = express();
app.use(express.json());

/* MEMORY DATABASE */

let orders = [];
let adminNotifications = [];

/* FRONTEND */

app.get("/", (req,res)=>{
res.send(`

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Home Food</title>

<style>

*{margin:0;padding:0;box-sizing:border-box;font-family:Arial}
body{background:#f4f4f4}

/* LOGIN */

.login{
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:linear-gradient(135deg,#ff512f,#dd2476);
}

.box{
background:#fff;
padding:40px;
border-radius:12px;
width:320px;
text-align:center;
}

.box input{
width:100%;
padding:10px;
margin:10px 0;
}

/* NAV */

.nav{
background:#ff3c00;
color:#fff;
display:flex;
justify-content:space-between;
padding:15px 40px;
align-items:center;
}

.links span{
margin-right:15px;
cursor:pointer;
}

/* HERO */

.hero{
height:60vh;
display:flex;
align-items:center;
justify-content:center;
text-align:center;
color:#fff;
background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)),
url("https://images.unsplash.com/photo-1504674900247-0877df9cc836") center/cover;
}

.hero h1{
font-size:48px;
margin-bottom:10px;
}

/* CARDS */

.section{padding:40px;text-align:center}

.cards{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:20px;
max-width:1100px;
margin:auto;
}

.card{
background:#fff;
border-radius:10px;
overflow:hidden;
box-shadow:0 4px 12px rgba(0,0,0,.2);
cursor:pointer;
transition:.3s;
}

.card:hover{transform:scale(1.05)}

.card img{
width:100%;
height:150px;
object-fit:cover;
}

.card h3{padding:10px}

/* BUTTON */

.btn{
background:#ff3c00;
color:#fff;
border:none;
padding:8px 15px;
cursor:pointer;
margin-top:5px;
}

/* MENU */

#menu{
background:#fff;
max-width:600px;
margin:auto;
padding:20px;
border-radius:10px;
box-shadow:0 4px 10px rgba(0,0,0,.2);
}

/* CART */

.cart{
background:#fff;
padding:20px;
max-width:600px;
margin:20px auto;
border-radius:10px;
}

/* CONTACT */

.contact{
background:#222;
color:#fff;
padding:40px;
text-align:center;
}

.contact a{
color:#ff3c00;
text-decoration:none;
margin:0 10px;
}

.admin{
position:fixed;
bottom:20px;
right:20px;
background:#000;
color:#fff;
padding:15px;
border-radius:10px;
font-size:14px;
}

</style>
</head>

<body>

<!-- LOGIN -->

<div class="login" id="login">

<div class="box">
<h2> Home Food</h2>
<input id="email" placeholder="Email">
<input id="pass" placeholder="Password (6 chars)">
<button class="btn" onclick="loginUser()">Login</button>
</div>

</div>

<!-- APP -->

<div id="app" style="display:none">

<div class="nav">

<h2>Home Food</h2>

<div class="links">
<span>Home</span>
<span>About</span>
<span>Menu</span>
</div>

</div>

<section class="hero">
<div>
<h1>Hungry in Hostel? 🍔</h1>
<p>Delicious food delivered to your college gate</p>
</div>
</section>

<section class="section">

<h2>Restaurants</h2>

<div class="cards" id="restaurants"></div>

</section>

<section class="section">
<div id="menu"></div>
</section>

<div class="cart">

<h2>Cart</h2>

<div id="cart"></div>

<h3 id="total"></h3>

<h3>Payment</h3>

<select id="payment">
<option>UPI</option>
<option>COD</option>
</select>

<br><br>

<button class="btn" onclick="placeOrder()">Place Order</button>

</div>

<section class="section">

<h2>Orders</h2>

<div id="orders"></div>

</section>

</div>

<!-- CONTACT -->

<section class="contact">

<h2>Contact Us</h2>

<p>Email: Homefood@gmail.com</p>
<p>Phone: +91 9000000000</p>
<p>Address: College Road, Andhra Pradesh, India</p>

<br>

<h3>Follow Us</h3>

<a href="#">Instagram</a>
<a href="#">Facebook</a>
<a href="#">Twitter</a>

</section>

<div class="admin" id="adminBox">
Admin Notifications
</div>

<script>

/* LOGIN */

function loginUser(){

let p = document.getElementById("pass").value

if(p.length < 6){
alert("Password must be at least 6 characters")
return
}

login.style.display="none"
app.style.display="block"

}

/* RESTAURANTS */

let restaurants=[

{
name:"Tiffin Center",
img:"https://www.sitaculturalcenter.com/wp-content/uploads/2021/11/Tiffins-at-lakshmi-Sitaculturalcenter.jpg",
menu:[
{name:"Idli",price:40},
{name:"Dosa",price:60},
{name:"Poori",price:70},
{name:"Vada",price:50},
{name:"Upma perasaattu",price:85},
{name:"special dosas",price :120}

]
},

{
name:"Pure Non Veg",
img:"https://img.freepik.com/premium-photo/assorted-indian-non-vegetarian-food-recipe-served-group-includes-chicken-curry-mutton-masala-anda-egg-curry-butter-chicken-biryani-tandoori-murg-chicken-tikka-naa-roti-ramadan_466689-40931.jpg?w=1380",
menu:[
{name:"Chicken Biryani",price:180},
{name:"Mutton Biryani",price:220},
{name:"Chicken Fry",price:160},
{name:"Mutton Curry",price:200},
{name:"Egg Curry",price:120},
{name:"Chicken 65",price:150}
]
},

{
name:"South Indian Thali",
img:"https://tse2.mm.bing.net/th/id/OIP.CMiJRC_8-hwbXo5E2accXgHaEK?pid=Api&P=0&h=180",
menu:[
{name:"Andhra Meals",price:120},
{name:"Mini Meals",price:90},
{name:"Curd Rice",price:60},
{name:"pure veg meals",price:200},
{name:"pure non veg meals",price:350},
{name:"special meals",price:400}
]
},

{
name:"Fast Food Center",
img:"https://images.unsplash.com/photo-1550547660-d9450f859349",
menu:[
{name:"spicy chicken noodles",price:150}, 
{name:"special fried rice",price:180},
{name:"Burger",price:120},
{name:"Fries",price:80},
{name:"Chicken Wrap",price:140},
{name:"Veg Wrap",price:100},
]
},

{
name:"Pizza Corner",
img:"https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_1280.jpg",
menu:[
{name:"Margherita pizza",price:150},
{name:"Pepperoni pizza",price:180},
{name:"Veg Supreme pizza ",price:200},
{name:"Chicken Tikka pizza",price:220},
{name:"BBQ Chicken pizza",price:250},
{name:"Hawaiian pizza",price:190}
]
},

{
name:"bakery and cakes",
img:"https://tse3.mm.bing.net/th/id/OIP.1sEtb9W_At1bgG1yV2hQHgHaDU?pid=Api&P=0&h=180",
menu:[
{name:"Chocolate Cake",price:400},
{name:"Vanilla Cake",price:350},
{name:"Red Velvet Cake",price:450},
{name:"Black Forest Cake",price:500},
{name:"Pineapple Cake",price:300},
{name:"Cupcakes",price:250},
{name:"all types of sweets and bakery items",  price:100}
]
},

{
name:"Ice Creams",
img:"https://tse3.mm.bing.net/th/id/OIP.Ccypa9CgmieDgTYjNQjEdgHaEo?pid=Api&P=0&h=180",
menu:[
{name:"Chocolate",price:90},
{name:"Vanilla",price:70},
{name:"Sundae",price:120},
{name:"Cone",price:50},
{name:"Strawberry",price:80},
{name:"Mango",price:85}
]
}


]

let cart=[]

/* LOAD RESTAURANTS */

function loadRestaurants(){

restaurantsDiv.innerHTML=""

restaurants.forEach((r,i)=>{

restaurantsDiv.innerHTML+=
\`<div class="card" onclick="openMenu(\${i})">
<img src="\${r.img}">
<h3>\${r.name}</h3>
</div>\`

})

}

const restaurantsDiv=document.getElementById("restaurants")

loadRestaurants()

/* MENU */

function openMenu(i){

let r=restaurants[i]

let html="<h2>"+r.name+" Menu</h2>"

r.menu.forEach(m=>{

html+=\`<p>\${m.name} ₹\${m.price}
<button onclick="addCart('\${m.name}',\${m.price})">Add</button></p>\`

})

menu.innerHTML=html

}

/* CART */

function addCart(n,p){

cart.push({n,p})
renderCart()

}

function renderCart(){

let t=0

cartDiv.innerHTML=""

cart.forEach(i=>{
t+=i.p
cartDiv.innerHTML+="<p>"+i.n+" ₹"+i.p+"</p>"
})

total.innerText="Total ₹"+t

}

const cartDiv=document.getElementById("cart")

/* PLACE ORDER */

function placeOrder(){

if(cart.length==0) return

fetch("/order",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
items:cart,
payment:payment.value
})

})

.then(r=>r.json())
.then(data=>{

cart=[]
renderCart()
loadOrders()

})

}

/* LOAD ORDERS */

function loadOrders(){

fetch("/orders")

.then(r=>r.json())

.then(data=>{

ordersDiv.innerHTML=""

data.forEach(o=>{

ordersDiv.innerHTML+=
"<p>Order "+o.id+" - "+o.status+" ("+o.payment+")</p>"

})

})

}

const ordersDiv=document.getElementById("orders")

loadOrders()

/* ADMIN NOTIFICATIONS */

function loadAdmin(){

fetch("/admin")

.then(r=>r.json())

.then(data=>{

adminBox.innerHTML="<b>Admin Notifications</b><br>"

data.forEach(n=>{
adminBox.innerHTML+=n+"<br>"
})

})

}

setInterval(loadAdmin,2000)

</script>

</body>
</html>

`)
})

/* BACKEND */

app.post("/order",(req,res)=>{

let order={
id:orders.length+1,
items:req.body.items,
payment:req.body.payment,
status:"Preparing"
}

orders.push(order)

adminNotifications.push("New Order #"+order.id)

setTimeout(()=>order.status="Cooking",4000)
setTimeout(()=>order.status="Out for delivery",8000)
setTimeout(()=>order.status="Delivered",12000)

res.json(order)

})

app.get("/orders",(req,res)=>{
res.json(orders)
})

app.get("/admin",(req,res)=>{
res.json(adminNotifications)
})

app.listen(3500,()=>{
console.log("Server running http://localhost:3500")
})