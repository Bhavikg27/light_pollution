document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({firstName, lastName, email, username, password })
      });
  
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('email', email);
        localStorage.setItem('username', username);
        localStorage.setItem('token', result.token)
        
        alert('Signup successful');
        window.location.href = 'login.html';  // Redirect to login page
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error('Error during signup', err);
    }
  });
