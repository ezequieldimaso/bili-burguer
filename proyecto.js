// const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.cuerpoFilas')
let carrito = []

// Clickbutton.forEach(btn => {
//   btn.addEventListener('click', addToCarritoItem)
  $(".button").click((e) => { addToCarritoItem(e) });

//   class Hamburguesas{
//     constructor(type, title, precio){
//       this.type= type;
//       this.title= title;
//       this.precio= precio;
      
//     }
//   }
//   class Bebidas{
//     constructor(type, title, precio){
//       this.type= type;
//       this.title= title;
//       this.precio= precio;
      
//     }
//   }
//   class Postres{
//     constructor(type, title, precio){
//       this.type= type;
//       this.title= title;
//       this.precio= price;
    
//   }
// }

//   let hamburguesas = [
//     {type:"hamburguesa", title:"sks", price:420},
//     {type:"hamburguesa", title:"sks", price:420},
//     {type:"hamburguesa", title:"sks", price:420}
//   ]
//   let bebidas = [
//     {type:"bebida", title:"pepsi", price:80,},
//     {type:"bebida", title:"pepsi", price:80,},
//     {type:"bebida", title:"pepsi", price:80}
//   ]
//   let postres = [
//     {type:"postre", title:"oreo", price:200},
//     {type:"postre", title:"oreo", price:200},
//     {type:"postre", title:"oreo", price:200}
//   ]



function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.card')
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img-top').src;
  
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  agregarItemCarrito(newItem)
}


function agregarItemCarrito(newItem){
    const alert = document.querySelector('.alert')
    setTimeout( function(){
        alert.classList.add('hide')
      }, 2000)
        alert.classList.remove('hide');


  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  
  carrito.push(newItem)
  
  renderizarCarrito()
} 


function renderizarCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row"></th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    // tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    $(".delete").on("click", removeItemCarrito)

    // tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    $(".input__elemento").on("change", sumaCantidad)
  })
  CarritoTotal()
}

function CarritoTotal(){
  
  let Total = 0;
  const itemCarritoTotal = document.querySelector('.itemCarritoTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  itemCarritoTotal.innerHTML = `Total $${Total}`
  
  addLocalStorage()


}

function removeItemCarrito(e){
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }
  const alert = document.querySelector('.remove');
  if (alert != null) {
  setTimeout( function(){
      alert.classList.add('remove')
    }, 500)
      alert.classList.remove('remove');
    
  }
  
  tr.remove()
  CarritoTotal()
}

// boton vaciar
// const vaciar = document.querySelector("#vaciar")
// vaciar.addEventListener("click", () =>{
  $("#vaciar").on("click", () =>{
  carrito = []
  renderizarCarrito()

})

function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
  
}

function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderizarCarrito()
  }
}


// let comprar = document.querySelector('.comprar');
// comprar.addEventListener("click", saludar);
// $(".comprar").on("click", saludar)
// function saludar () {
//   const alert = document.querySelector('.saludo')
//   if (alert != null) {
//   setTimeout( function(){
//       alert.classList.add('saludo')
//     }, 2000)
//       alert.classList.remove('saludo');
//   }   
// }

//DESAFIO ANIMACIONES

// $("document").ready(function () {
//   $("#comprar").click(function () {
//     $(".saludo").show(2000)
//   });
//   $(".finalizar").click(function() {
//     $(".saludo").hide(2000)
//   });
// })

$("h1").animate({
  height: "20px",
  
},
  "slow", function(){
})

$("h1").slideUp( 300 ).slideDown( 300 )

// desafio ajax

const mealUrl = "https://www.themealdb.com/api/json/v1/1/search.php?f=b";


const renderFood = (foods) => {
  const Food = $("#food");
  foods.meals.forEach(food => {
  Food.prepend(`
                    <div class="card" style="width: 18rem;">
                    <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h4 class="card-title">${food.strMeal}</h4>
                      <ul>
                        <li>Catergoria: ${food.strCategory}</li>
                        <li>Origen: ${food.strArea}</li>
                      </ul>
  `);
});
}


const getFood = () => {
  $.ajax({
    method: "GET",
    url: mealUrl ,
    success:(respuesta) => {
      console.log(respuesta);
      renderFood(respuesta);
    }
  });
}

$("#cartaFood").click(()=>{
  getFood();
})

// modo dark
$(".checkbox").click(function(){
  if($("input.checkbox").is(":checked")){
    $(".theme").attr("href", "darkMode.css");
  }else{
    $(".theme").attr("href","lightMode.css");
  }
});

//alertas carrito
  $("#comprar").click(function () {
    if(carrito.length > 0) {
      $("#exampleModal").show(2000) 
  }else{
    alert("vacio")
  }
});
//finalizar compra
  $(".finalizar").click(function() {
    $(".saludo").hide(2000)
  });
  //boton cerrar
  $(".cerrar").click(function () {
    carrito = []
    renderizarCarrito()
  })

