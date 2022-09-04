const loadNavbar = () => {
    const navSection = document.getElementById('nav-section');

    navSection.innerHTML = `
    <div class="navbar bg-base-100 border-b-2 p-4">
    <div class="navbar-start">
        <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost sm:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </label>
            <ul tabindex="0"
                class="menu menu-compact dropdown-content  mt-3 p-2 shadow bg-base-100 rounded-box w-52 flex flex-col items-center">
                <li><img class="w-14 h-14 p-3 rounded" src="svg/pp2.png" alt=""></li>
                <li ><a href="index.html">News</a></li>
                <li><a class="" href="blog.html"><span class=" ">Blog</span> </a></li>

            </ul>
        </div>
        <a class="btn btn-ghost hover:bg-inherit normal-case text-xl" href="#"><span
                class="bg-indigo-500 text-white p-2 rounded mr-1">Tortaza
            </span> <span class="text-indigo-500">
                Khobor</span></a>
    </div>
    <div class="navbar-end hidden sm:inline-block sm:flex">
        <ul class="menu menu-horizontal p-0">
            <li class="active">
                <a id="news-anchor" href="index.html" class="">
                    <span id="news-span" class="">News</span>
                </a>
            </li>
            <li>
                <a  id="blog-anchor" class=" " href="blog.html">
                    <span id="blog-span" class=" ">Blog</span>
                </a>
            </li>
            <li><img class="w-14 h-14 p-3 rounded" src="svg/pp2.png" alt=""></li>
        </ul>
    </div>

</div>
    `

}

loadNavbar();

const changeColor = str => {
    const newsAnchor = document.getElementById('news-anchor');
    const blogAnchor = document.getElementById('blog-anchor');
    const newsSpan = document.getElementById('news-span');
    const blogSpan = document.getElementById('blog-span');



    if (str === 0) {
        newsAnchor.classList.remove('text-indigo-500');
        newsSpan.classList.remove('border-indigo-500', 'border-b-2');

        blogAnchor.classList.add('text-indigo-500');
        blogSpan.classList.add('border-indigo-500', 'border-b-2');
    }
    else if (str === 1) {
        newsAnchor.classList.add('text-indigo-500');
        newsSpan.classList.add('border-indigo-500', 'border-b-2');

        blogAnchor.classList.remove('text-indigo-500');
        blogSpan.classList.remove('border-indigo-500', 'border-b-2');
    }
    // else {
    //     newsAnchor.classList.add('text-indigo-500');
    //     newsSpan.classList.add('border-indigo-500', 'border-b-2');
    // }
}