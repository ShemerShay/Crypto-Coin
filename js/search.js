//get search box input
const searchBox = document.getElementById("searchBox");
let apiCards = []; 
searchBox.addEventListener("keyup", (e) => {
    //getting the input value and give it a lower case
  const searchString = e.target.value.toLowerCase();
  //filtered through all the coins and find the specific
  const filterCard = JSON.parse(apiCards).filter((card) => {
    return card.symbol.toLowerCase().includes(searchString);
  });
  if (filterCard.length === 0) {
    setNoResults();
  }
//display the filtered coin
  displayCoins(filterCard, filterCard.length);
});

//saving all coins in local storage
async function loadToStorage() {
  try {
    const getAllCoins = await getCoins();
    apiCards = JSON.stringify(getAllCoins);
    localStorage.setItem("coins", apiCards);
  } catch (err) { 
    console.log(err);
  }
}

loadToStorage();
//every 2 minutes upload the coins data from api
setInterval(loadToStorage, 120000);
