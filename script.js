const searchbar = document.getElementsByClassName('search-input')[0];
const search = document.getElementsByClassName('search-submit')[0];
const bodyofsearch = document.getElementsByClassName('horizontal-scroll-wrapper')[0];
const searchresult = document.getElementsByClassName('Search-results')[0];

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && searchbar.value.trim() !== '') {
        click();
    }
});

const foodcard = document.getElementsByClassName('food-card')[0];

const randommealDiv = document.getElementsByClassName('Random-Meal')[0];

function getData() {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((res) => {
            const Foodimg = document.createElement('div');
            Foodimg.setAttribute('class', 'food-img');

            const Randomimage = document.createElement('img');
            Randomimage.setAttribute('src', res.data.meals[0].strMealThumb);
            Foodimg.append(Randomimage);

            const title = document.createElement('h1');
            title.innerText = res.data.meals[0].strMeal;
            Foodimg.append(title);

            foodcard.innerHTML = '';

            foodcard.append(Foodimg);
        })
        .catch(error => {
            console.error('Error fetching random meal:', error);
        });
}


getData();

search.onclick = click;

function click() {
    const searchTerm = searchbar.value.trim();
    if (searchTerm !== '') {
        document.getElementsByClassName('Search-results')[0].style.display = "block";
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchTerm}`)
            .then((res) => {
                console.log(res.data);
                const result = res.data.meals;
                bodyofsearch.innerHTML = '';
                if (result && result.length > 0) {
                    result.forEach((user) => {
                        const box = document.createElement('div');
                        box.setAttribute('class', 'search-food-card');

                        const imagediv = document.createElement('div');
                        imagediv.setAttribute('class', 'search-food-img');

                        const image = document.createElement('img');
                        image.setAttribute('src', user.strMealThumb);

                        const namerandom = document.createElement('h3');
                        namerandom.innerText = user.strMeal;

                        imagediv.append(image);
                        imagediv.append(namerandom);

                        box.append(imagediv);

                        bodyofsearch.append(box);
                    });
                    
                } else {
                    console.log('No results found.');
                    const headingSearch = document.createElement('h1')
                    headingSearch.setAttribute('class','error')
                    headingSearch.innerText="Nothing matching this found try searching something else"

                    bodyofsearch.append(headingSearch)
                }
                setTimeout(() => {
                    searchresult.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
                }, 1000);
            })
            .catch(error => {
                console.error('Error ', error);
                alert("unable to get your request")
            });
    }
}

