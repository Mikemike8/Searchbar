const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")


let  users = [ ]

searchInput.addEventListener("input", (e) => {
    // targeting input value
    const value = e.target.value.toLowerCase();
   
    users.forEach(user => {
        const isVisible = user.name.toString().toLowerCase().includes(value) || user.email.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible);  // Toggle visibility based on the filter
    });
});



fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {

    users = data.map(user => {
    //     <template data-user-template>
    //     <div class="card">
    //         <div class="header"data-header></div>
    //         <div class="body" data-body> </div>
    //     </div>
    // </template>
             // clone tempalate card
            const card = userCardTemplate.content.cloneNode(true).children[0]
            // first div
            const header = card.querySelector("[data-header]")
            //last div
            const body = card.querySelector("[data-body]")
          
            header.textContent = user.name
            body.textContent = user.email
           //adding name and email data it to the userCardContainer div to div with "[data-header]" or "[data-body]" 
            userCardContainer.append(card)
             
            
        //  retuning the data only once   
            return { name: user.name , email: user.email, element: card}
            

        });
      


    });
