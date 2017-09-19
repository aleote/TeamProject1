// used to get results from test api searches

var nxAppId = "74726c7b",
  nxAppKey = "90742700ec90b139a3994f2f92d1ff0b",

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
          	"item_name": "hashbrown"
          },
          "filters": {
          	"nf_calories": {
          	"from": 150,
          	"to": 1000,
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
  	}).done(function(response){
    console.log(response);
  })
