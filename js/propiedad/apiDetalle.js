import { getPropertiesForId } from "../services/PropertiesServices.js";
import ExchangeRateServices from "../services/ExchangeRateServices.js";
import { parseToCLPCurrency, clpToUf } from '../utils/getExchangeRate.js';

export default async function apiDetalleCall(id, realtorId,statusId, companyId) {

    let { data } = await getPropertiesForId(id,realtorId, statusId, companyId);
    const response = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response?.UFs[0]?.Valor
    const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
    const ufValueAsNumber2 = parseInt(ufValue.replace('.', '').replace(',', '.'));

    let img ="";

    /* INFORMACION REALTOR */
    document.getElementById('name-realtor').innerHTML = `
    <p><b style="font-size: 35px;color:#1a1a1a">${data.realtor.name} ${data.realtor.lastName != null && data.realtor.lastName != undefined ? data.realtor.lastName : ""}</b></p>`;
    document.getElementById('email-realtor').innerHTML = `
    <p style="font-size: 18px;font-weight:500;color:#1a1a1a">${data.realtor.mail}</p>`;
    document.getElementById('phone-realtor').innerHTML = `
    <p style="font-size: 18px;font-weight:500;color:#1a1a1a;"> ${data.realtor.contactPhone != null && data.realtor.contactPhone!= '' ? data.realtor.contactPhone : 'No tiene número de contacto'}</p>`;


    /* Informacion principal */
    document.getElementById('title-prop').innerHTML = `
    <h1 style="font-weight: bold;color: #4b4b4b;">
		${data.title  != undefined ? data.title :  "No Cuenta con titulo"}
    </h1>`;
    document.getElementById('tipo-oper-prop').innerHTML = `
    <span style="color:#B3B3B3;">${data.types} / ${data.operation}</span>
    `;
    /* Direccion en Info */
    document.getElementById('dire-prop').innerHTML = `
        <p style="color:#cfcfcf;font-size:22px;">
            <i class="fa fa-map-marker fa-lg  p-1"></i>
            ${data.address != null && data.address != undefined && data.address != "" ? data.address : "No registra Direccion"}, ${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra región"}, Chile
        </p>
    `;

    console.log(data.address,)
    document.getElementById('cod-prop').innerHTML = `
            <p style="color:#cfcfcf;font-size:22px;">
				REF: ${data.id}
			</p> `;

     
        
    /* Imagenes en splide */
    data.images.forEach((images, index) => {img += ` 
        <li class="splide__slide ${ index === 0 ? "active" : ""}"> 
            <img src="${images.replace(/\\/g, "//") !== undefined ? images.replace(/\\/g, "//")  : 'Ir a'}" class="img-detalle-prop"/>
        </li>	
    `})
    document.getElementById('carrucel-img').innerHTML = `
        <li class="splide__slide">${img != undefined ? img :'https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg'}</li>
    `; 
    let splide = new Splide(".splide", {
        type: "fade",
        rewind:true,
        autoplay: true,

    });
    splide.mount();
    /* Fin Imagenes en splide */

    // ${data.currency.isoCode != 'CLP' ? `UF ${data.price} - CLP ${parseToCLPCurrency(data.price * ufValueAsNumber2)}` : `UF ${clpToUf(data.price, ufValueAsNumber)} - CLP ${parseToCLPCurrency(data?.price)}`}

    if(data.currency.isoCode != 'CLP'){
        document.getElementById('uf-prop').innerHTML =
        `<b style="font-size: 50px;color:#4b4b4b;" >UF ${data.price}</b>`;

        document.getElementById('clp-prop').innerHTML =
        `<b style="font-size: 50px;color:#4b4b4b" >CLP ${parseToCLPCurrency(data.price * ufValueAsNumber2)}</b>`;
    }else {
        document.getElementById('uf-prop').innerHTML =
        `<b style="font-size: 50px;color:#4b4b4b" >UF ${clpToUf(data.price, ufValueAsNumber)}</b>`;

        document.getElementById('clp-prop').innerHTML =
        `<b style="font-size: 50px;color:#4b4b4b" >CLP ${parseToCLPCurrency(data?.price)}</b>`;
    }





    /* Descripcion/Caracteristicas */
    document.getElementById('descrip-prop').innerHTML = `
    <div class="col-12 pt-5"><h2 style="color:#4b4b4b;">Descripción</h2></div>
    <div class="col-12">
    <p style="color:#B3B3B3;">	${data?.description || 'No cuenta con descripción'}</p>    
    </div>
    `;

    document.getElementById('caract-prop').innerHTML = `
                            <div class="row text-center">
								<div class="col-6 p-2" style="min-width: 126px">
									<div style="font-size: 30px;color:#cfcfcf">
										<i class="fa fa-bed" style="font-size: 40px;padding-left: 6px;padding-right: 6px;"></i>
										${data.bedrooms != null && data.bedrooms != undefined && data.bedrooms != "" ? data.bedrooms : "0"}
									</div>
								</div>
								<div class="col-6 p-2" style="min-width: 126px">
									<div style="font-size: 30px;color:#cfcfcf">
										<i class="fa fa-toilet  " style="font-size: 40px;padding-left: 6px;padding-right: 6px;"></i>
										${data.bathrooms != null && data.bathrooms != undefined && data.bathrooms != "" ? data.bathrooms : "0"}
									</div>
								</div>
								<div class="col-6 p-2" style="min-width: 126px">
									<div style="font-size: 30px;color:#cfcfcf">
										<i class="fa fa-m  " style="font-size: 40px;padding-left: 6px;"></i><i class="fa fa-2  " style="font-size: 40px;padding-right: 6px;"></i>
										${data.surface_m2 != null && data.surface_m2 != undefined && data.surface_m2 != "" ? data.surface_m2 : "0"}
									</div>

								</div>
								<div class="col-6 p-2" style="min-width: 126px">
									<div style="font-size: 30px;color:#cfcfcf">
										<i class="fa fa-car " style="font-size: 40px;padding-left: 6px;padding-right: 6px;"></i>
										${data.covered_parking_lots != null && data.covered_parking_lots != undefined && data.covered_parking_lots != "" ? data.covered_parking_lots : "0"}
									</div>
								</div>
							</div>`;

    /* MAPA */
    /* Direccion en Mapa */
    document.getElementById('dire-map-prop').innerHTML = `
    <h2 style="color: #4b4b4b;">Ubicacion de la Propiedad</h2>
    <p style="padding-left: 14px;color:#B3B3B3;">${data.address != null && data.address != undefined && data.address != "" ? data.address : "No registra Direccion"}, ${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra región"}, Chile</p>`;

    /* CONTACTO */


}

