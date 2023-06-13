// import { getProperties } from "../services/PropertiesServices.js";

// import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

// import {parseToCLPCurrency, clpToUf} from "./getExchangeRate.js";

// import { PropertyData } from "../Data/userId.js";

// import api from "../services/AuthencationServices.js"


  

// let operationType;
// let typeOfProperty;
// let region;
// let commune;
// let min_price;
// let max_price;
// let bathrooms;
// let bedrooms;
// let covered_parking_lots;

// document.getElementById('flexRadioDefault1').addEventListener('change', mostrarValor);
// document.getElementById('flexRadioDefault2').addEventListener('change', mostrarValor);
// document.getElementById('flexRadioDefault3').addEventListener('change', mostrarValor);
// function mostrarValor(event) {
//   operationType = event.target.value;
//   console.log(operationType)
// }
// // document.getElementById('operationType').addEventListener('change',(element) =>{
// //     operationType = element.target.value;
// //     console.log(element.target.value)
// //  });

// document.getElementById('typeOfProperty').addEventListener('change' ,(element) => {
//   typeOfProperty =  element.target.value;
//   // handleSubmit();
//     console.log(typeOfProperty)

// })
// document.getElementById("region").addEventListener( "change", (element) => {
//   region = parseInt(element.target.value);  
//   console.log(element.target.value)

// })
// document.getElementById("commune").addEventListener( "change", (element) => {
//   commune =  element.target.value;
//   console.log(element.target.value)
// })

// document.getElementById("min_price").addEventListener( "change", (element) => {
//   min_price = element.target.value;
//   console.log(element.target.value)

// })

// document.getElementById("max_price").addEventListener( "change", (element) => {
//   max_price = element.target.value;
//   console.log(element.target.value)

// })

// document.getElementById("bathrooms").addEventListener( "change", (element) => {
//   bathrooms= element.target.value; 
//   console.log(element.target.value)

// })
// document.getElementById("bedrooms").addEventListener( "change", (element) => { 
//   bedrooms =  element.target.value;
//   console.log(element.target.value)

// })
// document.getElementById("covered_parking_lots").addEventListener( "change", (element) => {
//   covered_parking_lots = element.target.value; 
//   console.log(element.target.value)

// })

// let {companyId, CodigoUsuarioMaestro} = PropertyData;


// const handleSubmit = async (event) => {
//   // event.preventDefault();

//   //* Validar Variables no sean undefined (Necesito meterlo en un object)
//   const CreateUrl = {
//   operationType : (operationType !== undefined && operationType !== '') ? '&operationType=' + operationType : '',
//   typeOfProperty : (typeOfProperty !== undefined && typeOfProperty !== '') ? '&typeOfProperty=' + typeOfProperty : '',
//   region : (region !== undefined && region !== '') ? '&region=' + region : '',
//   commune : (commune !== undefined && commune !== '') ? '&commune=' + commune : '',
//   bedrooms : (bedrooms !== undefined && bedrooms !== '') ? '&bedrooms=' + bedrooms : '',
//   bathrooms : (bathrooms !== undefined && bathrooms !== '') ? '&bathrooms=' + bathrooms : '',
//   covered_parking_lots : (covered_parking_lots !== undefined && covered_parking_lots !== '') ? '&covered_parking_lots=' + covered_parking_lots : '',
//   min_price : (min_price !== undefined && min_price !== '') ? '&min_price=' + min_price : '',
//   max_price : (max_price !== undefined && max_price !== '') ? '&max_price=' +max_price: '',
// }
//   // const createUrl = {
//   //   // operationType:
//   //   //   operationType?.length > 0
//   //   //     ? `&operationType=${operationType}`
//   //   //     : '',
//   //   typeOfProperty:
//   //     typeOfProperty?.length > 0
//   //       ? `&typeOfProperty=${typeOfProperty}`
//   //       : '',
//   //   region:
//   //     region?.length > 0
//   //       ? `&region=${region}`
//   //       : '',
//   //   commune:
//   //     commune?.length > 0
//   //       ? `&commune=${commune}`
//   //       : '',
//   //   minPrice:
//   //     min_price > 0
//   //       ? `&min_price=${min_price}`
//   //       : '',
//   //   maxPrice:
//   //     max_price > 0
//   //       ? `&max_price=${max_price}`
//   //       : '',
//   //   bedrooms:
//   //     bedrooms?.length > 0
//   //       ? `&bedrooms=${bedrooms}`
//   //       : '',
//   //   bathrooms:
//   //     bathrooms?.length > 0
//   //       ? `&bathrooms=${bathrooms}`
//   //       : '',
//   //   coveredParkingLots:
//   //     covered_parking_lots?.length > 0
//   //       ? `&covered_parking_lots=${covered_parking_lots}`
//   //       : '',
//   // };


//   const url = `properties?page=${1}&limit=${10}&statusId=${1}
//   &CodigoUsuarioMaestro=${0}
//   &companyId=${1}`+CreateUrl.operationType+CreateUrl.typeOfProperty+CreateUrl.region+CreateUrl.commune+CreateUrl.min_price+CreateUrl.max_price+CreateUrl.bedrooms+CreateUrl.bathrooms+CreateUrl.covered_parking_lots;

//   console.log(CreateUrl);

//   operationType = CreateUrl.operationType.replace('&operationType=', '');
//   typeOfProperty = CreateUrl.typeOfProperty.replace('&typeOfProperty=', '');
//   region = CreateUrl.region.replace('&region=', '');
//   commune = CreateUrl.commune.replace('&commune=', '');
//   bedrooms = CreateUrl.bedrooms.replace('&bedrooms=', '');
//   bathrooms = CreateUrl.bathrooms.replace('&bathrooms=', '');
//   covered_parking_lots = CreateUrl.covered_parking_lots.replace('&covered_parking_lots=', '');
//   min_price = CreateUrl.min_price.replace('&min_price=', '');
//   max_price = CreateUrl.max_price.replace('&max_price=','');

// //   try {
// //     const response = await api.get(url);
// //     response.data;
// //     // response.data.length === 0
// //     //       ? 'Lo sentimos, tu busqueda no coincide con nuestros registros'
// //     //       : '';
// //   } catch (error) {
// //     console.log(error);
// //    }
// //  };

// document.getElementById('buscar2').addEventListener('click', async ()=> {
//   handleSubmit();
//     const response2= await ExchangeRateServices.getExchangeRateUF();
//     const ufValue = response2?.UFs[0]?.Valor
//     const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
//     // console.log(filtred);


//   try {
//     let response = await getProperties(CreateUrl);
//     let data = response.data;
//     data.data === 0 ? 'Lo sentimos, tu busqueda no coincide con nuestros registros': '';
//     document.getElementById("totalItems").innerHTML = `<div>${response.meta.totalItems} Propiedades encontradas
//     </div>`;
//     setTimeout(() => {
//       document.getElementById("buscar2").innerHTML = `Buscar`;
//       window.scroll({
//         top: 500,
//         behavior: "smooth",
//       });
//     });

//   } catch (error) {
//     console.log(error);
//    }

//   });


//   let aux = new URLSearchParams(window.location.search);

//   for (let p of aux) {
//     query[`${p[0]}`] = p[1];
//   }

  
// };
