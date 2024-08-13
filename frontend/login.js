document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.token);
        alert('Login successful');
        window.location.href = 'index.html';  // Redirect to stargazing page
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error('Error during login', err);
    }
  });

