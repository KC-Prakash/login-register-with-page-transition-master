window.addEventListener('load', function () {
	document.body.classList.add('hide')
})

const allLink = document.querySelectorAll('a')

allLink.forEach(item=> {
	item.addEventListener('click', function (e) {
		e.preventDefault()
		document.body.classList.remove('hide')
		setTimeout(()=> {
			window.location.href = this.href
		}, 500)
	})
})

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordMatchMessage = document.getElementById('password-match-message');
    const passwordMeter = document.getElementById('password-meter');
    const form = document.getElementById('signup-form');

    // Listen for changes in password input to update the strength meter and check password match
    passwordInput.addEventListener('input', () => {
        updatePasswordStrength();
        checkPasswordMatch();
    });

    // Listen for changes in confirm password input to check password match
    confirmPasswordInput.addEventListener('input', checkPasswordMatch);

    // Prevent form submission if passwords do not match
    form.addEventListener('submit', (e) => {
        if (confirmPasswordInput.value !== passwordInput.value) {
            e.preventDefault();
            alert('Passwords must match before submitting the form.');
        }
    });

    // Function to update password strength meter
    function updatePasswordStrength() {
        const password = passwordInput.value;
        if (password === "") {
            // Hide password strength message when password field is empty
            passwordMeter.textContent = '';
            passwordMeter.style.color = '';
        } else {
            const strength = evaluatePasswordStrength(password);
            passwordMeter.textContent = `Strength: ${strength.message}`;
            passwordMeter.style.color = strength.color;
        }
    }

    // Function to check if passwords match
    function checkPasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // If confirm password field is empty, hide the match message
        if (confirmPassword === "") {
            passwordMatchMessage.textContent = '';
        } else if (confirmPassword === password) {
            passwordMatchMessage.textContent = 'Passwords match!';
            passwordMatchMessage.style.color = 'green';
        } else {
            passwordMatchMessage.textContent = 'Passwords do not match.';
            passwordMatchMessage.style.color = 'red';
        }
    }

    // Function to evaluate password strength
    function evaluatePasswordStrength(password) {
        let strength = { message: 'Weak', color: 'red' };

        // Define strength criteria using regular expressions
        const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        const mediumPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{6,}$/;
        const moderatePattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-ZaZ\d@$!%*?&#]{6,}$/;

        // Evaluate password strength based on patterns
        if (strongPattern.test(password)) {
            strength = { message: 'Strong', color: 'green' };
        } else if (mediumPattern.test(password)) {
            strength = { message: 'Medium', color: 'orange' };
        } else if (moderatePattern.test(password)) {
            strength = { message: 'Moderate', color: 'yellow' };
        }

        return strength;
    }
});

