document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        document.getElementById('message').innerText = 'Login successful!';
        // Redirect to dashboard
        window.location.href = '/dashboard.html';
      } else {
        document.getElementById('message').innerText = 'Invalid credentials.';
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').innerText = 'An error occurred. Please try again.';
    }
  });
  