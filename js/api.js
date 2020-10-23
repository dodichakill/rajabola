// var base_url = "https://readerapi.codepolitan.com/";

const base_url = "https://api.football-data.org/v2/";
const endPointTeams = `${base_url}competitions/2021/teams`
const fetchData = (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      'X-Auth-Token': '7895e1a999c8472cb618931fe2c4ea16'
    }
  })
}

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
function getArticles() {
  if ("caches" in window) {
    caches.match(endPointTeams).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var articlesHTML = "";
          data.teams.forEach(function (article) {
            articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${article.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title">${article.name}</span>
                    </div>
                  </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetchData(endPointTeams)
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.teams.forEach(function (article) {
        articlesHTML += `
            <div class="col l4 m6 s12">
              <div class="card z-depth-2">
                <a href="./article.html?id=${article.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${article.crestUrl}" width="240" height="240" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title" style="font-size: bolder;">${article.name}</span>
                </div>
              </div>
            </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  return new Promise(function (resolve) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var articleHTML = `
            <div class="card" style="background-color: #8bcdcd;">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" height="300" width="300" />
            </div>
            <div class="card-content">
              <table class"striped highlight">
                <thead>
                    <th> &nbsp; </th>
                    <th> <h4> ${data.name} </h4></th>
                </thead>
                <tbody>
                    <tr>
                        <td>founded</td>
                        <td>${data.founded}</td>
                    </tr>
                    <tr>
                        <td>address</td>
                        <td>${data.address}</td>
                    </tr>
                    <tr>
                        <td>email</td>
                        <td>${data.email}</td>
                    </tr>
                    <tr>
                        <td>club Color</td>
                        <td>${data.clubColors}</td>
                    </tr>
                    <tr>
                        <td>venue</td>
                        <td>${data.venue}</td>
                    </tr>
                    <tr>
                        <td>lastUpdated</td>
                        <td>${data.lastUpdated}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetchData(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        // console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
          <div class="card" style="background-color: #8bcdcd;">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" height="300" width="300" />
            </div>
            <div class="card-content">
              <table class"striped highlight">
                <thead>
                    <th> &nbsp; </th>
                    <th> <h4> ${data.name} </h4></th>
                </thead>
                <tbody>
                    <tr>
                        <td>founded</td>
                        <td>${data.founded}</td>
                    </tr>
                    <tr>
                        <td>address</td>
                        <td>${data.address}</td>
                    </tr>
                    <tr>
                        <td>email</td>
                        <td>${data.email}</td>
                    </tr>
                    <tr>
                        <td>club Color</td>
                        <td>${data.clubColors}</td>
                    </tr>
                    <tr>
                        <td>venue</td>
                        <td>${data.venue}</td>
                    </tr>
                    <tr>
                        <td>lastUpdated</td>
                        <td>${data.lastUpdated}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedArticles() {
  getAll().then(function (articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    articles.forEach(function (article) {

      articlesHTML += `
                <div class="col l4 m6 s12">
                  <div class="card z-depth-2">
                    <a href="./article.html?id=${article.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                    <a class="btn-floating halfway-fab waves-effect waves-light red" id="deleted" onclick="deletedTeam(${article.id})"><i class="material-icons">delete</i></a>
                      <span class="card-title truncate">${article.name}</span>
                    </div>
                  </div>
                </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (data) {
    articleHTML = '';
    var articleHTML = `
    <div class="card" style="background-color: #8bcdcd;">
    <div class="card-image waves-effect waves-block waves-light">
      <img src="${data.crestUrl}" height="300" width="300" />
    </div>
    <div class="card-content">
      <table class"striped highlight">
        <thead>
            <th> &nbsp; </th>
            <th> <h4> ${data.name} </h4></th>
        </thead>
        <tbody>
            <tr>
                <td>founded</td>
                <td>${data.founded}</td>
            </tr>
            <tr>
                <td>address</td>
                <td>${data.address}</td>
            </tr>
            <tr>
                <td>email</td>
                <td>${data.email}</td>
            </tr>
            <tr>
                <td>club Color</td>
                <td>${data.clubColors}</td>
            </tr>
            <tr>
                <td>venue</td>
                <td>${data.venue}</td>
            </tr>
            <tr>
                <td>lastUpdated</td>
                <td>${data.lastUpdated}</td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}
