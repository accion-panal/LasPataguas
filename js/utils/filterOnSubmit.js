import { getProperties } from "../services/PropertiesServices.js";

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "./getExchangeRate.js";

import { PropertyData } from "../Data/userId.js";

import api from "../services/AuthencationServices.js"


  

let operationType;
let typeOfProperty;
let region;
let commune;
let min_price;
let max_price;
let bathrooms;
let bedrooms;
let covered_parking_lots;

document.getElementById('flexRadioDefault1').addEventListener('change', mostrarValor);
document.getElementById('flexRadioDefault2').addEventListener('change', mostrarValor);
document.getElementById('flexRadioDefault3').addEventListener('change', mostrarValor);
function mostrarValor(event) {
  operationType = event.target.value;
  console.log(operationType)
}
// document.getElementById('operationType').addEventListener('change',(element) =>{
//     operationType = element.target.value;
//     console.log(element.target.value)
//  });

document.getElementById('typeOfProperty').addEventListener('change' ,(element) => {
  typeOfProperty =  element.target.value;
  // handleSubmit();
    console.log(typeOfProperty)

})
document.getElementById("region").addEventListener( "change", (element) => {
  region = parseInt(element.target.value);  
  console.log(element.target.value)

})
document.getElementById("commune").addEventListener( "change", (element) => {
  commune =  element.target.value;
  console.log(element.target.value)
})

document.getElementById("min_price").addEventListener( "change", (element) => {
  min_price = element.target.value;
  console.log(element.target.value)

})

document.getElementById("max_price").addEventListener( "change", (element) => {
  max_price = element.target.value;
  console.log(element.target.value)

})

document.getElementById("bathrooms").addEventListener( "change", (element) => {
  bathrooms= element.target.value; 
  console.log(element.target.value)

})
document.getElementById("bedrooms").addEventListener( "change", (element) => { 
  bedrooms =  element.target.value;
  console.log(element.target.value)

})
document.getElementById("covered_parking_lots").addEventListener( "change", (element) => {
  covered_parking_lots = element.target.value; 
  console.log(element.target.value)

})

let {companyId, CodigoUsuarioMaestro} = PropertyData;


const handleSubmit = async (event) => {
  // event.preventDefault();

  //* Validar Variables no sean undefined (Necesito meterlo en un object)
  const CreateUrl = {
  operationType : (operationType !== undefined && operationType !== '') ? '&operationType=' + operationType : '',
  typeOfProperty : (typeOfProperty !== undefined && typeOfProperty !== '') ? '&typeOfProperty=' + typeOfProperty : '',
  region : (region !== undefined && region !== '') ? '&region=' + region : '',
  commune : (commune !== undefined && commune !== '') ? '&commune=' + commune : '',
  bedrooms : (bedrooms !== undefined && bedrooms !== '') ? '&bedrooms=' + bedrooms : '',
  bathrooms : (bathrooms !== undefined && bathrooms !== '') ? '&bathrooms=' + bathrooms : '',
  covered_parking_lots : (covered_parking_lots !== undefined && covered_parking_lots !== '') ? '&covered_parking_lots=' + covered_parking_lots : '',
  min_price : (min_price !== undefined && min_price !== '') ? '&min_price=' + min_price : '',
  max_price : (max_price !== undefined && max_price !== '') ? '&max_price=' +max_price: '',
}
  // const createUrl = {
  //   // operationType:
  //   //   operationType?.length > 0
  //   //     ? `&operationType=${operationType}`
  //   //     : '',
  //   typeOfProperty:
  //     typeOfProperty?.length > 0
  //       ? `&typeOfProperty=${typeOfProperty}`
  //       : '',
  //   region:
  //     region?.length > 0
  //       ? `&region=${region}`
  //       : '',
  //   commune:
  //     commune?.length > 0
  //       ? `&commune=${commune}`
  //       : '',
  //   minPrice:
  //     min_price > 0
  //       ? `&min_price=${min_price}`
  //       : '',
  //   maxPrice:
  //     max_price > 0
  //       ? `&max_price=${max_price}`
  //       : '',
  //   bedrooms:
  //     bedrooms?.length > 0
  //       ? `&bedrooms=${bedrooms}`
  //       : '',
  //   bathrooms:
  //     bathrooms?.length > 0
  //       ? `&bathrooms=${bathrooms}`
  //       : '',
  //   coveredParkingLots:
  //     covered_parking_lots?.length > 0
  //       ? `&covered_parking_lots=${covered_parking_lots}`
  //       : '',
  // };


  const url = `properties?page=${1}&limit=${10}&statusId=${1}
  &CodigoUsuarioMaestro=${0}
  &companyId=${1}`+CreateUrl.operationType+CreateUrl.typeOfProperty+CreateUrl.region+CreateUrl.commune+CreateUrl.min_price+CreateUrl.max_price+CreateUrl.bedrooms+CreateUrl.bathrooms+CreateUrl.covered_parking_lots;

  console.log(CreateUrl);

  operationType = CreateUrl.operationType.replace('&operationType=', '');
  typeOfProperty = CreateUrl.typeOfProperty.replace('&typeOfProperty=', '');
  region = CreateUrl.region.replace('&region=', '');
  commune = CreateUrl.commune.replace('&commune=', '');
  bedrooms = CreateUrl.bedrooms.replace('&bedrooms=', '');
  bathrooms = CreateUrl.bathrooms.replace('&bathrooms=', '');
  covered_parking_lots = CreateUrl.covered_parking_lots.replace('&covered_parking_lots=', '');
  min_price = CreateUrl.min_price.replace('&min_price=', '');
  max_price = CreateUrl.max_price.replace('&max_price=','');

//   try {
//     const response = await api.get(url);
//     response.data;
//     // response.data.length === 0
//     //       ? 'Lo sentimos, tu busqueda no coincide con nuestros registros'
//     //       : '';
//   } catch (error) {
//     console.log(error);
//    }
//  };

document.getElementById('buscar2').addEventListener('click', async ()=> {
  handleSubmit();
    const response2= await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response2?.UFs[0]?.Valor
    const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
    // console.log(filtred);


  try {
    let response = await getProperties(CreateUrl);
    let data = response.data;
    data.data === 0 ? 'Lo sentimos, tu busqueda no coincide con nuestros registros': '';
    document.getElementById("totalItems").innerHTML = `<div>${response.meta.totalItems} Propiedades encontradas
    </div>`;
    setTimeout(() => {
      document.getElementById("buscar2").innerHTML = `Buscar`;
      window.scroll({
        top: 500,
        behavior: "smooth",
      });
    });

  } catch (error) {
    console.log(error);
   }

  });

// const onFormSubmit = (
//     statusId,
//     companyId,
//     operationType,
//     typeOfProperty,
//     region,
//     commune,
//     min_price,
//     max_price,
//     bathrooms,
//     bedrooms,
//     covered_parking_lots
//   ) => {
//     return getPropertiesOnForm(
//       statusId,
//       companyId,
//       operationType,
//       typeOfProperty,
//       region,
//       commune,
//       min_price,
//       max_price,
//       bathrooms,
//       bedrooms,
//       covered_parking_lots 
//     );
//   };

  // let query = {
  //   page:1,
  //   limit:10,
  //   realtorId: 0,
  //   statusId:1,
  //   companyId:1,
  //   operationType : "",
  //   typeOfProperty: "",
  //   region : "",
  //   commune: "",
  //   min_price: "",
  //   max_price: "",
  //   bathrooms: "",
  //   bedrooms: "",
  //   covered_parking_lots: "",
  // }

  let aux = new URLSearchParams(window.location.search);

  for (let p of aux) {
    query[`${p[0]}`] = p[1];
  }


// document.getElementById("buscar")?.addEventListener("click", async () => {
// 	window.open(
// 		window.location.origin +
// //   handleSubmit();

// 			`/properties.html?page=${query.page}&limit=${query.limit}&realtorId=${query.realtorId}&statusId=${query.statusId}&operationType=${query.operationType}&typeOfProperty=${query.typeOfProperty}&region=${'Santiago'}&commune=${'Huechuraba'}&min_price=${query.min_price}&max_price=${query.max_price}&covered_parking_lots=${query.covered_parking_lots}&bathrooms=${query.bathrooms}&bedrooms=${query.bedrooms}`
// 	);
// });

// document.getElementById('buscar2')?.addEventListener('click', async() => {
//   console.log('buscando');
  
//   document.getElementById(
// 		"buscar2"
// 	).innerHTML = ` <div class="spinner-border" role="status">
// 		<span class="visually-hidden">Loading...</span>
// 	</div>`;
// 	// let  response  = await getProperties(0,1,1);
//   // const data = response.data;
//   // let filtred = await onFormSubmit(
//   //   1,
//   //   1,
//   //   query?.operationType,
//   //   query?.typeOfProperty,
//   //   query?.region,
//   //   query?.commune,
//   //   query?.min_price,
//   //   query?.max_price,
//   //   query?.bathrooms,
//   //   query?.bedrooms,
//   //   query?.covered_parking_lots
//   //   )    
  
//   const response2= await ExchangeRateServices.getExchangeRateUF();
//   const ufValue = response2?.UFs[0]?.Valor
//   const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
//   // console.log(filtred);
// 	// document.getElementById("totalItems").innerHTML = `<div>${filtred.meta.totalItems} Propiedades encontradas
// 	// </div>`;
// 	setTimeout(() => {
// 		document.getElementById("buscar2").innerHTML = `Buscar`;
// 		window.scroll({
// 			top: 500,
// 			behavior: "smooth",
// 		});
   

//   document.getElementById("container-cards").innerHTML = filtred.data.map((data) => 
//         `<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-2" >
//         <div class="property-item">
//                 <a href="/property-single.html?${data.id}&statusId=${1}&companyId=${1}" class="img">
//                     <img src="images/img_1.jpg" alt="Image" class="img-fluid">
//                 </a>
//                 <div class="property-content text-start" style="padding: 10px 10px 10px 10px;">
//                     <h2 class="textLimitClass" style="font-weight: bold; padding-left:40px">${data.title}</h2>
//                     <div>
//                         <p class="text-center" style="font-size: 15px; ">
//                             UF ${clpToUf(data.price, ufValueAsNumber)} - CLP ${parseToCLPCurrency(data?.price)}
//                         </p>
//                         <p class="text-center" style="font-size: 15px;"> 
//                         <i class="fa fa-map-marker fa-lg"></i> ${data.address != undefined && data.address != "" && data.address != null ? data.address: "No registra dirección"}, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune: "No registra comuna"} , ${data.city != undefined && data.city != "" && data.city != null ? data.city: "No registra ciudad"}, Chile</p>	
//                         <div class="row p-3 text-center">
//                             <div class="col-4 hr-l">
//                                 <div class="row ">
//                                     <div class="col-12"><h5>M2</h5></div>
//                                     <div class="col-12">${data.surface_m2 != undefined && data.surface_m2 != "" && data.surface_m2 != "null" && data.surface_m2 != null ? data.surface_m2 : "0"} M²</div>
//                                 </div>
//                             </div>
//                             <div class="col-4 hr-l">
//                                 <div class="row ">
//                                     <div class="col-12"><h5>Hab</h5></div>
//                                     <div class="col-12">${data.bedrooms != undefined && data.bedrooms != "" && data.bedrooms != "null" && data.bedrooms != null ? data.bedrooms : "0"}</div>
//                                 </div>
//                             </div>
//                             <div class="col-4">
//                                 <div class="row">
//                                     <div class="col-12"><h5>Baño(s)</h5></div>
//                                     <div class="col-12">${data.bathrooms != undefined && data.bathrooms != "" && data.bathrooms != "null" && data.bathrooms != null ? data.bathrooms : "0"}</div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="text-center">
//                             <p>${data.types} / ${data.operation}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//     </div>
//         `).join("");

// 	}, 3000);
  
};
