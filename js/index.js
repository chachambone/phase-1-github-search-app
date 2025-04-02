const BASE_URL = "https://api.github.com/";

document.addEventListener("DOMContentLoaded",()=>{
    console.log("Content loaded");

    const form = document.getElementById("github-form");
    const search = document.getElementById("search");

    const userList = document.getElementById("user-list");
    const repoList = document.getElementById("repos-list");

    
    form.addEventListener("submit",(event)=>{
        event.preventDefault()
        userList.innerHTML = ""

        const name = search.value.trim();

        fetch(`${BASE_URL}search/users?q=${name}`,{headers:{
            "Accept": "application/vnd.github.v3+json"
        }})
        .then(response => response.json ())
    .then (users => {
        console.log(users)
        users.items.forEach(element => {

            const userItem = document.createElement("div");
            userItem.classList.add("menu-item")
            
            userItem.innerHTML = `
    
                <h3>${element.login}</h3>
                <img src="${element.avatar_url}" alt="${element.avatar_url}" class="avater-image">
            
            `;

            const button = userItem.querySelector(".avater-image");
            button.addEventListener("click",(event)=>{
                event.preventDefault()
                console.log(event)
                repoList.innerHTML = ""

                fetch(`${BASE_URL}users/${element.login}/repos`)
                .then(response => response.json ())
                .then(repos=>{
                    console.log(repos)
                    repos.forEach(repo=>{
                        console.log(repo)

                        const repoItem = document.createElement("div");
                        repoItem.classList.add("menu-item")
            
            repoItem.innerHTML = `
    
                <h3>${repo.full_name}</h3>
            
            `;
            repoList.appendChild(repoItem);

                    })

                })
            })

            
    
            userList.appendChild(userItem);
        });    
    })
    .catch(error => console.log(error))
    })

    

});
