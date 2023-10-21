const [form] = document.forms;
const [emailFeedback, passwordFeedback] =
  document.querySelectorAll('.feedback');

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
  toggler.addEventListener('change', (e) => {
    elements.forEach((element) => {
      element.setAttribute('type', e.target.checked ? 'text' : 'password');
    });
  });
};

const getElement = (name, e) => {
  return {
    email(e) {
      e.target.classList.toggle('border-danger', !isEmailValid(e.target.value));
      emailFeedback.textContent = isEmailValid(e.target.value)
        ? null
        : 'Provide a valid email address';
    },
    password(e) {
      e.target.classList.toggle(
        'border-danger',
        !isPasswordValid(e.target.value)
      );
      passwordFeedback.textContent = isPasswordValid(e.target.value)
        ? null
        : 'Password must be at least 7 characters long and contain 1 capital letter and 1 symbol or number';
    },
  }[name](e);
};

const handleInput = (e) => {
  const { email, password, btn } = form;
  const { name } = e.target;

  getElement(name, e);

  btn.disabled = !validation(email.value, password.value);
};

document.addEventListener('DOMContentLoaded', () => {
  toggleShowPassword(form.showPassword, [form.password]);

  form.email.addEventListener('input', handleInput);

  form.password.addEventListener('input', handleInput);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const submittedValue = {
      email: email.value,
      password: password.value,
    };
    const postLogin = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submittedValue),
    });

    if (postLogin.status === 200) {
      window.location.href = '/dashboard';
    } else {
      alert('Wrong email or password');
    }

    // Check console to see the result
    console.log(submittedValue);
  });

  const logout = document.querySelector('#logout');
  logout.addEventListener('click', async (e) => {
    e.preventDefault();
    const postLogout = await fetch('/api/login', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (postLogout.status === 200) {
      window.location.href = '/';
    } else {
      alert('You are not logged in yet');
      console.log("You got this response code from the server: " + postLogout.status);
    }
  });
  // add/move logout button to dashboard page
  // add to dashboard page - list of users projects
  // add register form
  // add register button
  // add register route
  // add register controller
});


