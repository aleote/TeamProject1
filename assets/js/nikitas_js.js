// Nutrionix API information
var nxAppId = "74726c7b",
  nxAppKey = "90742700ec90b139a3994f2f92d1ff0b",
// Google API key
var gApiKey = "AIzaSyAjnWWbP30ssxxKP-jULse9lWmbR9AIaZ8";

// number of calories
// in the future, var userInput = $("#calories").val().trim();
// for now, use 1000 to see how the program works
var userInput = 1000;
var maxCalories = userInput;

//arrays we will use to build our meals, these strings when randomly selected will be placed into our query in our ajax function
var mainMealArray = ["burger", "chicken", "filet-o-fish"];
var sideMealArray = ["salad", "french fries"];
var dessertMealArray = [];
var mealArrays = [mainMealArray, sideMealArray];
var mealArrayIndex = 0;
var nextMealArray = mealArrays[mealArrayIndex];
console.log("nextMealArray: " + nextMealArray);

//when item from ajax array is chosen, push to the finishedMealArray
var finishedMealArray = [];

// choose a random meal from the array provided
function chooseRandomItem(mealArray){
  var randomIndex = Math.floor(Math.random()*mealArray.length);
  var randomMeal = mealArray[randomIndex];
  console.log("Meal # " + randomIndex + " chosen = " + randomMeal);
  return randomMeal;
}

function fetchMealOptions(){
  $.ajax({
    url: "https://api.nutritionix.com/v1_1/search",
    method: "POST",
    headers: {
      "Content-Type": 'application/json'
    },
    data: JSON.stringify({
      "appId": nxAppId,
      "appKey": nxAppKey,
      "queries": {
        "brand_name": "mcdonald",
        "item_name": nextMealArray.join(" OR ")
      },
      "filters": {
        "nf_calories": {
          "from": 150,
          "to": maxCalories
        }
      },
      "fields": [
        "item_name",
        "nf_calories",
        "nf_protein",
        "nf_total_carbohydrate",
        "nf_total_fat"        
      ],
    })
  })
  .done(handleResponse)
  .fail(function(error){
      console.log(error);
  });
}

function handleResponse(response){
  // if there are no options returned, stop
  if (response.hits.length == 0){
    console.log("No results returned with " + maxCalories + " calories or less.");
    return;
  }
  console.log(response);
  // get random item and push to finished meal array
  var randomItem = chooseRandomItem(response.hits);
  var randomItemFields = randomItem.fields;
  finishedMealArray.push(randomItemFields);

  //variable that stores the name of the random item chosen from the array that ajax returns
  var randomItemName = randomItemFields.item_name;

  //variable that holds the caloric value of firstItemName
  var randomItemCalories = randomItemFields.nf_calories;
  var randomItemProtein = randomItemFields.nf_protein;
  var randomItemCarbs = randomItemFields.nf_total_carbohydrate;
  var randomItemFat = randomItemFields.nf_total_fat;
        
  console.log("Item selected: " + randomItemName);
  console.log("Nutrition Info: ");
  console.log(" Calories: " + randomItemCalories);
  console.log(" Protein (g): " + randomItemProtein);
  console.log(" Carbohydrates (g): " + randomItemCarbs);
  console.log(" Fat (g): " + randomItemFat);

  // deduct calories from max total
  maxCalories -= randomItemCalories;
  console.log("Calories left now: " + maxCalories);

  // log meal array
  console.log("finishedMealArray: ");
  console.log(finishedMealArray);

  decideNextItem();
}

function decideNextItem(){
  // go to next meal item array
  mealArrayIndex++;

  // check if there are calories to use
  if (maxCalories >= 0){

    // if ran out of arrays, cycle back
    if (mealArrayIndex == mealArrays.length){
      mealArrayIndex = 0;
    }

    // get next meal item array and do another search
    nextMealArray = mealArrays[mealArrayIndex];

    fetchMealOptions();
  }
}

// start fetching
fetchMealOptions();