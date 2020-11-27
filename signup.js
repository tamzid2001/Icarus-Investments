const signupForm = document.querySelector('#signup-form');
const signupButton = document.querySelector('.signup-button');
signupButton.addEventListener('click', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['user-input'].value;
  const password = signupForm['password-input'].value;
  const pass2 = signupForm['password-input-repeat'].value;

  if(password == pass2){

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      email: signupForm['user-input'].value
    });
  }).then(() => {
    // close the signup modal & reset form
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = ''
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  })
} else {
  signupForm.querySelector('.error').innerHTML = "Passwords must match";
}
});