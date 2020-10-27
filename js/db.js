let dbPromised = idb.open("news-reader", 1,  upgradeDb => {
  let teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveForLater(team) {
  dbPromised
    .then( db => {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then( () => {
      console.log("Team berhasil di simpan.");
    });
}

function getAll() {
  return new Promise( resolve => {
    dbPromised
      .then( db => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then( teams => {
        resolve(teams);
      });
  });
}


function getById(id) {
  return new Promise( resolve => {
    dbPromised
      .then( db => {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(parseInt(id));
      })
      .then( article => {
        resolve(article);
      });
  });
}

function deletedTeam(team) {
  dbPromised
    .then( db => {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      console.log(team);
      store.delete(team);
      return tx.complete;
    })
    .then( () =>{
      console.log("berhasil di hapus");
    });

  getSavedArticles();
}


