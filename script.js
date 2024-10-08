// API_KEY = https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

const searchBox = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const recipeContainer = document.querySelector(".recipe-container");

const recipeDetails = document.querySelector(".recipe-details");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const recipeDetailsContent =  document.querySelector(".recipe-details-content");


const fetchRecipe = async function(query){
    recipeContainer.innerHTML = `<h1>Fetching Recipes...</h1>`;
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";

        response.meals.forEach( (meal) => {
        // ek recipe div banaya
       const recipeDiv = document.createElement("div");
       // uski class add krdi
       recipeDiv.classList.add("recipe");
       // ab recipeDiv k andar kya-kya h => img,description,button
       // isko apne html me add krna h
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs To <span>${meal.strCategory}</span></p>
        `

        // card ka btn add kiya h
        const button = document.createElement("button");
        button.textContent = "View Recipe";
        button.classList.add("cardBtn");
        recipeDiv.appendChild(button);

        // card ke andar k btn pe event lister lagaya h
        button.addEventListener("click",()=>{
            openRecipePopUp(meal);
        })
        // recipeContainer parent div me add kr diya
        recipeContainer.appendChild(recipeDiv);
        });
    }
    catch(error){
        recipeContainer.innerHTML = `<h1>Error in Fetching Recipes :(</h1>`;
    }
}

// function to fetch ingredients and measurements
const fetchIngredients = (meal)=>{
    // console.log(meal);
    let ingredientsList = "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopUp = (meal) =>{
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class = "recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = "<h2>Enter the meal you want to Search :)</h2>";
        return;
    }
    fetchRecipe(searchInput);
})

