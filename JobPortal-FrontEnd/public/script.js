const loginBox = document.getElementById('login-box');
const registerBox = document.getElementById('register-box');
const loginUserType = document.getElementById('loginUserType');
const registerUserType = document.getElementById('registerUserType');

const tabJobSeeker = document.getElementById('tab-jobseeker');
const tabHR = document.getElementById('tab-hr');

function setUserType(type) {
  loginUserType.value = type;
  registerUserType.value = type;
}

tabJobSeeker.addEventListener('click', () => {
  tabJobSeeker.classList.add('active');
  tabHR.classList.remove('active');
  setUserType('jobseeker');
});

tabHR.addEventListener('click', () => {
  tabHR.classList.add('active');
  tabJobSeeker.classList.remove('active');
  setUserType('hr');
});

// Toggle between login and register forms
document.getElementById('show-register').addEventListener('click', (e) => {
  e.preventDefault();
  loginBox.classList.add('hidden');
  registerBox.classList.remove('hidden');
});

document.getElementById('show-login').addEventListener('click', (e) => {
  e.preventDefault();
  registerBox.classList.add('hidden');
  loginBox.classList.remove('hidden');
});

// Simple form handlers (demo only)
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert(`Login Successful ✅ as ${loginUserType.value}`);
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert(`Account Created Successfully 🎉 as ${registerUserType.value}`);
});
