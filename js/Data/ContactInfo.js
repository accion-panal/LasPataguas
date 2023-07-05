import { ContactInformation } from "../Data/userId.js";

const loadInformation = () => {
    const dataHorario = ContactInformation.horario;


    let footerPhone = document.getElementById('footer-phone-ContactInfo');
    if (footerPhone !== null) {
        footerPhone.innerHTML = `
        <p style="color:#B3B3B3;">
            <i class="fa fa-phone fa-lg p-1"></i>
            ${ContactInformation.footerPhone}
        </p>`;
    }

    let footerEmail = document.getElementById('footer-email-ContactInfo');
    if (footerEmail !== null) {
        footerEmail.innerHTML = `
        <p style="color:#B3B3B3;">
            <i class="fa fa-envelope fa-lg  p-1"></i>
            ${ContactInformation.footerEmail}
        </p>`;
    }


    let phone = document.getElementById('phone-ContactInfo');
    if (phone !== null) {
        phone.innerHTML = `
        <p style="font-size: 18px">
            <i class="fa fa-phone fa-lg  p-1"></i>
            ${ContactInformation.phone}
        </p>
            `;
    }

    let email = document.getElementById('email-ContactInfo');
    if (email !== null) {
        email.innerHTML = `
        <p style="font-size: 18px">
            <i class="fa fa-envelope fa-lg  p-1"></i>
            ${ContactInformation.email}
        </p>
            `;
    }

    let horario = document.getElementById('horario-ContactInfo');
    if (horario !== null) {
        horario.innerHTML=
    `
    <div class="row p-2">
        <div class="col-lg-10">
            <p style="font-size: 18px;color:#f2f2f2">
            <i class="fa fa-clock-o fa-lg p-1"></i>

            ${ContactInformation.horario}
            </p>
        </div>
    </div>
   `
    }
}

loadInformation();