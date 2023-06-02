const formEmail = document.getElementById('form-public');


formEmail.addEventListener('submit', function(e) {
    e.preventDefault();


let firstName = document.getElementById('nombre');
let email = document.getElementById('email');
let subject = document.getElementById('sujeto');
let phone = document.getElementById('phone');
let message = document.getElementById('mensaje');


fetch("https://formsubmit.co/ajax/fabian.salas.astete@gmail.com", {
  method: "POST",
  headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
  body: JSON.stringify({
    companyId:0,
    tipo_propiedad:typeOfProperty.value,
    Nombre_apellido: fullName.value,
    Correo : email.value,
    Telefono: phone.value,
    Region:region.value,
    Comuna:comuna.value,
    Dirección:direccion.value,
    Area:area.value,
    termsAndConditions: true,
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('Error al enviar correo',error));

})