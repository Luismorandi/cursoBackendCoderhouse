

const PORT = 8080

let productsURL = `http://localhost:${PORT}/products`
let productsCartURL = `http://localhost:${PORT}/carts/cart-active`



const mostrarData=(data)=>{



    let body = ' '
    for(let i=0; i<data.length; i++){
        body += ` <div class="col-md-4 mb-5">
        <div class="thumbnail card h-100">
          <img src="${data[i].thumbnail}" alt="Product 2">
          <div class="card-body">
            <h4 class="card-title">${data[i].title}</h4>
            <p class="card-text">${data[i].value}</p>
            <p><a href="http://localhost:${PORT}/carts/${data[i]._id}" class="btn btn-primary">Comprar</a></p>
          </div>
        </div>
      </div>`

    }
    document.getElementById('products').innerHTML = body
    
}

const mostrarDataCart=(data)=>{
  let body = ' '
  for(let i=0; i<data.length; i++){
      body += `
      <div class="d-flex justify-content-between">
<div class="p-2">
<img
  src="${data[i].thumbnail}"
  alt="Product Image"
/>
</div>
<div class="p-2">
<h6>${data[i].title}</h6>
<p>${data[i].value}</p>

</div>


</div>
<hr />
`

  }
  document.getElementById('cartHome').innerHTML = body
 
}


const mostrarValueOfCart=(data)=>{



  let body = ` Total: ${data}`

  document.getElementById('totalOfCart').innerHTML = body
  
}

fetch(productsURL)
.then(response => response.json())
.then(data => mostrarData(data.products))
.catch(err =>console.log(err))

fetch(productsCartURL)
.then(response => response.json())
.then(data => mostrarDataCart(data[0].products))
.catch(err =>console.log(err))


fetch(productsCartURL)
.then(response => response.json())
.then(data => mostrarValueOfCart(data[0].total))
.catch(err =>console.log(err))