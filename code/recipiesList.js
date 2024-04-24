let ListOfMeals = document.querySelector('.listOfMeals');

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const urlByFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

//list of objects that contains id, title and 
//description: Category, Area, Tags
let ArrayOfMeals_IdTitleDescription = [];

//list of titles to sort all the meals in alphabetical order
let mealTitles = [];

for (let j = 0; j < alphabet.length; j++) {
    const URLletter = urlByFirstLetter + alphabet[j];
    fetch(URLletter)
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
                            'category': meal.strCategory,
                            'area': meal.strArea,
                            'tags': meal.strTags.split(",")
                        }
                        ArrayOfMeals_IdTitleDescription.push(obj);
                    } else {
                        const obj = {
                            'id': meal.idMeal,
                            'title': meal.strMeal,
                            'category': meal.strCategory,
                            'area': meal.strArea
                        }
                        ArrayOfMeals_IdTitleDescription.push(obj);
                    }
                    ListOfMeals.innerHTML += meal.strMeal + "<br>";
                }
            }
        })
        .catch(err => console.log(err.message));
}

setTimeout(() => {
    console.log(ArrayOfMeals_IdTitleDescription);
    mealTitles.sort();
    console.log(mealTitles);
}, "6000");
