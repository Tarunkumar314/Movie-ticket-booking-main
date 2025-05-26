const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container_signup_signin');

function signUpValidateForm() {
	var x = document.forms["sign-up-form"]["sign-up-name"].value;
	if (x == "") {
		//   alert("'Name' can not be empty!!");
		asAlertMsg({
			type: "error",
			title: "Empty Field",
			message: "'Name' can not be empty!!",

			button: {
				title: "Close Button",
				bg: "Cancel Button"
			}
		});
		return false;
	}
	x = document.forms["sign-up-form"]["sign-up-email"].value;
	if (x == "") {
		//   alert("'Email' can not be empty!!");
		asAlertMsg({
			type: "error",
			title: "Empty Field",
			message: "'E-mail' can not be empty!!",

			button: {
				title: "Close Button",
				bg: "Cancel Button"
			}
		});
		return false;
	}
	x = document.forms["sign-up-form"]["sign-up-passwd"].value;
	if (x == "") {
		//   alert("'Password' can not be empty!!");
		asAlertMsg({
			type: "error",
			title: "Empty Field",
			message: "'Password' can not be empty!!",

			button: {
				title: "Close Button",
				bg: "Cancel Button"
			}
		});
		return false;
	}
}

function signInValidateForm() {

	x = document.forms["sign-in-form"]["sign-in-email"].value;
	if (x == "") {
		//   alert("'Email' can not be empty!!");
		asAlertMsg({
			type: "error",
			title: "Empty Field",
			message: "'E-mail' can not be empty!!",

			button: {
				title: "Close Button",
				bg: "Cancel Button"
			}
		});
		return false;
	}
	x = document.forms["sign-in-form"]["sign-in-passwd"].value;
	if (x == "") {
		//   alert("'Password' can not be empty!!");
		asAlertMsg({
			type: "error",
			title: "Empty Field",
			message: "'Password' can not be empty!!",

			button: {
				title: "Close Button",
				bg: "Cancel Button"
			}
		});
		return false;
	}
}

const signUpForm = document.forms["sign-up-form"];
const signInForm = document.forms["sign-in-form"];

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Perform client-side validation first
    if (signUpValidateForm() === false) {
        return;
    }

    const name = signUpForm["sign-up-name"].value;
    const email = signUpForm["sign-up-email"].value;
    const password = signUpForm["sign-up-passwd"].value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Handle successful registration (e.g., show a success message, redirect)
            asAlertMsg({
                type: "success",
                title: "Success",
                message: data.message || "User registered successfully!",
                button: { title: "Close" }
            });
            // Optionally switch to sign-in form after successful registration
            container.classList.remove("right-panel-active");
        } else {
            // Handle registration errors
            asAlertMsg({
                type: "error",
                title: "Registration Failed",
                message: data.message || "Something went wrong.",
                button: { title: "Close" }
            });
        }
    } catch (error) {
        console.error('Error:', error);
        asAlertMsg({
            type: "error",
            title: "Error",
            message: "An error occurred during registration.",
            button: { title: "Close" }
        });
    }
});

signInForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Perform client-side validation first
    if (signInValidateForm() === false) {
        return;
    }

    const email = signInForm["sign-in-email"].value;
    const password = signInForm["sign-in-passwd"].value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Handle successful login (e.g., store JWT token, redirect)
            asAlertMsg({
                type: "success",
                title: "Success",
                message: data.message || "User logged in successfully!",
                button: { title: "Close" }
            });
            // Store the JWT token in localStorage
            localStorage.setItem('token', data.token);
            // Redirect to the main application page.
            window.location.href = 'index.html';
        } else {
            // Handle login errors
            asAlertMsg({
                type: "error",
                title: "Login Failed",
                message: data.message || "Invalid credentials.",
                button: { title: "Close" }
            });
        }
    } catch (error) {
        console.error('Error:', error);
        asAlertMsg({
            type: "error",
            title: "Error",
            message: "An error occurred during login.",
            button: { title: "Close" }
        });
    }
});

// Keep the button listeners for panel switching
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});