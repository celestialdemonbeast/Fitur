// Untuk Navbar
function loadNavbar() {
    const timestamp = new Date().getTime(); // Get current timestamp
    fetch(`navbar.html?t=${timestamp}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;
        })
        .catch(error => console.error("Failed to load navbar:", error));
}

// Define w3_open function
function w3_open() {
    var sidebar = document.getElementById("mySidebar");
    if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
    } else {
        sidebar.style.display = "block";
    }
}

// Untuk menampilkan alert menggunakan modal W3.CSS
function myFunction1() {
    document.getElementById("myModal").style.display = "block";
}

// Untuk menutup modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}
