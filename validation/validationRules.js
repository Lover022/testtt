export const validationRules = {
    firstName: {
        required: true,
        lettersOnly: "^[A-Za-zА-ЩЬЮЯа-щьюяІіЇїЄєҐґ]+$",
        firstCapital: "^[A-ZА-ЩЬЮЯІЇЄҐ]",
        errorMessages: {
            required: "First name is required",
            lettersOnly: "Only English or Ukrainian letters are allowed",
            firstCapital: "Name must start with a capital letter"
        }
    },
    lastName: {
        required: true,
        lettersOnly: "^[A-Za-zА-ЩЬЮЯа-щьюяІіЇїЄєҐґ]+$",
        firstCapital: "^[A-ZА-ЩЬЮЯІЇЄҐ]",
        errorMessages: {
            required: "Surname is required",
            lettersOnly: "Only English or Ukrainian letters are allowed",
            firstCapital: "Surname must start with a capital letter"
        }
    },
    email: {
        required: true,
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        errorMessages: {
            required: "Email is required",
            pattern: "Invalid email address"
        }
    },
    password: {
        required: true,
        minLength: 8,
        uppercase: "(?=.*[A-ZА-ЩЬЮЯІЇЄҐ])",
        lowercase: "(?=.*[a-zа-щьюяіїєґ])",
        number: "(?=.*\\d)",
        specialCharacter: "(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])",
        noSpace: "\\s",
        errorMessages: {
            required: "Password is required",
            minLength: "Password must be at least 8 characters long",
            uppercase: "Password must contain at least one uppercase letter",
            lowercase: "Password must contain at least one lowercase letter",
            number: "Password must contain at least one number",
            specialCharacter: "Password must contain at least one special character",
            noSpace: "Password cannot contain spaces"
        }
    }
};
