async function initClientsData() {
  try {
    const existing = await loadData("clientData");
    if (existing) {
      await loadAllFromFirebase();
    } else {
      await saveAllToFirebase();
    }
  } catch (err) {

  console.error("initClientsData error:", err);
  // Fallback: Lokal laden, damit UI trotzdem Daten hat
  if (typeof loadAllFromLocalStorage === "function") {
    loadAllFromLocalStorage();
    console.warn("Fallback: Daten aus LocalStorage geladen.");
  }
  }
}

function scheduleSave() {
  if (scheduleSave._t) clearTimeout(scheduleSave._t);
  if (!scheduleSave.debounceMs) scheduleSave.debounceMs = 500;

  scheduleSave._t = setTimeout(async () => {
    try {
      await saveAllToFirebase();
      console.log("Firebase: gespeichert.");
    } catch (e) {
      console.error("Fehler beim Speichern:", e);
     // Fallback: Lokal sichern, damit nichts verloren geht
     if (typeof saveAllToLocalStorage === "function") {
       saveAllToLocalStorage();
       console.warn("Fallback: Lokal gespeichert (Offline/Fehler).");
     }
    }
  }, scheduleSave.debounceMs);
}


async function forceSaveNow() {
  // evtl. laufenden Debounce abbrechen, dann sofort speichern
  if (scheduleSave && scheduleSave._t) {
    clearTimeout(scheduleSave._t);
    scheduleSave._t = null;
  }
  try {
    await saveAllToFirebase();
    console.log("Firebase: sofort gespeichert.");
  } catch (e) {
    console.error("Fehler beim Sofortspeichern:", e);
  }
}
