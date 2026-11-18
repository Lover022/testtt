import SuccessReg from './alfabet/success-reg.js';
import { ValidationPage } from './validation/ValidationPage.js';

const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const surnameInput = document.querySelector('#surname');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const showPassword = document.querySelector('#show-password');
const submitBtn = document.querySelector('#submit-btn');

const nameError = document.getElementById('name-error');
const surnameError = document.getElementById('surname-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

const validationPage = new ValidationPage();
const successReg = new SuccessReg();

function validOrInvalid(inputElement, isValid, errorElement, message) {
    inputElement.classList.toggle('valid', isValid);
    inputElement.classList.toggle('invalid', !isValid);
    errorElement.textContent = message;
}

function getFormData() {
    return {
        firstName: nameInput.value,
        lastName: surnameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };
}

function updateSubmitState() {
    submitBtn.disabled = !validationPage.isFormValid(getFormData());
}

nameInput.addEventListener('input', () => {
    validationPage.validateName(nameInput.value, 'firstName');
    if (validationPage.errors.firstName) {
        validOrInvalid(nameInput, false, nameError, validationPage.errors.firstName.at(-1));
    } else {
        validOrInvalid(nameInput, true, nameError, '');
    }
    updateSubmitState();
});

surnameInput.addEventListener('input', () => {
    validationPage.validateName(surnameInput.value, 'lastName');
    if (validationPage.errors.lastName) {
        validOrInvalid(surnameInput, false, surnameError, validationPage.errors.lastName.at(-1));
    } else {
        validOrInvalid(surnameInput, true, surnameError, '');
    }
    updateSubmitState();
});

emailInput.addEventListener('input', () => {
    validationPage.validateEmail(emailInput.value);
    if (validationPage.errors.email) {
        validOrInvalid(emailInput, false, emailError, validationPage.errors.email.at(-1));
    } else {
        validOrInvalid(emailInput, true, emailError, '');
    }
    updateSubmitState();
});

passwordInput.addEventListener('input', () => {
    validationPage.validatePassword(passwordInput.value);
    if (validationPage.errors.password) {
        validOrInvalid(passwordInput, false, passwordError, validationPage.errors.password.at(-1));
    } else {
        validOrInvalid(passwordInput, true, passwordError, '');
    }
    updateSubmitState();
});

showPassword.addEventListener('change', () => {
    passwordInput.type = showPassword.checked ? 'text' : 'password';
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = getFormData();
    const errors = validationPage.validateForm(data);

    if (errors.firstName) {
        validOrInvalid(nameInput, false, nameError, errors.firstName.at(-1));
    } else {
        validOrInvalid(nameInput, true, nameError, '');
    }

    if (errors.lastName) {
        validOrInvalid(surnameInput, false, surnameError, errors.lastName.at(-1));
    } else {
        validOrInvalid(surnameInput, true, surnameError, '');
    }

    if (errors.email) {
        validOrInvalid(emailInput, false, emailError, errors.email.at(-1));
    } else {
        validOrInvalid(emailInput, true, emailError, '');
    }

    if (errors.password) {
        validOrInvalid(passwordInput, false, passwordError, errors.password.at(-1));
    } else {
        validOrInvalid(passwordInput, true, passwordError, '');
    }

    updateSubmitState();

    if (Object.keys(errors).length === 0) {
        console.log('Form submitted successfully:', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        });
        successReg.writeName(`${data.firstName} ${data.lastName}`);
    }
});

updateSubmitState();
