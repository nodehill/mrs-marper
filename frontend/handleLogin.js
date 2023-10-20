export default function handleLogin() {
  const login = document.getElementById('loginForm');

  form.addEventListener('submit', onLoginSubmit);

  function onLoginSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const dataObject = Object.fromEntries(data.entries());
    console.log(dataObject);
  }

  async function postLogin() {
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataObject),
  });
  }

  async function checkLogin() {
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      console.log("logged in");
    } else {
      const { error } = await response.json();
      alert(error + "wrong username or password");
      console.log("error, wrong username or password");
      console.log(error);
    }
  }
  postLogin().then(checkLogin);
}
