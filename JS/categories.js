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
        div.classList.add('tabs');
        div.innerHTML = `
         <button class="tab-sm" onclick="loadNews('${category.category_id}','${category.category_name}')"> ${category.category_name} </button>
    `
        categoriesSection.appendChild(div);
    });
}

// loading news from category after clicking 
const loadNews = async (id, cName) => {
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

// display news from specific categories
// const displayNews = (news, cName) => {
//     const newsFound = document.getElementById('news-found');

//     if (news.length === 0) {
//         newsFound.innerText = `No News Found!`
//     }
//     else {
//         newsFound.innerText = `${news.length} items for category ${cName}`
//     }
// }
loadCatergories();