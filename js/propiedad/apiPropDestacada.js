import { getProperties } from "../services/PropertiesServices.js"

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf } from "../utils/getExchangeRate.js";

export default async function apiDestCall() {
    let {data} = await getProperties(1, 10,0, 1, 1);
    let filtrado = data.filter(data => data.highlighted != null && data.highlighted  != false );

    const response2 = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response2?.UFs[0]?.Valor;
    const ufValueAsNumber = parseFloat(ufValue.replace(",", "."));

    document.getElementById('container-prop-destacada').innerHTML = filtrado.map(data => `
    <li class="splide__slide" style="margin-left:5px">
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
                    </li>`).join('');

                    let splide = new Splide(".splide", {
                        type: "loop",
                        drag :"free",
                        autoplay: "play",
                        perPage: 3,
                        breakpoints: {
                          1399: {
                            perPage: 2,
                          },
                          991: {
                            perPage: 1,
                          }
                        }
                    });
                    splide.mount();

}

document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	splide.mount();
});

apiDestCall()