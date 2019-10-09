// function passWord() {
//     var testV = 1;
//     var pass1 = prompt('Please Enter Your Password', ' ');
//     while (testV < 3) {
//         if (!pass1)
//             history.go(-1);
//         if (pass1.toLowerCase() == "ero2019") {
//             alert('Password correct!');
//             window.open('private.html');
//             break;
//         }
//         testV += 1;
//         var pass1 =
//             prompt('Access Denied - Password Incorrect, Please Try Again.', 'Password');
//     }
//     if (pass1.toLowerCase() != "password" & testV == 3)
//         history.go(-1);
//     return " ";
// } 

// Disable password protection
function passWord() {
    window.open('private.html');
}