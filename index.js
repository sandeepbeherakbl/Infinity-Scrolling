const container = document.getElementById("container");

let limit = 25;
let pageCount = 1;
let postCount = 1;
var stop;

const getPost = async() => {
    let res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}$_page=${pageCount}`);
    let data = await res.json();
    let end = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    let s = await end.json();
    stop = s.length;
    console.log(stop)
    data.map((el) => {
        const htmlData = `
        <div class="posts">
            <p class="post-id">${pageCount++}</p>
            <img class="image" src=${el.url}/>
            <h2 class="title">${el.title}</h2>
        </div>`;
        container.insertAdjacentHTML('beforeend', htmlData);
    })
}
getPost();

const showData = async() => {
    setTimeout(() => {
        pageCount++;
        getPost();
    }, 300)
}

window.addEventListener('scroll', () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    console.log(pageCount, stop);
    if (scrollTop + clientHeight >= scrollHeight) {
        console.log("I'm bottom");
        showData();
    }

})