var dbPromised = idb.open("users-list", 1, function(upgradeDb) {
  var usersObjectStore = upgradeDb.createObjectStore("users", {
    keyPath: "id"
  });
  usersObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveForLater(user) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("users", "readwrite");
      var store = tx.objectStore("users");
      console.log(user);
      store.add(user);
      return tx.complete;
    })
    .then(function() {
      console.log("Data berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("users", "readonly");
        var store = tx.objectStore("users");
        return store.getAll();
      })
      .then(function(users) {
        resolve(users);
      });
  });
}

function getAllByUserName(title) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("users", "readonly");
      var store = tx.objectStore("users");
      var titleIndex = store.index("name");
      var range = IDBKeyRange.bound(title, title + "\uffff");
      return titleIndex.getAll(range);
    })
    .then(function(users) {
      console.log(users);
    });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("users", "readonly");
        var store = tx.objectStore("users");
        return store.get(id);
      })
      .then(function(user) {
        resolve(user);
      });
  });
}
