//empty array to store the selected coins
let toggleCoins = [];
//get the saved coins from local if arr is not equal to null
let localStorageCoins = localStorage.getItem("toggleCoins");
if (localStorageCoins != null) {
  toggleCoins = localStorageCoins.split(",");
}
//refer to the toggle buttons
$("#homeDiv").on("click", "input", function (e) {
  //get clicked button's id
  const getInputToggle = $(this).attr("id");
  //checks if more then 5 button ar marked
  if (toggleCoins.length >= 5 && $(this).prop("checked")) {
    e.preventDefault();
    return;
  }
  if ($(this).prop("checked")) {
    // add the new coin to the array:
    toggleCoins.push(getInputToggle);
    //add the array to local storage
    localStorage.setItem("toggleCoins", toggleCoins);
  } else {
    //filtered through the array find the symbol and stored him inside the array
    toggleCoins = toggleCoins.filter((symbol) =>
      symbol === getInputToggle ? "" : symbol
    );
    //keep the local storage empty if there is no coins in the array
    if (toggleCoins.length === 0) {
      localStorage.removeItem("toggleCoins");
      return;
    }
    localStorage.setItem("toggleCoins", toggleCoins);
  }
});

