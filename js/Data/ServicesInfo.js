import { servicesInformation } from '../Data/userId.js'

const loadInformation =()=>{
    const { cards } = servicesInformation

    /* LLENAR INFORMACION DE Cards*/
    let card = document.getElementById('card-info');
    if (card !== null) {
        card.innerHTML = cards.map((data)=>`
        <div class="col-lg-3 col-md-4 col-sm-10 d-flex justify-content-center m-2 mb-5">
            <div class="row card-services">
                <div class="col-lg-12 p-3 " style="padding-bottom: 0!important;" >
                    <img src="${data.icon}" class="  mt-2" width="140px" height="140px" alt="">
                </div>
                <div class="col-12 p-3">
                    <h3 style="font-weight: bold; color: #eeeeee;">${data.title}</h3>
                    <p style="font-size: 16px;color:#eeeeee; font-weight:400">
                    ${data.descrip}
                        <br><br>
                    </p>
                    ${data.btnCard != false ? `<button type="submit" class="btn btn-services"><a href="#id_formulario" style="text-decoration: none;">Completar formulario</a> </button>`: ''}
                </div>
            </div>
    </div>
        `).join('');
    };

};
loadInformation();