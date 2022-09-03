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
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card lg:card-side bg-base-100 shadow-xl bg-white mb-4 " onclick="loadModal('${element._id}')">
        <figure class="w-full"><img class="rounded w-full h-full" src="${element.image_url}" alt="Album"></figure>
        <div class="card-body w-full">
            <h2 class="card-title">${element.title}</h2>
            <p class="opacity-50 w-full">${element.details.slice(0, 100)}</p>
            <p class="opacity-50 w-full">${element.details.length > 300 ? element.details.slice(100, 200).concat('...') : element.details}</p>
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
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
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

// opening modal to show details
const loadModal = newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => openModal(data.data))
        .catch(err => console.log(err))
}

const openModal = data => {
    const authorPic = document.getElementById('modal-author-pic');
    const authorName = document.getElementById('modal-author-name');
    const modalNewsDate = document.getElementById('modal-news-date');
    const modalViews = document.getElementById('modal-views');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const modalThumbnail = document.getElementById('modal-thumbnail');

    data.forEach(element => {
        authorPic.setAttribute('src', `${element.author.img ? element.author.img : ""}`)
        authorName.innerText = element.author.name ? element.author.name : "No name found!";
        modalNewsDate.innerText = element.author.published_date ? element.author.published_date.slice(0, 10) : "No Date found!";
        modalViews.innerText = element.total_view ? element.total_view : "No Data Found!";
        modalTitle.innerText = element.title ? element.title : "no data found";
        modalDetails.innerText = element.details ? element.details : "no data found!";
        modalThumbnail.setAttribute('src', `${element.image_url}`)
    })

}