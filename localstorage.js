function saveAllToLocalStorage() {
    const data = {
        clients,
        notPayingClients,
        paymentCompleteClients,
        trashClients,
        archivClients
    };

    localStorage.setItem("clientData", JSON.stringify(data));
}

function loadAllFromLocalStorage() {
    const rawData = localStorage.getItem("clientData");
    if (!rawData) return;

    const data = JSON.parse(rawData);

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
