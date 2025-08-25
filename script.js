
const clients = [];
const notPayingClients = [];
const paymentCompleteClients = [];
const trashClients = [];
const archivClients = [];

function removeFromArray(arr, item) {
    const i = arr.indexOf(item);
    if (i > -1) arr.splice(i, 1);
}

function removeFromAll(item) {
    removeFromArray(clients, item);
    removeFromArray(notPayingClients, item);
    removeFromArray(paymentCompleteClients, item);
    removeFromArray(trashClients, item);
    removeFromArray(archivClients, item);
}


async function saveAllToFirebase() {
    const data = {
        clients,
        notPayingClients,
        paymentCompleteClients,
        trashClients,
        archivClients
    };
    await putData("clientData", data); // kommt aus firebase.js
}

async function loadAllFromFirebase() {
    const data = await loadData("clientData");
    if (!data) return;

    clients.length = 0;
    notPayingClients.length = 0;
    paymentCompleteClients.length = 0;
    trashClients.length = 0;
    archivClients.length = 0;

    if (Array.isArray(data.clients)) clients.push(...data.clients);
    if (Array.isArray(data.notPayingClients)) notPayingClients.push(...data.notPayingClients);
    if (Array.isArray(data.paymentCompleteClients)) paymentCompleteClients.push(...data.paymentCompleteClients);
    if (Array.isArray(data.trashClients)) trashClients.push(...data.trashClients);
    if (Array.isArray(data.archivClients)) archivClients.push(...data.archivClients);
}


async function init() {
    await initClientsData(); // zieht Firebase oder schreibt initiale Daten
    updateDateTime();
    renderClient();
    renderClientNotPaying();
    renderCompletedPayment();
    renderTrashClient();
    renderArchivClient();
}


function updateAllViewsAndSave() {
    scheduleSave();
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

  removeFromAll(client);
  paymentCompleteClients.push(client);

  updateAllViewsAndSave();
}


function moveToTrash(paymentCompleteIndex) {
  const client = paymentCompleteClients[paymentCompleteIndex];
  removeFromAll(client);
  trashClients.push(client);

  updateAllViewsAndSave();
}


function moveToArchiv(paymentCompleteIndex) {
  const client = paymentCompleteClients[paymentCompleteIndex];
  removeFromAll(client);
  archivClients.push(client);

  updateAllViewsAndSave();
}


function moveFromTrashtoPaid(trashIndex) {
  const client = trashClients[trashIndex];
  removeFromAll(client);
  paymentCompleteClients.push(client);

  updateAllViewsAndSave();
}


function moveFromTrashToArchiv(trashIndex) {
  const client = trashClients[trashIndex];
  removeFromAll(client);
  archivClients.push(client);

  updateAllViewsAndSave();
}


function moveFromArchivToTrash(archivIndex) {
  const client = archivClients[archivIndex];
  removeFromAll(client);
  trashClients.push(client);

  updateAllViewsAndSave();
}


function moveFromArchivToPayed(archivIndex) {
  const client = archivClients[archivIndex];
  removeFromAll(client);
  paymentCompleteClients.push(client);

  updateAllViewsAndSave();
}

function deleteFromTrash(trashIndex) {
    if (!confirm("Willst du diesen Eintrag endgültig löschen?")) {
        return; // Abbruch wenn der User "Abbrechen" klickt
    }

    // Element aus dem Array entfernen
    trashClients.splice(trashIndex, 1);

    // Änderungen anzeigen und speichern
    updateAllViewsAndSave();

    console.log("Eintrag dauerhaft gelöscht. Neuer Trash:", trashClients);
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


document.addEventListener("DOMContentLoaded", () => {
    init();
});
