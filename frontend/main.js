



window.start = async () => {
  const response = await fetch("/api/my-projects");
  console.log(response);
  const { projects, innerFiles, markdownContent, markdownContent2, markdownContent3 } = await response.json();
  console.log(innerFiles);
  //console.log(projects);
  const list = projects.map((project) => `<button id="${project}" class="dropdown-item">${project}</button>`).join("");
  console.log(list);
  //const listFiles = innerFiles.map((innerFile) => `<p class="dropdown-item">${innerFile}</p>`).join("");
  //console.log(listFiles);
  document.querySelector("#project-list").innerHTML = list;
  //document.querySelector("#projectDir").innerHTML = listFiles;
  const loggedInRes = await fetch("/api/login");
  const loggedInUser = await loggedInRes.json();
  const userFirstName = loggedInUser.firstName;
  const userLastName = loggedInUser.lastName;
  document.querySelector(
    "#currentUser"
  ).innerHTML = `<p>Logged in as: ${userFirstName} ${userLastName}</p>`;
  console.log(loggedInUser);
  //console.log(markdownContent);

  if (loggedInUser) {
    document.getElementById('logout')
      .className = "visible float-right mr-2";
    document.getElementById('login')
      .className = "invisible";
  } else {
    document.getElementById('logout')
      .className = "invisible";
    document.getElementById('login')
      .className = "visible";
  }

  // Fix so that the eventlistener can listen to all the different projects // not DONE

  let content = document.getElementById(projects[0]);
  content.addEventListener("click", myFunc);


  // TODO : Fix the path for images in the markdown file // not DONE

  // Fix on click event for the dropdown menu // not Done

  function myFunc() {
    if (content.innerHTML === projects[0]) {
      var simplemde = new SimpleMDE({ placeholder: "Start making your own markdown presentation...", renderingConfig: { codeSyntaxHighlighting: true }, element: document.getElementById("file-input") });
      simplemde.value(markdownContent);
    } else if (content.innerHTML === projects[1]) {
      var simplemde = new SimpleMDE({ placeholder: "Start making your own markdown presentation...", renderingConfig: { codeSyntaxHighlighting: true }, element: document.getElementById("file-input") });
      simplemde.value(markdownContent2);
    } else if (content.innerHTML === projects[2]) {
      var simplemde = new SimpleMDE({ placeholder: "Start making your own markdown presentation...", renderingConfig: { codeSyntaxHighlighting: true }, element: document.getElementById("file-input") });
      simplemde.value(markdownContent3);
    } else {
      console.log("No project selected")
    }
  }


  // TODO : Fix the path for images in the markdown file // not DONE


  /* var simplemde = new SimpleMDE({ placeholder: "Start making your own markdown presentation...", renderingConfig: { codeSyntaxHighlighting: true }, element: document.getElementById("file-input") });
  simplemde.value(markdownContent); */

  const logout = document.querySelector("#logout");
  logout.addEventListener("click", async (e) => {
    e.preventDefault();
    const postLogout = await fetch("/api/login", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (postLogout.status === 200) {
      window.location.href = "/";
      alert("You are now logged out");
    } else {
      alert("You are not logged in yet");
      console.log(
        "You got this response code from the server: " + postLogout.status
      );
    }
  });
};



//////////////////////////////////////////////

window.login = () => {
  const [form] = document.forms;
  console.log("hej");
  const [emailFeedback, passwordFeedback] =
    document.querySelectorAll(".feedback");

  const isEmailValid = (email) => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
      email
    );
  };

  const isPasswordValid = (password) => {
    return /^((?=.*[a-z])|(?=.*[a-z])(?=.*[^\w\d\s])|(?=.*[^\w\d\s])|(?=.*[a-z])(?=.*[^\w\d\s])).{7,30}$/gm.test(
      password
    );
  };

  const validation = (email, password) => {
    return isEmailValid(email) && isPasswordValid(password);
  };

  const toggleShowPassword = (toggler, elements) => {
    toggler.addEventListener("change", (e) => {
      elements.forEach((element) => {
        element.setAttribute("type", e.target.checked ? "text" : "password");
      });
    });
  };

  const getElement = (name, e) => {
    return {
      email(e) {
        e.target.classList.toggle(
          "border-danger",
          !isEmailValid(e.target.value)
        );
        emailFeedback.textContent = isEmailValid(e.target.value)
          ? null
          : "Provide a valid email address";
      },
      password(e) {
        e.target.classList.toggle(
          "border-danger",
          !isPasswordValid(e.target.value)
        );
        passwordFeedback.textContent = isPasswordValid(e.target.value)
          ? null
          : "Password must be at least 7 characters long";
      },
    }[name](e);
  };

  const handleInput = (e) => {
    const { email, password, btn } = form;
    const { name } = e.target;

    getElement(name, e);

    btn.disabled = !validation(email.value, password.value);
  };

  toggleShowPassword(form.showPassword, [form.password]);

  form.email.addEventListener("input", handleInput);

  form.password.addEventListener("input", handleInput);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const submittedValue = {
      email: email.value,
      password: password.value,
    };
    const postLogin = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submittedValue),
    });

    if (postLogin.status === 200) {
      window.location.href = "/";
    } else {
      alert("Wrong email or password");
    }

    // Check console to see the result
    console.log(submittedValue);
  });

  const logout = document.querySelector("#logout");
  logout.addEventListener("click", async (e) => {
    e.preventDefault();
    const postLogout = await fetch("/api/login", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (postLogout.status === 200) {
      window.location.href = "/";
    } else {
      alert("You are not logged in yet");
      console.log(
        "You got this response code from the server: " + postLogout.status
      );
    }
  });
  // add/move logout button to start page
  // add to start page - list of users projects
};
// navigering

document.body.addEventListener("click", (e) => {
  let a = e.target.closest("a");
  if (!a) {
    return;
  }
  let href = a.getAttribute("href");
  if (href[0] !== "/") {
    return;
  }
  e.preventDefault();
  window.history.pushState(null, null, href);
  navigate();
});

async function navigate() {
  let l = location.pathname.slice(1) || "start";
  console.log(l);
  let view = await (await fetch("/views/" + l + ".html")).text();
  document.querySelector("main").innerHTML = view;
  let func = window[l];
  console.log(func);
  func && func();
}
window.onpopstate = navigate;
