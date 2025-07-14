
const clients = [];
const notPayingClients = [];
const paymentCompleteClients = [];
const trashClients = [];
const archivClients = [];

function init() {
    loadAllFromLocalStorage();
    updateDateTime();
    renderClient();
    renderClientNotPaying();
    renderCompletedPayment();
    renderTrashClient();
    renderArchivClient();
}

function updateAllViewsAndSave() {
    saveAllToLocalStorage();
    renderClient();
    renderClientNotPaying();
    renderCompletedPayment();
    renderTrashClient();
    renderArchivClient();
}


function getInputValue(id) {
    const input = document.getElementById(id);
    return input ? input.value : "";
}
function moveClientInClient() {
    const clientName = getInputValue("name_of_client");
    const amountDue = getInputValue("received_facture");
    const amountReceived = getInputValue("due_facture");
    const dueDate = getInputValue("date_for_paying");
    if (!contollInputFields(clientName, amountDue, amountReceived, dueDate)) return;
    const newClient = {
        clientName,
        amountDue,
        amountReceived,
        dueDate
    };
    clients.push(newClient);
    console.log("Klient Aufname ins System", clients);
    notPayingClients.push(newClient);
    console.log("Klient not paying", notPayingClients);
    updateAllViewsAndSave();
}

// ALte Version
/* function moveClientInClient() {
    const nameOfClientInput = document.getElementById("name_of_client");
    const clientName = nameOfClientInput.value;
    const receivedFactureInput = document.getElementById("received_facture");
    const amountDue = receivedFactureInput.value;
    const dueFactureInput = document.getElementById("due_facture");
    const amountReceived = dueFactureInput.value;
    const dateForPayingInput = document.getElementById("date_for_paying");
    const dueDate = dateForPayingInput.value;
    if (!contollInputFields(clientName, amountDue, amountReceived, dueDate)) return;
    const newClient = {
        clientName, amountDue, amountReceived, dueDate
    };
    clients.push(newClient);
    console.log("Klient Aufname ins system", clients);
    notPayingClients.push(newClient);
    console.log("Klient not paye ", notPayingClients);
    updateAllViewsAndSave()
}
 */


function moveToPaying(notPayingIndex) {
    const isPayingInputRef = document.getElementById(`is_paying_${notPayingIndex}`);
    const isPaying = isPayingInputRef.value;
    if (isPaying.trim() === "") {
        alert("Bitte das Datumsfeld ausfüllen!");
        return;
    }

    const client = notPayingClients[notPayingIndex];
    client.isPaying = isPaying;
    paymentCompleteClients.push(client);
    notPayingClients.splice(notPayingIndex, 1);   // Entfernt den Eintrag aus notPayingClients

    console.log("bezahlt:", paymentCompleteClients);
    updateAllViewsAndSave()
}



function moveToTrash(paymentCompleteIndex) {
    const client = paymentCompleteClients[paymentCompleteIndex];
    if (!trashClients.includes(client)) {
        trashClients.push(client);
        paymentCompleteClients.splice(paymentCompleteIndex, 1);// endscheidet das es weg ist nach Klick
    }
    console.log("Müll", trashClients);
    updateAllViewsAndSave()
}


function moveToArchiv(paymentCompleteIndex) {
    const client = paymentCompleteClients[paymentCompleteIndex];
    if (!archivClients.includes(client)) {
        archivClients.push(client);
        paymentCompleteClients.splice(paymentCompleteIndex, 1);
    }
    console.log("Archiv", archivClients);
    updateAllViewsAndSave()
}

function moveFromTrashtoPaid(trashIndex) {
    const trashClientMove = trashClients[(trashIndex)];
    if (!paymentCompleteClients.includes(trashClientMove)) {
        paymentCompleteClients.push(trashClientMove);
        trashClients.splice(trashIndex, 1);
    }
    console.log("zurueck zu bezajlt", paymentCompleteClients);
    updateAllViewsAndSave()
}

function moveFromTrashToArchiv(trashIndex) {
    const trashClientTOArchiv = trashClients[trashIndex];
    if (!archivClients.includes(trashClientTOArchiv)) {
        archivClients.push(trashClientTOArchiv);
        trashClients.splice(trashIndex, 1);
    }
    console.log("zureuck to Archiv", archivClients);
    updateAllViewsAndSave()
}

function moveFromArchivToTrash(archivIndex) {
    const archivToTrashItem = archivClients[archivIndex];
    if (!trashClients.includes(archivToTrashItem)) {
        trashClients.push(archivToTrashItem);
        archivClients.splice(archivIndex, 1);
    }
    console.log("Von Archiv back toTrash", trashClients);
    updateAllViewsAndSave()
}

function moveFromArchivToPayed(archivIndex) {
    const archivToPayed = archivClients[archivIndex];
    if (!paymentCompleteClients.includes(archivToPayed)) {
        paymentCompleteClients.push(archivToPayed);
        archivClients.splice(archivIndex, 1);
    }
    console.log("Von Archiv back to Payed", trashClients);
    updateAllViewsAndSave()
}

function contollInputFields(clientName, amountDue, amountReceived, dueDate,) {
    if (
        clientName.trim() === "" ||
        amountDue.trim() === "" ||
        amountReceived.trim() === "" ||
        dueDate.trim() === ""
    ) {
        alert("Bitte alle Felder ausfüllen!");
        return false;
    }
    if (isNaN(amountReceived)) {
        alert("Betragfelder müssen Zahlen sein!");
        return false;
    }
    return true;
}




function updateDateTime() {
    let date = document.getElementById("date_time");
    let dateActuelle = new Date();

    let formattedDate = dateActuelle.toLocaleDateString(); // Datum ohne Zeit
    let formattedTime = dateActuelle.toLocaleTimeString(); // Uhrzeit mit laufenden Sekunden
    date.innerHTML = `${formattedDate} ${formattedTime}`;
}
setInterval(updateDateTime, 1000);