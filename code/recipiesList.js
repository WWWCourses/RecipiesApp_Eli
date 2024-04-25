let ListOfMeals = document.querySelector('.listOfMeals');

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const urlByFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

//list of objects that contains id, title and 
//description: Category, Area, Tags
let ArrayOfMeals_IdTitleDescription = [];

//list of titles to sort all the meals in alphabetical order
let mealTitles = [];

async function getMealsObjandTitles() {
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
                        if (meal.strTags != null) {
                            const obj = {
                                'id': meal.idMeal,
                                'title': meal.strMeal,
                                'image': meal.strMealThumb,
                                'category': meal.strCategory,
                                'area': meal.strArea,
                                'tags': meal.strTags.split(",")
                            }
                            ArrayOfMeals_IdTitleDescription.push(obj);
                        } else {
                            const obj = {
                                'id': meal.idMeal,
                                'title': meal.strMeal,
                                'image': meal.strMealThumb,
                                'category': meal.strCategory,
                                'area': meal.strArea
                            }
                            ArrayOfMeals_IdTitleDescription.push(obj);
                        }
                    }
                }
            })
            .catch(err => console.log(err.message));
    }
    return ArrayOfMeals_IdTitleDescription
}

getMealsObjandTitles()
    .then(() => {
        console.log(ArrayOfMeals_IdTitleDescription);
        mealTitles.sort();
        console.log(mealTitles);
        for (let i = 0; i < 30; i++) {
            if(ArrayOfMeals_IdTitleDescription[i].tags){
                ListOfMeals.innerHTML += `
                <div class="individualMeal">
                    <img class="imageIndividualMeal" src="${ArrayOfMeals_IdTitleDescription[i].image}" alt="image of the meal">
                    <div class="descriptionMeal">
                        <h2>${ArrayOfMeals_IdTitleDescription[i].title}</h2>
                        <div>
                            <b>Area:</b> ${ArrayOfMeals_IdTitleDescription[i].area}<br>
                            <b>Category:</b> ${ArrayOfMeals_IdTitleDescription[i].category}<br>
                            <b>Tags:</b> ${ArrayOfMeals_IdTitleDescription[i].tags}<br>
                        </div>
                    </div>
                </div>
                `;
            } else {
                ListOfMeals.innerHTML += `
                <div class="individualMeal">
                    <img class="imageIndividualMeal" src="${ArrayOfMeals_IdTitleDescription[i].image}" alt="image of the meal">
                    <div class="descriptionMeal">
                        <h2>${ArrayOfMeals_IdTitleDescription[i].title}</h2>
                        <div>
                            <b>Area:</b> ${ArrayOfMeals_IdTitleDescription[i].area}<br>
                            <b>Category:</b> ${ArrayOfMeals_IdTitleDescription[i].category}<br>
                        </div>
                    </div>
                </div>
                `;
            }
            
        }

    })
