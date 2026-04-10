const form = document.getElementById('accountForm');
const doneBtn = document.getElementById('doneBtn');
const displayArea = document.getElementById('displayArea');

doneBtn.addEventListener('click', () => {
    // Check if the form is valid based on HTML5 constraints
    if (form.checkValidity()) {
        const fullName = document.getElementById('fullName').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        
        // Get all selected options from the multiple select
        const questions = Array.from(document.getElementById('securityQuestions').selectedOptions)
                               .map(option => option.value);

        // Build the display string
        let output = `Review your entries:\n`;
        output += `Name: ${fullName}\n`;
        output += `Username: ${username}\n`;
        output += `Password: ${password}\n`;
        output += `Email address: ${email}\n`;
        output += `Phone number: ${phone}\n`;
        output += `Security questions:\n`;
        questions.forEach(q => output += `${q}\n`);

        displayArea.innerText = output;
        displayArea.classList.remove('error');
    } else {
        displayArea.innerText = "Invalid input.";
        displayArea.classList.add('error');
    }
});

// Clear display area when reset is clicked
document.getElementById('resetBtn').addEventListener('click', () => {
    displayArea.innerText = "";
});
