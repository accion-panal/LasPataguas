import { AboutInformation } from "../Data/userId.js";

const loadInformation = () => {
    /* LLENAR INFORMACION DE MISION */
    /*  rescatar value por su id */
    let mision = document.getElementById('mision-info');
    if (mision !== null) {
        mision.innerHTML = `
        <h4 style="font-weight: bold;font-size: 20px; color:#e2e2e2;" >MISIÓN</h4>
        <p style="color: #e2e2e2;" >
            ${AboutInformation.mision}
        </p>
            `;
    }

    /* LLENAR INFORMACION DE VISION */
    /*  rescatar value por su id */
    let vision = document.getElementById('vision-info');
    if (vision !== null) {
        vision.innerHTML = `
        <h4 style="font-weight: bold;font-size: 20px;color:#e2e2e2;" >VISIÓN</h4>
        <p style="color: #e2e2e2;" >
        ${AboutInformation.vision}

        </p>
            `;
    }

    let nosotros = document.getElementById('nosotros-info');
    if (nosotros !== null) {
        nosotros.innerHTML = `<p style="color:#e2e2e2;">
        ${AboutInformation.nosotros}
        </p>
            `;
    }

}

loadInformation();