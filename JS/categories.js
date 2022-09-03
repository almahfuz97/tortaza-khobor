// loading all categories
const loadCatergories = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data.news_category);
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
        div.classList.add('tabs', 'transition', 'ease-in-out', 'delay-150', 'hover:-translate-y-0.5', 'hover:scale-110', 'hover:rounded', 'hover:text-indigo-500', 'duration-30');
        div.innerHTML = `
         <button class="tab-sm p-4 flex items-center m-1 border border-ghost rounded" onclick="loadNews('${category.category_id}','${category.category_name}')"> ${category.category_name} </button>
    `
        categoriesSection.appendChild(div);
    });
}

// loading news from category after clicking 
const spinnerSection = document.getElementById('spinner-section');
const loadNews = async (id, cName) => {
    // spinner
    spinnerSection.classList.remove('hidden');

    const divId = document.getElementById(id);
    const allDivs = document.getElementsByClassName('tabs');
    console.log(allDivs.length);
    console.log(allDivs);
    for (let i = 0; i < allDivs.length; i++) {
        allDivs[i].classList.remove('text-indigo-500')
    }
    divId.classList.add('text-indigo-500')

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data);
        displayNews(data.data, cName);
    } catch (error) {
        console.log(error)
    }
}

loadCatergories();