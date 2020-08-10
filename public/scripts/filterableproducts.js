const search = document.getElementById('search');
const productContainer = document.querySelector('.match-list')
const matchUl = document.querySelector('.ul');
const productMain = document.querySelector('.product');
search.addEventListener('input' , async (e) => {
    console.log('yes');
    console.log(search.value)
     fetch('http://localhost:3000/orders/search' + '?' + new URLSearchParams({
         name:`${search.value}`
     }))  
     .then(res => res.json())
     .then(data => {
         if (search.value == '' || null) {
             matchUl.innerHTML = ''
         } else {
            data.products.forEach((product , index )  => {
                let html = '';
                html = ` 
                    <li><a class="product" onclick="productshow(${product})">${product.product_name}</a></li> `
                
                matchUl.innerHTML += html ;
                 
             })
         }
      
     })
      
});

function productshow ( product ) {
    console.log(product);
}