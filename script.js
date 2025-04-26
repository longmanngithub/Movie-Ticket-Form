/* Error Handling */

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("user");
    const emailInput = document.getElementById("email");
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordInput = document.getElementById("password");
    const errorMessages = {
        fname: "First name is required",
        lname: "last name is required",
        email: "Email is required",
        phone: "Phone number is required",
        gender: "Gender is required",
        age: "Please enter your age.",
        movie: "Movie selection is required",
        id: "Please upload your ID here",
        password: "Password is required"
    };

    const inputs = form.querySelectorAll("input, select");

    // Validate each input
    
    inputs.forEach(input => {
        input.addEventListener("invalid", function(event) {
            event.preventDefault(); // Prevent submitting the form
            const errorMessage = document.getElementById(`${input.id}-error`);
            if (errorMessage) {
                errorMessage.textContent = errorMessages[input.id];
                errorMessage.classList.add("visible");  // Show error message
            }
        });

        input.addEventListener("input", function() {
            const errorMessage = document.getElementById(`${input.id}-error`);
            if (errorMessage) {
                errorMessage.textContent = "";
                errorMessage.classList.remove("visible");   // Hide error message
            }
        });
    });

    // Validate email and password to make sure they are entered correctly

    emailInput.addEventListener("input", function() {
        const emailError = document.getElementById("email-error");
        if (!emailPattern.test(emailInput.value)) { // If the entered email does not match the pattern, display error message
            emailError.textContent = "Please enter a valid email address";
            emailError.classList.add("visible");
        } else {
            emailError.textContent = "";
            emailError.classList.remove("visible");
        }
    });

    passwordInput.addEventListener("input", function() {
        const passwordError = document.getElementById("password-error");
        if (passwordInput.value.length < 8) {   // Check if the password is 8 characters long
            passwordError.textContent = "Password must be at least 8 characters";
            passwordError.classList.add("visible");
        } else {
            passwordError.textContent = "";
            passwordError.classList.remove("visible");
        }
    });

    // Validate the form before submitting

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
        let isValid = true;

        // Check again if the email is matched the pattern before submitting

        if (!emailInput.value.match(emailPattern)) {
            isValid = false;
            emailInput.dispatchEvent(new Event("invalid"));
        }

        // Check again if the password is matched the pattern before submitting

        if (passwordInput.value.length < 8) {
            isValid = false;
            passwordInput.dispatchEvent(new Event("invalid"));
        }

        // Check if the form is valid

        if (isValid) {
            alert("Form submitted successfully!");
            form.reset();   // Reset the form after submission

            // When user submit the form successfully, it should clear the Upload ID

            const imagePreview = document.getElementById("uploadImg");
            const uploadId = document.getElementById("form-id");
            imagePreview.style.display = 'none'; // Hide the preview image
            uploadId.style.display = 'none'; // Hide the Upload ID
        }
    });

    // Clear the Upload ID when user clicks reset button

    const resetButton = document.getElementById("btnReset");
    resetButton.addEventListener("click", function() {
        // Additional reset actions
        const imagePreview = document.getElementById("uploadImg");
        const uploadId = document.getElementById("form-id");
        imagePreview.style.display = 'none'; // Hide the preview image
        uploadId.style.display = 'none'; // Hide the Upload ID
    });
});

/* Change the color of the selection menu */

document.addEventListener('DOMContentLoaded', (event) => {
    const selects = document.querySelectorAll('.u-select');

    selects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.classList.add('selected'); // Apply black color
            } else {
                this.classList.remove('selected');  // Default color
            }
        });

        // Initial color setup
        if (select.value) {
            select.classList.add('selected');
        } else {
            select.classList.remove('selected');
        }
    });
});

/* Age Restrictions */

document.addEventListener('DOMContentLoaded', () => {
    const ageSelect = document.getElementById('age');
    const movieSelect = document.getElementById('movie');
    const idInput = document.getElementById('id');
    const imagePreview = document.getElementById('uploadImg');
    const idContainer = document.getElementById('form-id');

    // Restricting movies for certain age

    function validateMovieOptions() {
        const ageValue = ageSelect.value;
        const movieOptions = movieSelect.options;

        for (let i = 0; i < movieOptions.length; i++) {
            const option = movieOptions[i];
            option.disabled = true; // disable all options initially
        }

        switch (ageValue) {
            case '7yo':
                movieOptions[1].disabled = false; // Inside Out 2
                break;
            case '7-13yo':
                movieOptions[1].disabled = false; // Inside Out 2
                movieOptions[2].disabled = false; // My Neighbor Totoro
                break;
            case '13-18yo':
                movieOptions[1].disabled = false; // Inside Out 2
                movieOptions[2].disabled = false; // My Neighbor Totoro
                movieOptions[3].disabled = false; // The Breakfast Club
                break;
            case '18yo':
                for (let i = 1; i < movieOptions.length; i++) {
                    movieOptions[i].disabled = false;   // Enable all options
                }
                break;
        }

        // Reset movie select if the selected option is not valid for the chosen age
        if (movieSelect.value && movieSelect.options[movieSelect.selectedIndex].disabled) {
            movieSelect.value = '';
        }
    }

    // Showing the option for user to upload ID based on the selected option

    function toggleIdInput() {
        if (movieSelect.value === 'the-wolf-of-wall-street') {
            idContainer.style.display = 'block';    // Show Upload ID
            idInput.required = true;
        } else {
            idContainer.style.display = 'none'; // Hide Upload ID
            idInput.required = false;
            idInput.value = '';
            imagePreview.style.display = 'none';    // Hide the preview image
        }
    }

    ageSelect.addEventListener('change', validateMovieOptions); // Add event listener for the selected option

    // If user selected movie before selecting age, prompt them to select the age first

    movieSelect.addEventListener('change', () => {
        if (!ageSelect.value) {
            alert('Please select your age first.');
            movieSelect.value = '';
        }
        toggleIdInput();    
    });

    // Make Preview Image

    idInput.addEventListener('change', () => {
        const file = idInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';   // Show the preview image
            }
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';    // Hide the preview image when user has not yet uploaded the image
        }
    });

    // Initially hide the ID upload field
    idContainer.style.display = 'none';
});

/* Password Toggle */

const passwordField = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function (e) {

    const type = passwordField.getAttribute('type') 
    if (type === 'password') {
        passwordField.setAttribute('type', 'text');
        this.textContent = 'Hide Password';
    } else {
        passwordField.setAttribute('type', 'password');
        this.textContent = 'Show Password';
    }
});