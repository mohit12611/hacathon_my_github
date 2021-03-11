let aside_top = document.querySelector("aside_top");

let aside_top_repos = document.querySelector("aside_top_repos");

let form_users = document.getElementById("form_users");

let user = "";

let user_repo_name = "";

form_users.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    var input_users = document.getElementById("input_users").value;

    input_users = input_users.split(" ").join("");

    fetch(
      "https://api.github.com/search/users?q=" +
        input_users +
        "in:user&per_page=20"
    )
      .then((result) => result.json())
      .then((data) => {
        console.log(data);

        data.items.forEach((item) => {
          user += `<a href='${item.html_url}' class="users_list" target="_blank">${item.login}</a><br>`;

          let users_found = document.getElementById("users_found_div");

          users_found.innerHTML = user;
        });

        let users_list = document.querySelectorAll(".users_list");

        console.log(users_list);

        for (let i of users_list) {
          i.addEventListener("click", display_repos);
        }

        function display_repos() {
          let = document.getElementById("aside_top_repos");

          fetch(`https://api.github.com/users/${this.innerHTML}/repos`)
            .then((res) => res.json())
            .then((data) => {
              data.forEach((repo) => {
                user_repo_name += `<li><a href="${repo.html_url}" target="_blank">${repo.full_name}</a></li>`;

                let unordered_li = document.getElementById("myUL");

                let aside_top_repos = document.getElementById(
                  "aside_top_repos"
                );

                unordered_li.innerHTML = user_repo_name;

                aside_top_repos.append(unordered_li);
              });
            });
        }
      });
  }
});

let form_repos = document.getElementById("myform");

form_repos.addEventListener("keyup", function myFunction() {
  var input, filter, ul, li, a, i, txtValue;

  input = document.getElementById("search");

  filter = input.value.toUpperCase();

  ul = document.getElementById("myUL");

  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
});
