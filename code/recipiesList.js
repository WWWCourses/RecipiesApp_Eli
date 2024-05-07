//take and make the options for the cuisine filter
function MakeOptionsForSelectCuisine(url) {
    fetch(url)
        .then(resp => {
            if (resp.status == 200) { return resp.json(); }
        })
        .then(data => {
            for (let i = 0; i < data.meals.length; i++) {
                listOfCuisines.push(data.meals[i].strArea);
            }
        })
        .then(() => {
            for (let i = 0; i < listOfCuisines.length; i++) {
                dom.CuisineSelect.innerHTML += `<option value="${listOfCuisines[0]}">${listOfCuisines[i]}</option>`;
            }

        })
    return listOfCuisines;
}

//get meals (title and description) and create <div> for each meal in alphabetical order
//I noticed that some of the meals don't have tags so I made 2 versions for the div-s
async function getMealsObjAndTitles() {
    for (let j = 0; j < alphabet.length; j++) {
        const URLletter = urlByFirstLetter + alphabet[j];
        await fetch(URLletter)
            .then(resp => {
                if (resp.status == 200) { return resp.json(); }
            })
            .then(data => {
                if (data.meals != null) {
                    for (let i = 0; i < data.meals.length; i++) {
                        const meal = data.meals[i];
                        mealTitles.push(meal.strMeal);
                        let obj = {
                            'id': meal.idMeal,
                            'title': meal.strMeal,
                            'image': meal.strMealThumb,
                            'category': meal.strCategory,
                            'area': meal.strArea
                        };
                        if (meal.strTags != null) {
                            obj['tags'] = meal.strTags.split(",");
                        }
                        ArrayOfMeals_IdTitleDescription.push(obj);
                    }
                }
            })
            .then(() => {
                mealTitles.sort();
            })
            .catch(err => console.log(err.message));
    }
}

//function that creates div-s for every meal
async function createMealDivs(arr) {
    dom.ListOfMeals.innerHTML = '';
    for (let i = 0; i < 20; i++) { //20 will be changed to mealTitles.length
        dom.ListOfMeals.innerHTML += `
                <div class="individualMeal">
                    <img class="imageIndividualMeal" src="${arr[i].image}" alt="image of the meal">
                    <div class="descriptionMeal">
                        <h2>${arr[i].title}</h2>
                        <div>
                            <p class="descriptionMeal_TagChecking">
                                <b>Area:</b> ${arr[i].area}<br>
                                <b>Category:</b> ${arr[i].category}<br>
                            </p>
                            <button>View recipie</button>
                        </div>
                    </div>
                </div>
            `;
    }
}

async function createTagsForEachMeal(arr) {
    let tagsSTR = document.querySelectorAll('.descriptionMeal_TagChecking');
    for (let i = 0; i < tagsSTR.length; i++) {
        if (arr[i].tags) {
            tagsSTR[i].innerHTML += `<b>Tags:</b> ${arr[i].tags}<br>`;
        }
    }
}

async function mainPageContent() {
    //make options in the select for cuisine
    MakeOptionsForSelectCuisine(urlCuisine);

    //get meals titles and descriptions
    await getMealsObjAndTitles();

    //make <div>-s for each meal
    await createMealDivs(ArrayOfMeals_IdTitleDescription);

    //creste tags for each meal
    await createTagsForEachMeal(ArrayOfMeals_IdTitleDescription);
}

const dom = {
    ListOfMeals: document.querySelector('.listOfMeals'),
    CuisineSelect: document.querySelector('#cuisineFilter'),
};

//url for the meals without the first letter of the meal at the end
const urlByFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

//letters for the fetch for all meals
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//list of titles to sort all the meals in alphabetical order 
let mealTitles = [];

//url for the options for the cuisine filter
const urlCuisine = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
let listOfCuisines = [];

//list of objects that contains id, title and 
//description: Category, Area, Tags
let ArrayOfMeals_IdTitleDescription = [];
