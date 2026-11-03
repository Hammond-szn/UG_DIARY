document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  sessionStorage.setItem('loggedIn', 'true');
  window.location.href = 'phase2.html';
});