
export default function handleLogin() {
  const loginForm = document.querySelector("loginForm");
  loginForm.addEventListener("submit", onFormSubmit);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      alert(result.error);
    } else {
      alert("You are now logged in!");
    }
  }
}