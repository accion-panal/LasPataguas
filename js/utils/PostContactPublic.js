
const form = document.getElementById('form-public');
let respuesta= document.getElementById('respuesta');


form.addEventListener('submit', function(e) {
    e.preventDefault();

let typeOfProperty = document.getElementById();
let fullName = document.getElementById('nombre');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let region = document.getElementById('region');
let comuna = document.getElementById('commune');
let direccion = document.getElementById('address');
let area = document.getElementById('area');





let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
 
let raw = JSON.stringify({
  "companyId":1,
  "typerProperty":typeOfProperty.value,
  "fullName": fullName.value,
  "email": email.value,
  "phone": phone.value,
  "region":region.value,
  "commune":comuna.value,
  "address":direccion.value,
  "landArea":area.value,
  "termsAndConditions": true,
  "action": "vender",
});
 
let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
//   redirect: 'follow'
};
 
fetch("https://aulen.partnersadvisers.info/contact/2", requestOptions)
  .then(response => response.text())
  .then(result => respuesta.innerHTML = `<div class="alert alert-success" role="alert">
   Formulario enviado exitosamente, Muchas gracias ${firstName.value}!!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
`)
  .catch(error => console.log('error', error))


})

