
function renderClient(){
    let clientField = document.getElementById("client");
    clientField.innerHTML = "";
    clientField.innerHTML += getRandomClientTemplate();
}

function renderClientNotPaying(){
    let clientFieldIsNotPaying = document.getElementById("client_not_paying");
        clientFieldIsNotPaying.innerHTML ="";
   
    for (let notPayingIndex = 0; notPayingIndex < notPayingClients.length; notPayingIndex++) {
        const notPaying = notPayingClients[notPayingIndex];
              clientFieldIsNotPaying.innerHTML += getRandomClientFieldNotPaying(notPaying, notPayingIndex);
    }
}


function renderCompletedPayment(){
    let paimentComplete = document.getElementById("completed_payment");
    paimentComplete.innerHTML = "";
    for (let ispayedIndex = 0; ispayedIndex < paymentCompleteClients.length; ispayedIndex++) {
        const isAllPaying = paymentCompleteClients[ispayedIndex];
        paimentComplete.innerHTML += getRandomPaymentComplete(isAllPaying, ispayedIndex);
          }
}

function renderTrashClient(){
    let trashClientContainer = document.getElementById("client_delete");
    trashClientContainer.innerHTML  = "";

   for (let trashIndex = 0; trashIndex < trashClients.length; trashIndex++) {
    const trashClientItem = trashClients[trashIndex];
    if (trashClientItem) {
        trashClientContainer.innerHTML += getTrashRandomTemplate(trashClientItem, trashIndex);
    }
}
}

function renderArchivClient(){
    let archivContainer = document.getElementById("client_archiv");
    archivContainer.innerHTML = "";
    
    for (let archivIndex = 0; archivIndex < archivClients.length; archivIndex++) {
        const archievClientItem = archivClients[archivIndex];
        archivContainer.innerHTML += getArchivRandomTemplate(archievClientItem,archivIndex);
    }

}