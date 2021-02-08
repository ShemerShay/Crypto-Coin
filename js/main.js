//hide the about page when the project is open
$(" #aboutDiv").hide();
//dynamic array of all coins
let arrCoins = [];

async function showAjaxData() {
  try {
    //get api function and display 100 coins
    const getAllCoins = await getCoins();
    displayCoins(getAllCoins, 100);

    //giving all the coins to the array
    arrCoins = getAllCoins;
  } catch (err) {
    console.log(err);
  }
}

//showing all the coins
showAjaxData();

function getCoins() {
  return new Promise((resolve, reject) => {
    $.ajax({
      //coins api
      url: "https://api.coingecko.com/api/v3/coins/list",
      error: (err) => reject(err),
      success: (json) => resolve(json),
    });
  });
}

//function to display a limited cards
function displayCoins(arrOfCoins, limit) {
  $("#homeDiv").html("");
  for (let i = 0; i < limit; i++) {
      //append to home div all cards
    $("#homeDiv").append(`
            <div class="card">
            <div class="card-body">
            <label class="switch">
                <input class="single-checkbox" type="checkbox" id=${arrOfCoins[i].symbol}>
                <span class="slider round"></span>
            </label>
            <h5 class="card-title">${arrOfCoins[i].symbol}</h5>
            <br><br>
            <h6 class="card-subtitle mb-2 text-muted">${arrOfCoins[i].name}</h6>
            <br><br>
            <button onclick="displayInfo(${i})" class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample"
               id=collapseButton aria-expanded="false" aria-controls="collapseExample${i}">
                more info
            </button>
            <br><br>
        <div class="collapse"  id="collapseExample${i}">
        
            </div>
            </div>
            </div>
            `);
  }
  //update the save toggle buttons from local at the first run of the website
  if (toggleCoins.length > 0) {
    for (const coin of toggleCoins) {
      $(`#${coin}`).prop("checked", true);
    }
  }
  //hide spinner after page is finish to load
  $(".spinner-border").hide();
}

function getCoinsInfo(idCard) {
  return new Promise((resolve, reject) => {
    $.ajax({
        //more info api
      url: "https://api.coingecko.com/api/v3/coins/" + idCard,
      error: (err) => reject(err),
      success: (json) => resolve(json),
    });
  });
}

//function to display more info
async function displayInfo(id) {
    //giving each card id
  index = id;
  id = await getCoinsInfo(arrCoins[id].id);
  $(`#collapseExample${index}`).html(`
            <div class="card card-body-info ">
            dollar: ${id.market_data?.current_price.usd}$<br>
            shekel: ${id.market_data?.current_price.ils}₪<br>
            Euro: ${id.market_data?.current_price.eur}€<br>
            <img src=${id.image?.small}>
            </div>
            `);
}

//open the more info with on click and fade toggle
$("#homeDiv").on("click", "button", function () {
  const id = $(this).attr("aria-controls");
  console.log(id);
  $("#" + id).fadeToggle();
});
