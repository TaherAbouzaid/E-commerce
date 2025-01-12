document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('changePassword').addEventListener('click', changePassword);
    document.getElementById('logout').addEventListener('click', logout);
    document.getElementById('form').addEventListener('submit', handleRegistration);
    document.getElementById('userIcon').addEventListener('click', toggleSidebar);
});


function handleRegistration(event) {
    event.preventDefault(); 


    let fname = document.getElementById('fname').value;
    let lname = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pass').value;

    let nameRegex = /^[a-zA-Z]{3,20}$/;
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let passRegex = /^[a-zA-Z0-9]{8,20}$/;

    let isValid = true;

  
    if (!nameRegex.test(fname)) {
        document.getElementById('fnameError').innerText = 'Enter a valid first name';
        isValid = false;
    } else {
        document.getElementById('fnameError').innerText = 'Valid';
    }


    if (!nameRegex.test(lname)) {
        document.getElementById('lnameError').innerText = 'Enter a valid last name';
        isValid = false;
    } else {
        document.getElementById('lnameError').innerText = 'Valid';
    }

    if (!emailRegex.test(email)) {
        document.getElementById('emailError').innerText = 'Enter a valid email';
        isValid = false;
    } else {
        document.getElementById('emailError').innerText = 'Valid';
    }

    if (!passRegex.test(pass)) {
        document.getElementById('passError').innerText = 'Enter a valid password (8-20 chars)';
        isValid = false;
    } else {
        document.getElementById('passError').innerText = 'Valid';
    }


    if (isValid) {
        let user = {
            name: `${fname} ${lname}`,
            email: email,
            password: pass
        };
        saveUserData(user); 
        alert('Registration successful!');
         window.location.href = '../index.html';
    } else {
        alert('Registration failed! Please correct the errors.');
    }
}


function saveUserData(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    console.log('User data saved:', user);
}


function getUserData() {
    let user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}


function displayUserData() {
    let user = getUserData();
    let userDataElement = document.getElementById('userData');
    userDataElement.innerHTML = ''; 

    if (user) {
        userDataElement.innerHTML = `Name: ${user.name}<br>Email: ${user.email}`;
    } else {
        userDataElement.innerHTML = `
            <p>You are not logged in.</p>
            <button id="regButton" class="reg-button">Go to regestration</button>
        `;
        
        document.getElementById('regButton').addEventListener('click', () => {
            window.location.href = 'Reg.html'; 
        });
    }
}






function changePassword() {
    let newPassword = prompt('Enter your new password:');
    if (newPassword) {
        let user = getUserData();
        if (user) {
            user.password = newPassword;
            saveUserData(user);
            alert('Password updated successfully!');
        }
    }
}


function logout() {
    sessionStorage.removeItem('user');
    alert('Logged out successfully!');
    document.getElementById('sidebar').style.display = 'none';
}



function toggleSidebar() {
    let sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
    } else {
        displayUserData(); 
        sidebar.classList.add('show');
    }
}
