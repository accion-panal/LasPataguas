import { getProperties } from "../services/PropertiesServices.js"

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js";

import { PropertyData } from "../Data/userId.js";

export default async function apiCallMapProp() {
  const {CodigoUsuarioMaestro,companyId,realtorId} = PropertyData;

  const response = await getProperties(1, 10,CodigoUsuarioMaestro, 1, companyId, realtorId);
  const data = response.data;

  const response2 = await ExchangeRateServices.getExchangeRateUF();
  const ufValue = response2?.UFs[0]?.Valor
  const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

  const filtroSelect = document.getElementById('FilterPrice');
  filtroSelect.addEventListener('change', handleFilterChange);
  showItems();

  function handleFilterChange() {
    const selectedValue = filtroSelect.value;
    console.log(selectedValue);
    console.log(data);
  
    let dataOrdenada;
  
    if (selectedValue === 'MayorMenor') {
      /* console.log('La opción seleccionada es MayorMenor'); */
      dataOrdenada = data.sort((a, b) => b.price - a.price);
    } else {
      /* console.log('La opción seleccionada es Menor mayor'); */
      dataOrdenada = data.sort((a, b) => a.price - b.price);
    }
    console.log(dataOrdenada);
    showItems();
  }

  document.getElementById("totalItems").innerHTML = `<div>${response.meta.totalItems} Propiedades encontradas </div>`


  function showItems() {
    document.getElementById('card-prop-map').innerHTML = data.map(data => 
      `	
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-12 mb-2" >
                        <div class="property-item">
								<a href="/property-single.html?${data.id}&statusId=${1}&companyId=${1}" class="img">
									<img src="images/img_1.jpg" alt="Image" class="img-fluid">
								</a>
								<div class="property-content text-start" style="padding: 10px 10px 10px 10px;">
									<h2 class="textLimitClass" style="font-weight: bold; padding-left:40px;font-size:24px;">${data.title}</h2>
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
					</div>
  ` ).join("");


  } 


}

