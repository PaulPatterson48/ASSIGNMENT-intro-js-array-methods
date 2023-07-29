import { card } from "../components/card.js";
import { tableRow } from "../components/table.js";
import { referenceList } from "../data/reference.js";
import { renderToDom } from "../utils/renderToDom.js";

// Reusable function to get the cards on the DOM
// .forEach()
//.includes look at a string or array and returns values (compare primitive values to see if it is included in either a string or array)
const renderCards = (array) => {
  let refStuff = ""; //<h1 class='text-white'>Cards Go Here!</h1>
  array.forEach((item) => { //foreach iterates through the array takes an item outside the array and allows us to manipulate it
  refStuff += card(item); //Will reassign the value and add the title every time we loop through
})

  renderToDom("#cards", refStuff);
}

// UPDATE/ADD ITEMS TO CART
// .findIndex() & (.includes() - string method)
const toggleCart = (event) => {
  if (event.target.id.includes("fav-btn")) { //
   const [, id] = event.target.id.split('--') //Use single quote when destructuring
   const index = referenceList.findIndex( i => i.id === Number(id))

   referenceList[index].inCart = !referenceList[index].inCart
   cartTotal();
   renderCards(referenceList);
  }
}

// SEARCH
// .filter()
const search = (event) => {
  const eventLC = event.target.value.toLowerCase();
  const searchResults = referenceList.filter(s => {
    s.title.toLowerCase().includes(eventLC) ||  //using the or which is a logical operator
    s.author.toLowerCase().includes(eventLC) ||  
    s.description.toLowerCase().includes(eventLC) 
  })
  renderCards(searchResults);
}

// BUTTON FILTER
// .filter() & .reduce() &.sort() - chaining
const buttonFilter = (event) => {
  if(event.target.id.includes('free')) {
    const free = referenceList.filter(item => item.price <= 0);  //!filter returns a new array of values based on a condition --
    renderCards(free);
  }
  if(event.target.id.includes('wishList')) {
    const wish = referenceList.filter(item => item.inCart) ;
    renderCards(wish);
    //console.log('wishList')
  }
  if(event.target.id.includes('books')) {
    const books = referenceList.filter(item => item.type.toLowerCase() === 'book');
    renderCards(books)
    //console.log('books!')
  }
  if(event.target.id.includes('clearFilter')) {
    renderCards(referenceList);
    //console.log('clearFilter')
  }
  if(event.target.id.includes('productList')) {
    let table = `<table class="table table-dark table-striped" style="width: 600px">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Type</th>
        <th scope="col">Price</th>
      </tr>
    </thead>
    <tbody>
    `;
    
    productList().forEach(item => {
      table += tableRow(item);
    });

    table += `</tbody></table>`

    renderToDom('#cards', table);
  }
  
}

// CALCULATE CART TOTAL
// .reduce() & .some()
const cartTotal = () => {
  const total = 0
  document.querySelector("#cartTotal").innerHTML = total.toFixed(2);
}

// RESHAPE DATA TO RENDER TO DOM
// .map() //applies the same logic to the array and creates a new array we determine what it returns
const productList = () => {
  return referenceList.map(item => ({
     title: item.title,
     price: item.price,
     type: item.type
    }))
  //[{ title: "SAMPLE TITLE", price: 45.00, type: "SAMPLE TYPE" }]
}


const startApp = () => {
  // PUT ALL CARDS ON THE DOM
  renderCards(referenceList)

  // PUT CART TOTAL ON DOM
  cartTotal();

  // SELECT THE CARD DIV
  document.querySelector('#cards').addEventListener('click', toggleCart);

  // SELECT THE SEARCH INPUT
  document.querySelector('#searchInput').addEventListener('keyup', search)

  // SELECT BUTTON ROW DIV
  document.querySelector('#btnRow').addEventListener('click', buttonFilter);
}
startApp();
