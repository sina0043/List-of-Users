(function () {
  "use strict";
  let filter = document.querySelector('input');

  async function getPosts() {
    try {
      let res = await fetch(
          "https://randomuser.me/api/?inc=name,picture&results=48"
        ),
        posts = await res.json(),
        output = "";
        
      if (res.ok) {
        for (let i in posts.results) {
          output += `
        <div class='user text-center mt-5'>
          <img class='rounded-circle mx-2 mx-md-4' src="${posts.results[i].picture.medium}" alt="">
          <p class='userName'>${posts.results[i].name.first}<br>${posts.results[i].name.last}</p>
        </div>
        `;
        }
        document.querySelector(".users").innerHTML = output;
      } else {
        throw Error(res.status);
      }

      filter.addEventListener('input' , userFilter)
    } catch (err) {
      console.log(err.name +'  ===>  '+ err.message);
    }
  }

  getPosts();

  function userFilter() {
    let UsersName = document.querySelectorAll('.userName')
    UsersName.forEach((UserName)=>{
      if(UserName.innerText.toLowerCase().includes(filter.value.toLowerCase())) {
        UserName.closest('.user').style.display = 'block';
      }else {
        UserName.closest('.user').style.display = 'none';
      }
    })
  }
})();
