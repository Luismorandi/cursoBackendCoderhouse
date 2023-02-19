

const PORT = 8080

let productsURL = `http://localhost:${PORT}/products`
let productsCartURL = `http://localhost:${PORT}/carts/cart-active`



const mostrarData=(data)=>{



    let body = ' '
    for(let i=0; i<data.length; i++){
        body += ` <div class="col-md-4">
        <div class="thumbnail">
          <img src="${data[i].thumbnail}" alt="Product 2">
          <div class="caption">
            <h4>${data[i].title}</h4>
            <p>${data[i].value}</p>
            <p><a href="http://localhost:${PORT}/carts/${data[i]._id}" " class="btn btn-primary">Comprar</a></p>
          </div>
        </div>
      </div>`

    }
    document.getElementById('products').innerHTML = body
    
}

const mostrarDataCart=(data)=>{
  console.log(data)
  let body = ' '
  for(let i=0; i<data.length; i++){
      body += `
  <tr>
    <td class="text-center">
      ${data[i].title}
    </td>
    <td class="text-center">
    ${data[i].value}
    </td>
    <td class="text-center">
      <img src="${data[i].thumbnail}" height="25" />
    </td>
  </tr>
`

  }
  document.getElementById('cart').innerHTML = body
 
}
fetch(productsURL)
.then(response => response.json())
.then(data => mostrarData(data.products))
.catch(err =>console.log(err))

fetch(productsCartURL)
.then(response => response.json())
.then(data => mostrarDataCart(data[0].products))
.catch(err =>console.log(err))
