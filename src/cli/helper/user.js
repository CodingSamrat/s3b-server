import ApiManager from "./apiManager.js"
import inquirer from 'inquirer';


export async function getAllUsers() {
    try {
        const { data } = await ApiManager.get(`/auth/get`)

        return data.users
    } catch (error) {
        console.log(error?.message)
        console.log('> ', error?.response?.data?.error)
    }
}


export async function deleteUser(id) {
    try {
        const { data } = await ApiManager.delete(`/auth/delete/${id}`)

        return data
    } catch (error) {
        console.log(error?.message)
        console.log('> ', error?.response?.data?.error)
    }
}


export async function createUser(body) {
    try {
        const { data } = await ApiManager.post(`/auth/create`, body)

        return data
    } catch (error) {
        console.log(error?.message)
        console.log('> ', error?.response?.data?.error)
    }
}


// Function to prompt for user 
export async function promptCreateUser() {
    // Define the questions for the registration form
    const questions = [
        {
            type: 'input',
            name: 'username',
            message: 'Username:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your username.';
                }
            }
        },
        {
            type: 'password',
            name: 'password',
            message: 'Password:',
            mask: '*',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your password.';
                }
            }
        },
        {
            type: 'input',
            name: 'fullName',
            message: 'Full name:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Email:',
            validate: function (value) {
                // Simple email validation regex
                const pass = value.match(
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                );
                if (pass) {
                    return true;
                } else {
                    return 'Please enter a valid email address.';
                }
            }
        },
        {
            type: 'input',
            name: 'mobile',
            message: 'Mobile number:',
            validate: function (value) {
                // Simple mobile number validation to check for digits only
                const pass = value.match(
                    /^\d+$/
                );
                if (pass) {
                    return true;
                } else {
                    return 'Please enter a valid mobile number.';
                }
            }
        },
        {
            type: 'confirm',
            name: 'isAdmin',
            message: 'Admin user?',
            default: false
        }
    ];

    // Prompt the user with the questions
    const answers = await inquirer.prompt(questions);
    return answers;

}