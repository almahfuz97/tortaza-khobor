// displaying news to browser
const displayNews = (news, cName) => {
    const newsFound = document.getElementById('news-found');
    const newsSection = document.getElementById('news-section');

    if (news.length === 0) {
        newsFound.innerText = `No News Found!`
    }
    else {
        newsFound.innerText = `${news.length} items for category ${cName}`
    }
    newsSection.textContent = '';
    news.forEach(element => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card lg:card-side bg-base-100 shadow-xl p-5 bg-white mb-4" onclick="loadModal('${element._id}')">
        <figure class="w-full"><img class="rounded w-full h-full" src="${element.image_url}" alt="Album"></figure>
        <div class="card-body w-full">
            <h2 class="card-title">${element.title}</h2>
            <p class="opacity-50">${element.details.slice(0, 150)}</p>
            <p class="opacity-50">${element.details.length > 320 ? element.details.slice(150, 320).concat('...') : element.details}</p>
            <div class="flex justify-between mt-5">
                 <div class="flex justify-between items-center">
                    <img class="w-12 h-12 mr-2 rounded-full" src="${element.author.img ? element.author.img : ""}" alt="">
                    
                    <div class="w-full">
                        <p class="leading-3 w-full"> ${element.author.name ? element.author.name : 'NO Data Found'} </p>
                        <small>${element.author.published_date ? element.author.published_date.slice(0, 10) : 'No Data Found'} </small>
                    </div>
                </div>
                <div>
                    <i class="fa-regular fa-eye mr-2"></i> <span class="font-bold">${element.total_view ? element.total_view : "No Data Found"}</span>
                </div>
                <div>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <div>
                    <span><i class="fa-solid fa-arrow-right text-indigo-500"></i></span>
                </div>
            </div>
            
        </div>
    </div>
   
        `;
        newsSection.appendChild(div);
    });
}

// opening modal to show details
const loadModal = newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => openModal(data.data))
        .catch(err => console.log(err))
}

const openModal = data => {
    console.log(data);
}