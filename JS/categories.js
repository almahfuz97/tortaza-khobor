// loading all categories
const loadCatergories = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data);
        // console.log(data.data.news_category[0].category_id);

        displayCatergory(data.data.news_category);
    }
    catch (err) {
        console.log(err);
    }
}

// displaying catergory from api array
const displayCatergory = categories => {
    const categoriesSection = document.getElementById('catergories-section');

    categories.forEach(category => {
        const div = document.createElement('div');
        div.setAttribute('id', `${category.category_id}`)
        div.classList.add('tabs', 'transition', 'ease-in-out', 'delay-150', 'hover:-translate-y-0.5', 'hover:scale-110', 'hover:rounded', 'hover:text-indigo-500', 'duration-30', 'flex', 'justify-center');

        div.innerHTML = `
         <button class="tab-sm p-4 w-1/2 md:w-full justify-center flex items-center m-1 border border-ghost drop-shadow-md rounded" onclick="loadNews('${category.category_id}','${category.category_name}')"> ${category.category_name} </button>
    `
        categoriesSection.appendChild(div);
    });

    // loading default news onload()
    // spinner
    spinnerSection.classList.add('hidden');
    loadNews(categories[0].category_id, categories[0].category_name);
}

// loading news from category after clicking 
const spinnerSection = document.getElementById('spinner-section');
const loadNews = async (id, cName) => {
    // spinner
    spinnerSection.classList.remove('hidden');

    // const categoriesSection = document.getElementById('catergories-section');
    location.href = "#catergories-section"

    // changing catergory text color after clicking
    const divId = document.getElementById(id);
    const allDivs = document.getElementsByClassName('tabs');
    for (let i = 0; i < allDivs.length; i++) {
        allDivs[i].classList.remove('text-indigo-500')
    }
    divId.classList.add('text-indigo-500')

    // fetching specific catergory
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data);

        // sorting array of objects decreasing order
        data.data.sort((a, b) => b.total_view - a.total_view);

        // calling displayNews function in displayNews.js file
        displayNews(data.data, cName);
    } catch (error) {
        console.log(error)
    }
}

loadCatergories();