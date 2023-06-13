import { getProperties } from "../services/PropertiesServices.js";

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf } from "../utils/getExchangeRate.js";

import { PropertyData } from "../Data/userId.js";
import renderCall from "../propiedad/render.js";


export default async function apiCallMapProp() {
	localStorage.removeItem('globalResponse');
	renderCall();
	
}


