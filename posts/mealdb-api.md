---
title: "MealDB API"
subtitle: "GET, POST, DELETE method with Axios."
date: "15-02-2023"
---

# Consume MealDB API
### Objektif:
- Melakukan consume pada MealDB API
- Fitur random untuk mendapatkan menu makanan secara acak
- [Full Code here..](https://github.com/samsleepingatparty/MealDB-API_Test)

**App.js**

```javascript
'use strict';

const searchBox = document.getElementById('search');
const submitBtn = document.getElementById('submit');
const randomBtn = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const mealsEl = document.getElementById('meals');
const singleMealEl = document.getElementById('single-meal');

const getJSON = async function (url, errorMsg = 'Something went wrong') {
    return await fetch(url).then((response) => {
        if (!response.ok) {
        resultHeading.innerHTML = '<h2> Opps! There has been an error </h2>';
        throw new Error(`${errorMsg} (${response.status})`);
        }
        return response.json();
    });
};

// Add multiple meals to the DOM
const displayMeals = function (mealDataArr) {
    const innerHTML = [];
    mealDataArr.forEach((mealData) => {
        const string = mealData.meals
        .map(
            (meal) => `
    <div class="meal">
        <img src="${meal.strMealThumb}" alt=${meal.strMeal}>
        <div class="meal-info" data-mealID="${meal.idMeal}"> 
        <h3>${meal.strMeal}</h3>
        </div>
    </div>
    `
        )
        .join('');
        innerHTML.push(string);
    });
    mealsEl.innerHTML = innerHTML.join('');
};

// Search meals & fetch from API
const searchMeal = async function (e) {
    e.preventDefault();
    if (searchBox.value === '') {
        alert('Please enter a search term');
        return;
    }
    const term = searchBox.value;
    const mealsArr = [];
    try {
        // API search meal by name
        const mealData = await getJSON(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
        );
        if (mealData.meals !== null) mealsArr.push(mealData);
        // API search by main ingredient
        const mealData2 = await getJSON(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`
        );
        if (mealData2.meals !== null) mealsArr.push(mealData2);
        // API filter by category
        const mealData3 = await getJSON(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`
        );
        if (mealData3.meals !== null) mealsArr.push(mealData3);
        // API filter by area
        const mealData4 = await getJSON(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`
        );
        if (mealData4.meals !== null) mealsArr.push(mealData4);

        resultHeading.innerHTML = `<h2> Search results for '${term}'</h2>`;
        if (mealsArr.length === 0) {
        resultHeading.innerHTML = `<p> No search results for '${term}'. Please try again!</p>`;
        mealsEl.innerHTML = '';
        if (term === 'desert')
            resultHeading.innerHTML = `<p> No search results for '${term}'. Try "dessert"!`;
        return;
        } else {
        // Add meal data to DOM
        displayMeals(mealsArr);
        }
        searchBox.value = '';
    } catch (err) {
        alert(err.message);
    }
};

// Class to work with the API format
class recipeItem {
    constructor(ingredient, quantity) {
        this.ingredient = ingredient;
        this.quantity = quantity;
    }
}

// Add the selected meal to the DOM
const addMealToDOM = function (meal) {
    const ingredients = [];
    const measurements = [];
    const recipeData = [];
    // (API has data in a goofy way)
    for (let key in meal) {
        let word = key;
        if (word.includes('strIngredient') && meal[key] !== '') {
        ingredients.push(meal[key]);
        }
        if (word.includes('strMeasure') && meal[key] !== '') {
        measurements.push(meal[key]);
        }
    }
    for (let i = 0; i < ingredients.length; i++) {
        let j = new recipeItem(ingredients[i], measurements[i]);
        recipeData.push(j);
    }
    // Add meal data to DOM
    singleMealEl.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strCategory ? `<p><i>${meal.strArea}</i></p>` : ''}
        </div>
        <div class="main">
        ${meal.strYoutube ? `<h3>This Recipe Has A YouTube Video! </h4>` : ''}
        ${
        meal.strYoutube
            ? `<div class="link"><a href=${meal.strYoutube}>YouTube</a></div>`
            : ''
        }
        ${meal.strInstructions
        .split(';')
        .map((item) => `<p>${item}.</p>`)
        .join('')}
        </div>
        <h2>Ingredients</h2>
        <ul>
        ${recipeData
        .map((item) => `<li>${item.ingredient}: ${item.quantity}</li>`)
        .join('')}
        </ul>
    </div>`;

    singleMealEl.scrollIntoView({ behavior: 'smooth' });
};

//Finds y value of given object
function findPos() {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
        curtop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return [curtop];
    }
}

// Fetch meal by ID
const getMealByID = async function (mealID) {
    // API ID lookup feature
    const data = await getJSON(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    );
    const meal = data.meals[0];
    addMealToDOM(meal);
    };

    // Fetch random meal
    const getRandomMeal = async function () {
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    const data = await getJSON(
        'https://www.themealdb.com/api/json/v1/1/random.php'
    );
    const meal = data.meals[0];
    addMealToDOM(meal);
};

// Init
const init = async function () {
    const areas = ['French', 'American', 'British', 'Italian', 'Chinese'];
    const random = Math.floor(Math.random() * 5);
    let randomCuisine = areas[random];

    //Filter meals by area
    const mealData = await getJSON(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${randomCuisine}`
    );
    resultHeading.innerHTML = `<h2> Search results for '${randomCuisine}'</h2>`;
    const meals = [mealData];
    displayMeals(meals);
};
init();

// Submit Form Click
submitBtn.addEventListener('submit', searchMeal);
// Random Meal Click
randomBtn.addEventListener('click', getRandomMeal);
// Get Recipe Click
mealsEl.addEventListener('click', (e) => {
    let path = e.path || (e.composedPath && e.composedPath());
    const mealInfo = path.find((item) => {
        if (item.classList) {
        return item.classList.contains('meal-info');
        } else {
        false;
        }
    });
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealByID(mealID);
    }
});
```

---

**index**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MealDB Test API</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css" />
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <div>
                <h1>MealDB Test API</h1>
            </div>
        </div>

        <div class="flex">
            <div class="input-group" id="submit">
                <input class="form-control m-0 py-1" type="text" id="search" placeholder="Search...">
                <button class="search-btn btn btn-success" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </div>
            <button class="random-btn btn btn-warning mx-1" id="random">
                <i class="fas fa-random"></i>
            </button>
        </div>

        <div id="result-heading"></div>
        <div class="meals" id="meals"></div>
        <div id="single-meal"></div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    <script src="app.js"></script>
</body>
</html>
```

---

**Style**

```css
* {
    box-sizing: border-box;
}

body {
    background-color: #531345;
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin: 0;
}

.container {
    margin: auto;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.flex {
    display: flex;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}

.header {
    display: flex;
    margin: 15px;
}

/* input, button {
    border: 1px solid #dedede;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    font-size: 14px;
    padding: 8px 10px;
    margin: 0;
}

input[type='text'] {
    width: 370px;
}

input:focus {
    outline: 0;
} */

/* .search-btn {
    cursor: pointer;
    border-left: 0;
    border-radius: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
} */

/* .random-btn {
    cursor: pointer;
    margin-left: 10px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
} */

.meals {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    margin-top: 10px;
}

.meal {
    cursor: pointer;
    position: relative;
    height: 200px;
    width: 200px;
    text-align: center;
    border-radius: 2px;
}

.meal img {
    width: 100%;
    height: 100%;
    border: 1px #fff solid;
}

.meal-info {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease-in;
    opacity: 0;
}

.meal:hover .meal-info {
    opacity: 1;
}

.single-meal {
    margin: 30px auto;
    width: 70%;
}

.single-meal img {
    width: 360px;
    margin: 15px;
    border: 1px #fff solid;
    border-radius: 2px;
}

.single-meal-info {
    background-color: #fff;
    color: #4c6ca0;
    margin: 20px;
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    border: 1px #f4f4f4 solid;
    border-radius: 5px;
    box-shadow: 0 2rem 5rem 1rem rgba(0, 0, 0, 0.1);
}   

.single-meal p {
    margin: 10px;
    letter-spacing: 0.5px;
    line-height: 1.5;
}

.single-meal ul {
    padding-left: 0;
    list-style-type: none;
}

.single-meal ul li {
    border: 1px solid #ededed;
    /* border-radius: 5px; */
    background-color: #fff;
    /* display: inline-block; */
    color: #4c6ca0;
    font-size: 12px;
    font-weight: bold;
    padding: 5px;
    margin: 0 5px;
}

.link {
    background-color: #ff0000;
    border: 1px solid #cdcdcd;
    font-size: 19px;
    font-weight: bold;
    padding: 4px;
    border-radius: 5px;
    margin: 20px;
    cursor: pointer;
    text-decoration: none;
    width: 25%;
    box-shadow: 0 2rem 5rem 1rem rgba(0, 0, 0, 0.1);
    margin: auto;
}

.link:hover {
    background-color: #e60026;
    /* font-size: 20px; */
}

.link a {
    color: #fff;
    text-decoration: none;
}

a:visited {
    background-color: inherit;
}

@media (max-width: 800px) {
    .meals {
        grid-template-columns: repeat(3, 1fr);
    }
    .meal {
        height: 180px;
        width: 180px;
    }
}
@media (max-width: 700px) {
    .meals {
        grid-template-columns: repeat(2, 1fr);
    }
    .meal {
        height: 200px;
        width: 200px;
    }
}

@media (max-width: 500px) {
    input[type='text'] {
        width: 100%;
    }

    .meals {
        grid-template-columns: 1fr;
    }
    .meal {
        height: 300px;
        width: 300px;
    }
}
```