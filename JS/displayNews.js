// displaying news to browser
const displayNews = (news, cName) => {
    const newsFound = document.getElementById('news-found');
    const newsSection = document.getElementById('news-section');

    // showing no-news/News found message
    if (news.length === 0) {
        newsFound.innerHTML = `<p class="text-center font-bold">No News Found!</p>`
    }
    else {
        newsFound.innerHTML = `<p class="text-center text-xs">${news.length} items for category ${cName}</p>`
    }

    newsSection.textContent = '';
    // adding html for news dynamically
    news.forEach(element => {
        const ratings = element.rating.number;
        const div = document.createElement('div');

        div.innerHTML = `
        <div class="card lg:card-side bg-base-100 shadow-xl bg-white mb-4 " onclick="loadModal('${element._id}')">
        <picture>
            <source media="(min-width: 1024px)" srcset="${element.thumbnail_url}">
            <img class="rounded lg:mt-0 w-full h-full" src="${element.image_url}" alt="Album">
        </picture>


        <div class="card-body w-full">
            <h2 class="card-title">${element.title}</h2>
            <p class="opacity-50 w-full">${element.details.slice(0, 180)}</p>
            <p class="opacity-50 w-full">${element.details.length > 380 ? element.details.slice(180, 380).concat('...') : element.details.slice(180, element.length)}</p>
            <div class="flex justify-between mt-5">
                 <div class="flex justify-between items-center">
                    <img class="w-10 h-10 mr-2 rounded-full" src="${element.author.img ? element.author.img : ""}" alt="">
                    
                    <div class="w-full">
                        <p class="leading-3 w-full"> ${element.author.name ? element.author.name : 'NO Data Found'} </p>
                        <small>${element.author.published_date ? element.author.published_date.slice(0, 10) : 'No Data Found'} </small>
                    </div>
                </div>
                <div class="hidden md:block">
                    <i class="fa-regular fa-eye "></i> <span class="font-bold">${element.total_view ? element.total_view : "No Data Found"}</span>
                </div>
                <div class="hidden md:block">
                    ${setRating(parseInt(ratings), ratings % 2 === 0 ? 0 : 1)}
                   
                </div>
                <div>
                    <span><label for="my-modal-6" class=" modal-button"><i class="fa-solid fa-arrow-right text-white ml-2 bg-indigo-500 rounded-full p-2"></i></span>
                    </label>
                </div>
            </div>
            
        </div>
    </div>
   
        `;
        newsSection.appendChild(div);
    });

    // hiding spinner after loading
    spinnerSection.classList.add('hidden');
}

// setting rating based on api
const setRating = (ratings, num) => {
    let str = `<i class="fa-solid fa-star"></i> `;
    let star = '';
    let halfStar = `<i class="fa-solid fa-star-half-stroke"></i>`

    for (let i = 0; i < ratings; i++) {
        star = star + str;
    }
    if (num === 1) {
        star = star + halfStar;
    }
    return star;
}

//  modal to show details
const loadModal = newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => setModal(data.data))
        .catch(err => console.log(err))
}

// setting modal info
const setModal = data => {
    const authorPic = document.getElementById('modal-author-pic');
    const authorName = document.getElementById('modal-author-name');
    const modalNewsDate = document.getElementById('modal-news-date');
    const modalViews = document.getElementById('modal-views');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const modalThumbnail = document.getElementById('modal-thumbnail');
    const modalRatings = document.getElementById('modal-ratings');

    data.forEach(element => {
        authorPic.setAttribute('src', `${element.author.img ? element.author.img : ""}`)
        authorName.innerText = element.author.name ? element.author.name : "No name found!";
        modalNewsDate.innerText = element.author.published_date ? element.author.published_date.slice(0, 10) : "No Date found!";
        modalViews.innerText = element.total_view ? element.total_view : "No Data Found!";
        modalTitle.innerText = element.title ? element.title : "no data found";
        modalDetails.innerText = element.details ? element.details : "no data found!";
        modalThumbnail.setAttribute('src', `${element.image_url}`)

        // modal ratings from api
        modalRatings.innerHTML = ` 
        ${setRating(parseInt(element.rating.number), element.rating.number % 2 === 0 ? 0 : 1)}
        `
    })

}