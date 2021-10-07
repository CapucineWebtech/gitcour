function getRandomCocktail(){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
            // console.log(data);
            displayRandomCocktail(data);
        });
    }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

function displayRandomCocktail(cocktail){
    console.log(cocktail.drinks[0]);
    //section 1
    let sec1 = document.querySelector('#sec-1');

    let drinkName = document.createElement('h1');
    drinkName.className = "titre";
    drinkName.innerHTML = cocktail.drinks[0].strDrink;

    sec1.appendChild(drinkName);
    //section 2
    let sec2 = document.querySelector('#sec-2');

    let img = document.createElement('img');
    img.src = cocktail.drinks[0].strDrinkThumb;
    img.className = "image";

    sec2.appendChild(img);
    //section 3
    let list = document.querySelector('#list');

    for(let i=1; i<16; i++){
        if(cocktail.drinks[0][`strIngredient${i}`]){
            if(cocktail.drinks[0][`strMeasure${i}`]){
                let ingredient = document.createElement('li');
                ingredient.innerHTML = cocktail.drinks[0][`strMeasure${i}`]+" : <span class='bold'>"+cocktail.drinks[0][`strIngredient${i}`]+"</span>";
                ingredient.className = "ingredient";

                list.appendChild(ingredient);
            }else{
                let ingredient = document.createElement('li');
                ingredient.innerHTML = "<span class='bold'>"+cocktail.drinks[0][`strIngredient${i}`]+"</span>";
                ingredient.className = "ingredient";

                list.appendChild(ingredient);
            }
            
        }
    }
    //section 4
    let sec4 = document.querySelector('#sec-4');

    let preparation = document.createElement('p');
    preparation.className = "preparation";
    preparation.innerHTML = cocktail.drinks[0].strInstructions;

    sec4.appendChild(preparation);
    //section 5
    let sec5 = document.querySelector('#sec-5');

    let glass = document.createElement('p');
    glass.className = "glass";
    glass.innerHTML = "Glass : <span class='bold'>"+cocktail.drinks[0].strGlass+"</span>";

    sec5.appendChild(glass);

    //section 6 (If the cocktail contains alcohol, add a prevention statement)
    if (cocktail.drinks[0].strAlcoholic != "Non alcoholic"){
        let sec6 = document.querySelector('#sec-6');

        let alcohol = document.createElement('p');
        alcohol.className = "alcohol";
        alcohol.innerHTML = "Alcohol abuse is bad for your health, please consume in moderation.";

        sec6.appendChild(alcohol);
    }
    
}
getRandomCocktail();

// Generate a new recipe
$("button.button").on("click", function(){
    document.location.reload();
});

// Highlight an ingredient
$('ul').on('mouseenter', 'li', function(){
    $(this).addClass('hover');
});
$('ul').on('mouseleave', 'li', function(){
    $(this).removeClass('hover');
});

// Cross out an ingredient use
$('ul').on('click', 'li', function(){
    $(this).addClass('used');
});