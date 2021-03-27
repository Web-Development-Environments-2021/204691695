//------ Emojy Handle
tinymce.init({
        selector: "#Message",
        plugins: "emoticons",
        toolbar: "emoticons",
        toolbar_location: "bottom",
        menubar: false
});


//------- form handles
const usernameEl = document.querySelector('#Name');
const emailEl = document.querySelector('#Email');
const messageEl = document.querySelector('#Message');
const form = document.querySelector('#fcf-form-id');
const checkUsername = () => {
    let valid = false;

    const min = 3,max = 25;
    const isBetween = (length, min, max) => length < min || length > max ? false : true;
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isRequired = value => value === '' ? false : true;

const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}
form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail();

    let isFormValid = isUsernameValid &&
        isEmailValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        mailto_link = "mailto:nachmant@post.bgu.ac.il?subject=" + "To Linus" +" &cc="+emailEl.value+ " &body=" + tinymce.get("Message").getContent({ format: "text" });
        let link = document.createElement('a');
        link.href = mailto_link;
        link.click();
        alert("Thanks for Contacting me! refresh the page to send another message")
    }
});
const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};
form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
    }
}));