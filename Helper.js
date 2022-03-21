const queryParameters = {};
window.location.search.substring(1).split('&').forEach(val => {
    const vals = val.split('=')
    queryParameters[vals[0]] = vals[1];
});

function RandomNumber(min, max) {
    return parseInt( Math.random() * (max - min + 1) + min );
}


async function ShowSuggestedMeals(parent, amount = 3) {
    const url = "https://www.themealdb.com/api/json/v1/1/random.php";
    for (let i = 0; i < amount; i++) {
        const res = await fetch(url);
        const d = await res.json();
        const data = d.meals[0];
        parent.innerHTML += GetSuggestionCards(data.idMeal, data.strMealThumb, data.strMeal, data.strCategory, data.strArea);
    }

    function GetSuggestionCards(MealId, ImgSrc, Name, CategoryName, Area) {
        return `
        <div class="suggested-card">
            <img src="${ImgSrc}" alt="Meal Image">
            <h3>${Name}</h3>
            <div class="other-suggestion-details">
                <h5>Category: ${CategoryName}</h5>
                <h5>Area : ${Area}</h5>
            </div>
            <a href="Meal.html?mealid=${MealId}">Show More</a>
        </div>
        `;
    }
}

async function ShowSuggestedCategories(parent, amount = 3) {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
    const fetchData = await fetch(url);
    const data = await fetchData.json();
    const categories = data.categories;
    let lastRandNo = 0;
    for (let i = 0; i < amount; i++) {
        let randNumber = RandomNumber(0, categories.length - 1);
        while (randNumber === lastRandNo) {
            randNumber = RandomNumber(0, categories.length - 1);
        }
        const category = categories[randNumber];
        parent.innerHTML += GetSuggestedCategoryCard(
            category.strCategoryThumb,
            category.strCategory,
            category.strCategory
        );
        lastRandNo = randNumber;
    }

    RandomNumber(0, categories.length - 1);
    RandomNumber(0, categories.length - 1);

    function GetSuggestedCategoryCard(ImgSrc, Name, href) {
        return `
        <div class="suggested-category">
            <img src="${ImgSrc}" alt="">
            <h1>${Name}</h1>
            <a class="btn" href="FoodItems.html?category=${href}">Show Meals</a>
        </div>
        `;
    }
}

async function ReadNavbarFile() {
    const fetchData = await fetch('./Navbar.html');
    const data = await fetchData.text();
    
    return data;
}
SetupNavbar();

async function SetupNavbar() {
    const navbarData = await ReadNavbarFile();
    document.querySelector('header').innerHTML = navbarData;
}


setInterval(() => {
    const searchAnchor = document.querySelector("#search");
    const searchInput = document.querySelector('#searchbar');
    
    const HandleInput = (e) => {
        // console.log(e.target.value);
        searchAnchor.setAttribute("href", "FoodItems.html?search=" + e.target.value);
        
    };
    searchInput.addEventListener('input', HandleInput);
    
}, 2000);