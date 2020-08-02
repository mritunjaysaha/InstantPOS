
const customerForm = document.querySelector('#customer-form')
const name = document.getElementById('c-name');
const contact = document.getElementById('c-contact');
const address = document.getElementById('c-address');
let errors = [] ;

customerForm.addEventListener('submit' , (e) => {
   checkInputs();
   if(errors.length > 0) {
       e.preventDefault()
   }
});

function checkInputs () {
    const nameVal = name.value.trim();
    const contactVal = contact.value.trim();
    const addressVal = address.value.trim();

    if(nameVal === '') {
        // show error 
        // add error class
        setErrorFor(name , 'Name cannot be blank')
    } else {
        // add success class 
        setSuccessFor(name)

    }

    if(contactVal === '') {
        // show error 
        // add error class
        setErrorFor( contact, 'Contact Cannot Be Blank')
    } else if (contactVal.length < 10) {
        setErrorFor(contact , 'Min Value 10 Numbers')
    }
     else {
        // add success class 
        setSuccessFor(contact)

    }

    if(addressVal === '') {
        // show error 
        // add error class
        setErrorFor(address , 'Address Cannot Be Blank')
    } else {
        // add success class 
        setSuccessFor(address)

    }
    return true
   
}

function setErrorFor ( input , message) {
        const small = input.nextElementSibling;

        // add error message 
        small.innerText = message
        errors.push(message);

        //add error class
        input.classList.add( 'error-border')
}


function setSuccessFor (input) {
    input.classList.add('success-border');

    const small = input.nextElementSibling;
    // Remove the Error Message
    small.innerText = ''
    // Remove the message
    errors.length = 0
}