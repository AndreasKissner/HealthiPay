function getRandomClientTemplate() {
  return `
  <div class="form-group">
        <label for="name_of_client" class="form-label">Name of client:</label>
        <input id="name_of_client" type="text" placeholder="Name of client" class="form-input">
      </div>
      
      <div class="form-group">
        <label for="received_facture" class="form-label">Rechnung erhalten am:</label>
        <input type="date" id="received_facture" class="form-input">
      </div>
      
      <div class="form-group">
        <label for="due_facture" class="form-label">Höhe der Rechnung:</label>
        <input id="due_facture" type="text" placeholder="Betrag der Rechnung" class="form-input">
      </div>
      
      <div class="form-group">
        <label for="date_for_paying" class="form-label">Zahlbar bis:</label> 
        <input type="date" id="date_for_paying" class="form-input">
      </div>
      <button onclick="moveClientInClient()"  class="btn_next">marked as not payed</button>
    `
}

function getRandomClientFieldNotPaying(notPaying, notPayingIndex) {
  return `
     <br>
     <h1>Not Paying</h1>
    <div class="client-info">
  <div class="client-detail">
    <strong>Name of client:</strong> <span id="client-name">${notPaying.clientName}</span>
  </div>

  <div class="client-detail">
    <strong>Rechnung erhalten am:</strong> <span id="received-date">${notPaying.amountDue}</span>
  </div>

  <div class="client-detail">
    <strong>Höhe der Rechnung:</strong> <span id="due-amount">${notPaying.amountReceived} CHF</span>
  </div>

  <div class="client-detail">
    <strong>Zahlbar bis:</strong> <span id="due-date">${notPaying.dueDate}</span>
  </div>
  
   <div class="client-detail">
     <label for="is_paying" class="form-label">Bezahlt am :</label> 
    <input type="date" id="is_paying_${notPayingIndex}" class="form_input">

  </div>
  <button onclick="moveToPaying(${notPayingIndex})" class="bnt_move_to_paying">Marked as payed</Button>

</div>
    `
}

function getRandomPaymentComplete(isAllPaying, ispayedIndex) {
  return `
<br>
<h1>Paid</h1>
<div class="client-info">
  <div class="client-detail">
    <strong>Client name:</strong> <span>${isAllPaying.clientName}</span>
  </div>

  <div class="client-detail">
    <strong>Invoice received on:</strong> <span>${isAllPaying.amountDue} </span>
  </div>

  <div class="client-detail">
    <strong>Invoice amount:</strong> <span>${isAllPaying.amountReceived} CHF</span>
  </div>

  <div class="client-detail">
    <strong>Due date:</strong> <span>${isAllPaying.dueDate}</span>
  </div>
  
  <div class="client-detail">
   <strong>Paid on:</strong> <span>${isAllPaying.isPaying}</span>
  </div>

  <button onclick="moveToTrash(${ispayedIndex})">Move to Trash</button>
  <button onclick="moveToArchiv(${ispayedIndex})">Move to Archiv</button>
  
</div>
`
}


function getTrashRandomTemplate(trashClientItem, trashIndex) {
  return ` 
  <h1>Trash</h1>
  <div class="client-info">
  <div class="client-detail">
    <strong>Client name:</strong> <span>${trashClientItem.clientName}</span>
  </div>

  <div class="client-detail">
    <strong>Invoice received on:</strong> <span>${trashClientItem.amountDue}</span>
  </div>

  <div class="client-detail">
    <strong>Invoice amount:</strong> <span>${trashClientItem.amountReceived} CHF</span>
  </div>

  <div class="client-detail">
    <strong>Due date:</strong> <span>${trashClientItem.dueDate}</span>
  </div>
  
  <div class="client-detail">
   <strong>Paid on:</strong> <span>${trashClientItem.isPaying}</span>
  </div>
   <button onclick="moveFromTrashToArchiv(${trashIndex})">Move to Archiv</button>
  <button onclick="moveFromTrashtoPaid(${trashIndex})">Move back to paid</button>
    <button onclick="deleteFromTrash(${trashIndex})">Delete Trash</button>
</div>
  `
}

function getArchivRandomTemplate(archievClientItem, archivIndex) {
  return ` 
  <h1>Archiv 🗃️</h1>
  <div class="client-info">
  <div class="client-detail">
    <strong>Client name:</strong> <span>${archievClientItem.clientName}</span>
  </div>

  <div class="client-detail">
    <strong>Invoice received on:</strong> <span>${archievClientItem.amountDue}</span>
  </div>

  <div class="client-detail">
    <strong>Invoice amount:</strong> <span>${archievClientItem.amountReceived} CHF</span>
  </div>

  <div class="client-detail">
    <strong>Due date:</strong> <span>${archievClientItem.dueDate}</span>
  </div>
  
  <div class="client-detail">
   <strong>Paid on:</strong> <span>${archievClientItem.isPaying}</span>
  </div>
 <button onclick="moveFromArchivToTrash(${archivIndex})">Move back to Trash</button>
  <button onclick="moveFromArchivToPayed(${archivIndex})">Move back to paid</button>
</div>
  `
}