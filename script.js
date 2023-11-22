let divWraperPost = document.getElementById('api-info');
let postEdit = document.getElementById('post-Edit');
let postContent = document.getElementById('postContent');
let postClose = document.getElementById('close');
let addIcon = document.getElementById("add");
let overlayAdd = document.getElementById("add-add");
let formAdd = document.getElementById("form-id");

function fetchPosts(url, callbackFunction) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            callbackFunction(data);
        })
        .catch(error => {
            console.error('Error fetching data', error);
        });
}

// Create post elements and append them to the wrapper
function createPost(item) {
    let divElement = document.createElement('div');
    divElement.classList.add('post');
    divElement.setAttribute('data-id', item.id);

    let h2PostId = document.createElement('h2');
    h2PostId.textContent = item.id;

    let h3PostTitle = document.createElement('h3');
    h3PostTitle.textContent = item.title;

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'delete post';
    deleteBtn.setAttribute('data-id', item.id);

    divElement.appendChild(h2PostId);
    divElement.appendChild(h3PostTitle);
    divElement.appendChild(deleteBtn);

    divElement.addEventListener('click', function () {
        let id = this.getAttribute('data-id');
        let urlNewLink = `https://jsonplaceholder.typicode.com/posts/${id}`;
        fetchPosts(urlNewLink, function (info) {
            console.log(info);
            overFunc(info);
        });
        console.log('data-id-value', id);
        postEdit.classList.add('activePost');
    });

    // delete function
    deleteBtn.addEventListener('click', function (event) {
        event.stopImmediatePropagation();
        let deleteBtnId = event.target.getAttribute('data-id');
        console.log(deleteBtnId);
        let deleteUrl = `https://jsonplaceholder.typicode.com/posts/${deleteBtnId}`;
        console.log(deleteUrl);

        fetch(deleteUrl, {
            method: "DELETE",
        }).then(() => divElement.remove());
    });

    divWraperPost.appendChild(divElement);
}

// function art
function overFunc(item) {
    let p = document.createElement('p');
    p.textContent = item.body;
    postContent.innerHTML = ''; // Clear existing content
    postContent.appendChild(p);
}

postClose.addEventListener('click', function () {
    postEdit.classList.remove('activePost');
});

addIcon.addEventListener("click", function () {
    overlayAdd.classList.toggle("add-add-active");
});

formAdd.addEventListener("submit", function (e) {
    e.preventDefault();
    let postNewObj = {
        title: e.target[0].value,
    };
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(postNewObj),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((x) => {
            overlayAdd.classList.remove("add-add-active");
            createPost(x);
        });
});

// -----
let inputElement = document.getElementById("input-box");
let addBtn = document.querySelector(".Click");
let ulElementItems = document.querySelector(".ul-list-items");

fetchPosts('https://jsonplaceholder.typicode.com/posts', function (data) {
    data.forEach(element => {
        createPost(element);
    });
});
