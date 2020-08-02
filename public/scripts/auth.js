// auth.onAuthStateChanged(user => {
//     if (user) {
//       console.log('user logged in: ', user);
//       db.collection('guides').get().then(snapshot => {
//         setupGuides(snapshot.docs);
//       });
//     } else {
//       console.log('user logged out');
//       setupGuides([]);
//     }
//   })


// const loginForm = document.getElementById('login-form');
// loginForm.addEventListener('submit' , (e) => {
//     e.preventDefault();

//     // Get user Info 
//     const email = loginForm['login-email'].value;
//     const password = loginForm['login-password'].value;
//     console.log(email);

   
// })