const express = require("express");
const app = express();
app.use(express.json());

/* ===== MEMORY DB ===== */
let orders = [];
let adminNotifications = [];

/* ===== FRONTEND ===== */
app.get("/", (req, res) => {
res.send(`

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Home Food</title>

<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Arial}
body{background:#f4f4f4}

/* login */
.login{height:100vh;display:flex;justify-content:center;align-items:center;
background:linear-gradient(135deg,#ff512f,#dd2476)}
.box{background:#fff;padding:35px;border-radius:10px;width:300px;text-align:center}
.box input{width:100%;padding:10px;margin:10px 0}

/* nav */
.nav{background:#ff3c00;color:#fff;display:flex;justify-content:space-between;
padding:15px 30px}
.links span{margin-right:15px;cursor:pointer}

/* hero */
.hero{height:55vh;display:flex;align-items:center;justify-content:center;
color:#fff;text-align:center;
background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)),
url("https://images.unsplash.com/photo-1504674900247-0877df9cc836") center/cover}
.hero h1{font-size:42px}

/* cards */
.section{padding:40px;text-align:center}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:20px;max-width:1000px;margin:auto}
.card{background:#fff;border-radius:10px;overflow:hidden;
box-shadow:0 4px 10px rgba(0,0,0,.2);cursor:pointer;transition:.3s}
.card:hover{transform:scale(1.05)}
.card img{width:100%;height:150px;object-fit:cover}
.card h3{padding:10px}

.btn{background:#ff3c00;color:#fff;border:none;padding:8px 14px;cursor:pointer}

#menu,.cart{background:#fff;max-width:600px;margin:20px auto;padding:20px;
border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,.2)}

.contact{background:#222;color:#fff;padding:35px;text-align:center}

.admin{position:fixed;bottom:15px;right:15px;background:#000;color:#fff;
padding:12px;border-radius:8px;font-size:13px}
</style>
</head>
+
<body>

<!-- LOGIN -->
<div class="login" id="login">
<div class="box">
<h2>Home Food</h2>
<input id="email" placeholder="Email">
<input id="pass" placeholder="Password (min 6)">
<button class="btn" onclick="loginUser()">Login</button>
</div>
</div>

<!-- APP -->
<div id="app" style="display:none">

<div class="nav">
<h2>Home Food</h2>
<div class="links">
<span>Home</span><span>About</span><span>Menu</span>
</div>
</div>

<section class="hero">
<div>
<h1>Hungry in Hostel? 🍔</h1>
<p>Food delivered to your college gate</p>
</div>
</section>

<section class="section">
<h2>Restaurants</h2>
<div class="cards" id="restaurants"></div>
</section>

<section class="section"><div id="menu"></div></section>

<div class="cart">
<h2>Cart</h2>
<div id="cart"></div>
<h3 id="total"></h3>

<h3>Payment</h3>
<select id="payment">
<option>UPI</option>
<option>COD</option>
</select><br><br>

<button class="btn" onclick="placeOrder()">Place Order</button>
</div>

<section class="section">
<h2>Orders</h2>
<div id="orders"></div>
</section>

</div>

<section class="contact">
<h2>Contact Us</h2>
<p>Email: Homefood@gmail.com</p>
<p>Phone: +91 9000000000</p>
<p>Address: College Road, Andhra Pradesh</p>
</section>

<div class="admin" id="adminBox">Admin Notifications</div>

<script>

/* ===== LOGIN ===== */
function loginUser(){
let p=document.getElementById("pass").value;
if(p.length<6){alert("Password must be at least 6 characters");return;}
login.style.display="none";
app.style.display="block";
}

/* ===== DATA ===== */
let restaurants=[
{
name:"Tiffin Center",
img:"https://www.sitaculturalcenter.com/wp-content/uploads/2021/11/Tiffins-at-lakshmi-Sitaculturalcenter.jpg",
menu:[
{name:"Idli",price:40},
{name:"Dosa",price:60},
{name:"Poori",price:70},
{name:"Vada",price:50}
]
},
{
name:"Pure Non Veg",
img:"https://img.freepik.com/premium-photo/assorted-indian-non-vegetarian-food-recipe-served-group-includes-chicken-curry-mutton-masala-anda-egg-curry-butter-chicken-biryani-tandoori-murg-chicken-tikka-naa-roti-ramadan_466689-40931.jpg?w=1380",
menu:[
{name:"Chicken Biryani",price:180},
{name:"Mutton Biryani",price:220},
{name:"Chicken 65",price:150}
]
},
{
name:"Pizza Corner",
img:"https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_1280.jpg",
menu:[
{name:"Margherita Pizza",price:150},
{name:"Veg Supreme",price:200},
{name:"Chicken Tikka Pizza",price:220}
]
}
];

let cart=[];

/* ===== LOAD RESTAURANTS ===== */
const restaurantsDiv=document.getElementById("restaurants");
function loadRestaurants(){
restaurantsDiv.innerHTML="";
restaurants.forEach((r,i)=>{
restaurantsDiv.innerHTML+=
\`<div class="card" onclick="openMenu(\${i})">
<img src="\${r.img}"><h3>\${r.name}</h3></div>\`;
});
}
loadRestaurants();

/* ===== MENU ===== */
function openMenu(i){
let r=restaurants[i];
let html="<h2>"+r.name+" Menu</h2>";
r.menu.forEach(m=>{
html+=\`<p>\${m.name} ₹\${m.price}
<button onclick="addCart('\${m.name}',\${m.price})">Add</button></p>\`;
});
menu.innerHTML=html;
}

/* ===== CART ===== */
const cartDiv=document.getElementById("cart");
function addCart(n,p){cart.push({n,p});renderCart();}
function renderCart(){
let t=0; cartDiv.innerHTML="";
cart.forEach(i=>{t+=i.p; cartDiv.innerHTML+="<p>"+i.n+" ₹"+i.p+"</p>";});
total.innerText="Total ₹"+t;
}

/* ===== ORDER ===== */
function placeOrder(){
if(!cart.length) return;
fetch("/order",{method:"POST",headers:{"Content-Type":"application/json"},
body:JSON.stringify({items:cart,payment:payment.value})})
.then(r=>r.json()).then(()=>{cart=[];renderCart();loadOrders();});
}

/* ===== LOAD ORDERS ===== */
const ordersDiv=document.getElementById("orders");
function loadOrders(){
fetch("/orders").then(r=>r.json()).then(data=>{
ordersDiv.innerHTML="";
data.forEach(o=>{
ordersDiv.innerHTML+="<p>Order "+o.id+" - "+o.status+" ("+o.payment+")</p>";
});
});
}
loadOrders();

/* ===== ADMIN ===== */
function loadAdmin(){
fetch("/admin").then(r=>r.json()).then(data=>{
adminBox.innerHTML="<b>Admin Notifications</b><br>";
data.forEach(n=>adminBox.innerHTML+=n+"<br>");
});
}
setInterval(loadAdmin,2000);

</script>
</body>
</html>

`);
});

/* ===== BACKEND ===== */
app.post("/order",(req,res)=>{
let order={
id:orders.length+1,
items:req.body.items,
payment:req.body.payment,
status:"Preparing"
};
orders.push(order);
adminNotifications.push("New Order #"+order.id);

setTimeout(()=>order.status="Cooking",4000);
setTimeout(()=>order.status="Out for delivery",8000);
setTimeout(()=>order.status="Delivered",12000);

res.json(order);
});

app.get("/orders",(req,res)=>res.json(orders));
app.get("/admin",(req,res)=>res.json(adminNotifications));

app.listen(3500,()=>console.log("Server running http://localhost:3500"));