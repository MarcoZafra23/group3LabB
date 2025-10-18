document.addEventListener('DOMContentLoaded', () => {
    // Get form and input elements
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Function to show an error message
    function displayError(inputElement, message) {
        let errorEl = inputElement.nextElementSibling;
        if (!errorEl || !errorEl.classList.contains('error-message')) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-message';
            inputElement.parentNode.insertBefore(errorEl, inputElement.nextSibling);
        }
        errorEl.textContent = message;
        errorEl.style.display = 'block'; 
    }

    // Function to clear errors
    function clearError(inputElement) {
        const errorEl = inputElement.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-message')) {
            errorEl.style.display = 'none'; 
        }
    }

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        let isValid = true;
        
        // Email validation
        clearError(emailInput);
        if (emailInput.value.trim() === '') {
            displayError(emailInput, 'Email is required.');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            displayError(emailInput, 'Invalid email format.');
            isValid = false;
        }

        // Password validation
        clearError(passwordInput);
        if (passwordInput.value.trim() === '') {
            displayError(passwordInput, 'Password is required.');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
             displayError(passwordInput, 'Password must be 6+ characters.');
             isValid = false;
        }

        // If valid, submit (mock)
        if (isValid) {
            alert('Mock Login Successful!');
            form.reset();
        }
    });

    // Clear errors when user types
    emailInput.addEventListener('input', () => clearError(emailInput));
    passwordInput.addEventListener('input', () => clearError(passwordInput));
});
