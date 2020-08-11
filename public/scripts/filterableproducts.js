const search = document.getElementById("search");
const productContainer = document.querySelector(".match-list");
const matchUl = document.querySelector(".ul");
const productMain = document.querySelector(".product");
const productsQuery = document.querySelector("#productsgohere");

console.log({ productsQuery });
productsQuery.style.background = "#f00";
const productsArr = [
    { id: "kajsdkla", first: "jsdklad", second: "dsada", handle: "dadasd" },
];

search.addEventListener("input", async (e) => {
    console.log("yes");
    console.log(search.value);
    fetch(
        "http://localhost:3000/orders/search" +
            "?" +
            new URLSearchParams({
                name: `${search.value}`,
            })
    )
        .then((res) => res.json())
        .then((data) => {
            if (search.value == "" || null) {
                matchUl.innerHTML = "";
            } else {
                data.products.forEach((product, index) => {
                    let html = "";
                    html = ` 
                    <li><a class="product" onclick="productshow(${product})">${product.product_name}</a></li> `;

                    matchUl.innerHTML += html;
                });
            }
        });
});

/**
 * Pass the objects to this function and it will add
 * the data to the table
 * @param {object} arr
 */
function addProducts(arr) {
    const trElement = document.createElement("tr");

    const tdElement1 = document.createElement("td");
    const tdElement2 = document.createElement("td");
    const tdElement3 = document.createElement("td");
    const tdElement4 = document.createElement("td");

    console.log(arr.id);

    tdElement1.innerText = arr.id;
    tdElement2.innerText = arr.first;
    tdElement3.innerText = arr.second;
    tdElement4.innerText = arr.handle;

    trElement.appendChild(tdElement1);
    trElement.appendChild(tdElement2);
    trElement.appendChild(tdElement3);
    trElement.appendChild(tdElement4);

    productsQuery.appendChild(trElement);
}

function productshow(product) {
    console.log(product);
}

addProducts(productsArr[0]);
