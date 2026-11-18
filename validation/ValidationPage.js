import { validationRules } from './validationRules.js';

export class ValidationPage {
    constructor() {
        this.errors = {};
    }

    static validatePattern(value, pattern) {
        const regex = new RegExp(pattern);
        return regex.test(value);
    }

    static validateMinLength(value, minLength) {
        if (!value) {
            return false;
        }
        return value.length >= minLength;
    }

    static validateFirstCapital(value) {
        return /^[A-ZА-ЩЬЮЯІЇЄҐ]/.test(value);
    }

    validateName(value, fieldName) {
        const rule = validationRules[fieldName];
        this.errors[fieldName] = [];

        if (!value || value.trim() === '') {
            this.errors[fieldName].push(rule.errorMessages.required);
        } else {
            if (!ValidationPage.validatePattern(value, rule.lettersOnly)) {
                this.errors[fieldName].push(rule.errorMessages.lettersOnly);
            }
            if (!ValidationPage.validateFirstCapital(value)) {
                this.errors[fieldName].push(rule.errorMessages.firstCapital);
            }
        }

        if (this.errors[fieldName].length === 0) {
            delete this.errors[fieldName];
        }
    }

    validateEmail(email) {
        const rule = validationRules.email;
        this.errors.email = [];

        if (!email || email.trim() === '') {
            this.errors.email.push(rule.errorMessages.required);
        } else if (!ValidationPage.validatePattern(email, rule.pattern)) {
            this.errors.email.push(rule.errorMessages.pattern);
        }

        if (this.errors.email.length === 0) {
            delete this.errors.email;
        }
    }

    validatePassword(password) {
        const rule = validationRules.password;
        this.errors.password = [];

        if (!password) {
            this.errors.password.push(rule.errorMessages.required);
        } else {
            if (!ValidationPage.validateMinLength(password, rule.minLength)) {
                this.errors.password.push(rule.errorMessages.minLength);
            }
            if (!ValidationPage.validatePattern(password, rule.uppercase)) {
                this.errors.password.push(rule.errorMessages.uppercase);
            }
            if (!ValidationPage.validatePattern(password, rule.lowercase)) {
                this.errors.password.push(rule.errorMessages.lowercase);
            }
            if (!ValidationPage.validatePattern(password, rule.number)) {
                this.errors.password.push(rule.errorMessages.number);
            }
            if (!ValidationPage.validatePattern(password, rule.specialCharacter)) {
                this.errors.password.push(rule.errorMessages.specialCharacter);
            }
            if (ValidationPage.validatePattern(password, rule.noSpace)) {
                this.errors.password.push(rule.errorMessages.noSpace);
            }
        }

        if (this.errors.password.length === 0) {
            delete this.errors.password;
        }
    }

    validateForm(data) {
        this.errors = {};
        this.validateName(data.firstName, 'firstName');
        this.validateName(data.lastName, 'lastName');
        this.validateEmail(data.email);
        this.validatePassword(data.password);
        return this.errors;
    }

    isFormValid(data) {
        const checker = new ValidationPage();
        const errors = checker.validateForm(data);
        return Object.keys(errors).length === 0;
    }
}
