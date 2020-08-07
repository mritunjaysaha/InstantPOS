const search = document.getElementById('search');
search.addEventListener('input' , async (e) => {
    console.log('yes');
     fetch('http://localhost:3000/orders/search' , {
         method:'GET'
     })
     .then(res => res.json())
     .then(data => console.log(data))
      
});