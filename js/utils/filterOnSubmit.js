import { getPropertiesOnForm } from "../services/PropertiesServices.js";

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "./getExchangeRate.js";
 

const onFormSubmit = (
    statusId,
    companyId,
    operationType,
    typeOfProperty,
    region,
    commune,
    min_price,
    max_price,
    bathrooms,
    bedrooms,
    covered_parking_lots
  ) => {
    return getPropertiesOnForm(
      statusId,
      companyId,
      operationType,
      typeOfProperty,
      region,
      commune,
      min_price,
      max_price,
      bathrooms,
      bedrooms,
      covered_parking_lots 
    );
  };

  let query = {
    page:1,
    limit:10,
    realtorId: 0,
    statusId:1,
    companyId:1,
    operationType : "",
    typeOfProperty: "",
    region : "",
    commune: "",
    min_price: "",
    max_price: "",
    bathrooms: "",
    bedrooms: "",
    covered_parking_lots: "",
  }

  let aux = new URLSearchParams(window.location.search);

  for (let p of aux) {
    query[`${p[0]}`] = p[1];
  }



  
// document.getElementById('operationType').addEventListener('change',(element) =>{
//     console.log(element.target.value)
//     query.operationType = element.target.value;
//  });

 document.getElementById('typeOfProperty').addEventListener('change' ,(element) => {
    query.typeOfProperty =  element.target.value;
})
document.getElementById("region").addEventListener( "change", (element) => {
 query.region = parseInt(element.target.value);  
 console.log(element.target.value)

})
document.getElementById("commune").addEventListener( "change", (element) => {
    query.commune =  element.target.value;
    console.log(element.target.value)
  

  })

 document.getElementById("min_price").addEventListener( "change", (element) => {
     query.min_price = element.target.value;
})
  
 document.getElementById("max_price").addEventListener( "change", (element) => {
    query.max_price= element.target.value;
})
  
 document.getElementById("bathrooms").addEventListener( "change", (element) => {
    query.bathrooms= element.target.value; 
})
document.getElementById("bedrooms").addEventListener( "change", (element) => { 
     query.bedrooms =  element.target.value;
  
  })


document.getElementById("covered_parking_lots").addEventListener( "change", (element) => {
    query.covered_parking_lots = element.target.value;  
})


document.getElementById("buscar")?.addEventListener("click", async () => {
	window.open(
		window.location.origin +
			`/properties.html?page=${query.page}&limit=${query.limit}&realtorId=${query.realtorId}&statusId=${query.statusId}&operationType=${query.operationType}&typeOfProperty=${query.typeOfProperty}&region=${query.region}&commune=${query.commune}&min_price=${query.min_price}&max_price=${query.max_price}&covered_parking_lots=${query.covered_parking_lots}&bathrooms=${query.bathrooms}&bedrooms=${query.bedrooms}`
	);
});

document.getElementById('buscar2')?.addEventListener('click', async() => {
  console.log('buscando');
  document.getElementById(
		"buscar2"
	).innerHTML = `    	<div class="spinner-border" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>`;
	// let  response  = await getProperties(0,1,1);
  // const data = response.data;
  let filtred = await onFormSubmit(
    1,
    1,
    query?.operationType,
    query?.typeOfProperty,
    query?.region,
    query?.commune,
    query?.min_price,
    query?.max_price,
    query?.bathrooms,
    query?.bedrooms,
    query?.covered_parking_lots
    )    

  
  const response2= await ExchangeRateServices.getExchangeRateUF();
  const ufValue = response2?.UFs[0]?.Valor


  const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
  console.log(filtred);
	document.getElementById("totalItems").innerHTML = `<div>${filtred.meta.totalItems} Propiedades encontradas
	</div>`;
	setTimeout(() => {
		document.getElementById("buscar2").innerHTML = `Buscar`;
		window.scroll({
			top: 500,
			behavior: "smooth",
		});
   

  document.getElementById("container-cards").innerHTML = filtred.data.map((data) => 
        `<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-2" >
        <div class="property-item">
                <a href="/property-single.html?${data.id}&statusId=${1}&companyId=${1}" class="img">
                    <img src="images/img_1.jpg" alt="Image" class="img-fluid">
                </a>
                <div class="property-content text-start" style="padding: 10px 10px 10px 10px;">
                    <h2 class="textLimitClass" style="font-weight: bold; padding-left:40px">${data.title}</h2>
                    <div>
                        <p class="text-center" style="font-size: 15px; ">
                            UF ${clpToUf(data.price, ufValueAsNumber)} - CLP ${parseToCLPCurrency(data?.price)}
                        </p>
                        <p class="text-center" style="font-size: 15px;"> 
                        <i class="fa fa-map-marker fa-lg"></i> ${data.address != undefined && data.address != "" && data.address != null ? data.address: "No registra dirección"}, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune: "No registra comuna"} , ${data.city != undefined && data.city != "" && data.city != null ? data.city: "No registra ciudad"}, Chile</p>	
                        <div class="row p-3 text-center">
                            <div class="col-4 hr-l">
                                <div class="row ">
                                    <div class="col-12"><h5>M2</h5></div>
                                    <div class="col-12">${data.surface_m2 != undefined && data.surface_m2 != "" && data.surface_m2 != "null" && data.surface_m2 != null ? data.surface_m2 : "0"} M²</div>
                                </div>
                            </div>
                            <div class="col-4 hr-l">
                                <div class="row ">
                                    <div class="col-12"><h5>Hab</h5></div>
                                    <div class="col-12">${data.bedrooms != undefined && data.bedrooms != "" && data.bedrooms != "null" && data.bedrooms != null ? data.bedrooms : "0"}</div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="row">
                                    <div class="col-12"><h5>Baño(s)</h5></div>
                                    <div class="col-12">${data.bathrooms != undefined && data.bathrooms != "" && data.bathrooms != "null" && data.bathrooms != null ? data.bathrooms : "0"}</div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <p>${data.types} / ${data.operation}</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
        `).join("");

	}, 3000);
  
})
