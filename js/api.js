var base_url = "http://jsonplaceholder.typicode.com/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getUsers() {
  if ("caches" in window) {
    caches.match(base_url + "users/").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          var imageUrl = "/img/person_placeholder.jpg";
          data.forEach(function(user) {
            articlesHTML += `
                  <a href="./user.html?id=${user.id}">
                  <div class="card horizontal">
                    
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${imageUrl}" width="200px" height="200px" />
                        </div>
                        <div class="col m5">
                            <p><b>${user.name}</b></p>
                            <p><b>${user.username}</b></p>
                            <p>${user.email}</p>
                            <p>${user.phone}</p>
                        </div>
                        <div class="col m5">
                            <p>${user.address.street}</p>
                            <p>${user.address.suite}</p>
                            <p>${user.address.city}</p>
                            <p>${user.address.zipcode}</p>
                        </div>
                    
                  </div>
                  </a>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("users").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(base_url + "users/")
    .then(status)
    .then(json)
    .then(function(data) {
      var imageUrl = "/img/person_placeholder.jpg";

      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.forEach(function(user) {
            console.log(user);
            
            articlesHTML += `
                <a href="./user.html?id=${user.id}">
                  <div class="card horizontal">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${imageUrl}" width="200px" height="200px" />
                        </div>
                        <div class="col m5">
                            <p><b>${user.name}</b></p>
                            <p><b>${user.username}</b></p>
                            <p>${user.email}</p>
                            <p>${user.phone}</p>
                        </div>
                        <div class="col m5">
                            <p>${user.address.street}</p>
                            <p>${user.address.suite}</p>
                            <p>${user.address.city}</p>
                            <p>${user.address.zipcode}</p>
                        </div>
                    
                  </div>
                  </a>
                `;
          });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("users").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getUserById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "users/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(user) {
            var imageUrl = "/img/person_placeholder.jpg";
            var articleHTML = `
                <div class="row">
                <h2 class="header">${user.name}</h2>
                <div class="card horizontal">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${imageUrl}" width="200px" height="200px" />
                        </div>
                        <div class="col m5">
                            <p><b>${user.username}</b></p>
                            <p>${user.email}</p>
                            <p>${user.phone}</p>
                            <br>
                            <p style="font-size:18px"><b>Company</b></p>
                            <p><b>${user.company.name}</b></p>
                            <p>${user.company.catchPhrase}</p>
                            <p>${user.company.bs}</p>
                        </div>
                        <div class="col m5">
                            <p>${user.address.street}</p>
                            <p>${user.address.suite}</p>
                            <p>${user.address.city}</p>
                            <p>${user.address.zipcode}</p>
                            <iframe 
                              width="250" 
                              height="170" 
                              frameborder="0" 
                              scrolling="no" 
                              marginheight="0" 
                              marginwidth="0" 
                              src="https://maps.google.com/maps?q='+${user.address.geo.lat}+','+${user.address.geo.lng}+'&hl=es;z=14&amp;output=embed"
                             >
                             </iframe>
                        </div>

                    
                  </div>
                  </div>
                  `;

            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(user);
          });
        }
      });
    }

    fetch(base_url + "users/" + idParam)
      .then(status)
      .then(json)
      .then(function(user) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        // console.log(data);
        // Menyusun komponen card artikel secara dinamis
         var imageUrl = "/img/person_placeholder.jpg";
            var articleHTML = `
            <div class="row">
                <h2 class="header">${user.name}</h2>
                <div class="card horizontal">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${imageUrl}" width="200px" height="200px" />
                        </div>
                        <div class="col m5">
                            <p><b>${user.username}</b></p>
                            <p>${user.email}</p>
                            <p>${user.phone}</p>
                            <br>
                            <p style="font-size:18px"><b>Company</b></p>
                            <p><b>${user.company.name}</b></p>
                            <p>${user.company.catchPhrase}</p>
                            <p>${user.company.bs}</p>
                        </div>
                        <div class="col m5">
                            <p>${user.address.street}</p>
                            <p>${user.address.suite}</p>
                            <p>${user.address.city}</p>
                            <p>${user.address.zipcode}</p>
                            
                            <iframe 
                              width="250" 
                              height="170" 
                              frameborder="0" 
                              scrolling="no" 
                              marginheight="0" 
                              marginwidth="0" 
                              src="https://maps.google.com/maps?q='+${user.address.geo.lat}+','+${user.address.geo.lng}+'&hl=es;z=14&amp;output=embed"
                             >
                             </iframe>
                            
                        </div>
                    
                  </div>
                  </div>
                  `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(user);
      });
  });
}



function getSavedUsers() {
  getAll().then(function(data) {
    console.log(data);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
          var imageUrl = "/img/person_placeholder.jpg";
          data.forEach(function(user) {
            articlesHTML += `
                  <a href="./user.html?id=${user.id}">
                  <div class="card horizontal">
                    
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${imageUrl}" width="200px" height="200px" />
                        </div>
                        <div class="col m5">
                            <p><b>${user.name}</b></p>
                            <p><b>${user.username}</b></p>
                            <p>${user.email}</p>
                            <p>${user.phone}</p>
                        </div>
                        <div class="col m5">
                            <p>${user.address.street}</p>
                            <p>${user.address.suite}</p>
                            <p>${user.address.city}</p>
                            <p>${user.address.zipcode}</p>
                        </div>
                    
                  </div>
                  </a>
                `;
          });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("saved-users").innerHTML = articlesHTML;
  });
}

function getSavedUserById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(user) {
    articleHTML = '';
    var imageUrl = "/img/person_placeholder.jpg";
            var articleHTML = `
            <div class="row">
                <h2 class="header">${user.name}</h2>
                <div class="card horizontal">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${imageUrl}" width="200px" height="200px" />
                        </div>
                        <div class="col m5">
                            <p><b>${user.username}</b></p>
                            <p>${user.email}</p>
                            <p>${user.phone}</p>
                            <br>
                            <p style="font-size:18px"><b>Company</b></p>
                            <p><b>${user.company.name}</b></p>
                            <p>${user.company.catchPhrase}</p>
                            <p>${user.company.bs}</p>
                        </div>
                        <div class="col m5">
                            <p>${user.address.street}</p>
                            <p>${user.address.suite}</p>
                            <p>${user.address.city}</p>
                            <p>${user.address.zipcode}</p>
                            
                            <iframe 
                              width="250" 
                              height="170" 
                              frameborder="0" 
                              scrolling="no" 
                              marginheight="0" 
                              marginwidth="0" 
                              src="https://maps.google.com/maps?q='+${user.address.geo.lat}+','+${user.address.geo.lng}+'&hl=es;z=14&amp;output=embed"
                             >
                             </iframe>
                            
                        </div>
                    
                  </div>
                  </div>
                  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}
