// Periksa fitur Notification API
if ("Notification" in window) {
    requestPermission();
  } else {
    console.error("Browser tidak mendukung notifikasi.");
  }
  
  // Meminta ijin menggunakan Notification API
  function requestPermission() {
    Notification.requestPermission().then(function (result) {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }
      
      console.log("Fitur notifikasi diijinkan.");
    });
  }