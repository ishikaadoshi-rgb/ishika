document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dataForm');
    const successMessage = document.getElementById('successMessage');
    const resetBtn = document.getElementById('resetBtn');
    
    // Get form elements
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Get error message elements
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');
    
    // Validation patterns
    const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Real-time validation
    nameInput.addEventListener('input', () => validateName());
    phoneInput.addEventListener('input', () => validatePhone());
    emailInput.addEventListener('input', () => validateEmail());
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Reset button functionality
    resetBtn.addEventListener('click', function() {
        resetForm();
    });
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters long';
            nameInput.style.borderColor = '#dc3545';
            return false;
        } else if (name.length > 50) {
            nameError.textContent = 'Name must be less than 50 characters';
            nameInput.style.borderColor = '#dc3545';
            return false;
        } else {
            nameError.textContent = '';
            nameInput.style.borderColor = '#28a745';
            return true;
        }
    }
    
    function validatePhone() {
        const phone = phoneInput.value.trim();
        if (!phone) {
            phoneError.textContent = 'Phone number is required';
            phoneInput.style.borderColor = '#dc3545';
            return false;
        } else if (!phonePattern.test(phone.replace(/[\s\-\(\)]/g, ''))) {
            phoneError.textContent = 'Please enter a valid phone number';
            phoneInput.style.borderColor = '#dc3545';
            return false;
        } else {
            phoneError.textContent = '';
            phoneInput.style.borderColor = '#28a745';
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        if (!email) {
            emailError.textContent = 'Email address is required';
            emailInput.style.borderColor = '#dc3545';
            return false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = '#dc3545';
            return false;
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = '#28a745';
            return true;
        }
    }
    
    function validateForm() {
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();
        
        return isNameValid && isPhoneValid && isEmailValid;
    }
    
    function submitForm() {
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Collect form data
            const formData = {
                name: nameInput.value.trim(),
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim(),
                timestamp: new Date().toISOString()
            };
            
            // Log the collected data (replace with actual data handling)
            console.log('Collected Data:', formData);
            
            // Show success message
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Submit';
            submitBtn.disabled = false;
        }, 1500);
    }
    
    function resetForm() {
        // Reset form
        form.reset();
        form.style.display = 'block';
        successMessage.classList.add('hidden');
        
        // Clear error messages
        nameError.textContent = '';
        phoneError.textContent = '';
        emailError.textContent = '';
        
        // Reset input styles
        nameInput.style.borderColor = '#e1e5e9';
        phoneInput.style.borderColor = '#e1e5e9';
        emailInput.style.borderColor = '#e1e5e9';
        
        // Focus on first input
        nameInput.focus();
    }
    
    // Phone number formatting (optional enhancement)
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        e.target.value = value;
    });
    
    // Auto-focus on first input when page loads
    nameInput.focus();
});
