// Sidebar Function
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const overlay = document.getElementById('overlay');
if(hamburger){
    hamburger.addEventListener('click', function() {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
    });
}
if(closeSidebar){
    closeSidebar.addEventListener('click', function() {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
    });
}
});

//Image Upload
function showImage(src, target) {
    var fr = new FileReader();
    fr.onload = function(){
    target.src = fr.result;
  }
  fr.readAsDataURL(src.files[0]);
}
function putImage() {
  var src = document.getElementById("select_image");
  var target = document.getElementById("target");
  var target2 = document.getElementById("centerImg");
  showImage(src, target);
  showImage(src, target2);
  target.style.height = '50px';
  target.style.width = '100px';
  target.style.left = '50%';
  target.style.border = '1px solid black';
  target2.style.height = '350px';
  target2.style.width = '700px';
  target2.style.left = '50%';
}

// Require option to be selected in dropdown
function validateForm() {
    const selectedOption = document.getElementById("groups").value;
    if (selectedOption === "Choose one below") {
        alert("Please select an option from the dropdown.");
        return false;
    }
    return true;
}

// Get selected dropdown value
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedOption = urlParams.get('groups');
    const resultElement = document.getElementById('group-title');
    if(resultElement){
        resultElement.innerHTML = selectedOption;
    }
    console.log(selectedOption); //this will output as null on the html files that dont have the "resultElement" but its fine bc itll wokr for the html file u need it -Bradley
});
// Load saved settings onto page
const savedName = localStorage.getItem('name');
const savedPassword = localStorage.getItem('password');
const savedDob = localStorage.getItem('dob');
const savedPhone = localStorage.getItem('phone');

if (savedName) {
    document.getElementById('name').value = savedName;
}

if (savedPassword) {
    document.getElementById('password').value = savedPassword;
}

if (savedDob) {
    document.getElementById('dob').value = savedDob;
}

if (savedPhone) {
    document.getElementById('phone').value = savedPhone;
}


// Save settings
const settingsForm = document.getElementById("settings-form")
const saveButton = document.getElementById("save-button")
if(saveButton){
    saveButton.addEventListener('click', function(event) {
        event.preventDefault();
  
        const formData = new FormData(settingsForm);
        const name = formData.get('name');
        const password = formData.get('password');
        const dob = formData.get('dob');
        const phone = formData.get('phone');
  
        localStorage.setItem('name', name);
        localStorage.setItem('password', password);
        localStorage.setItem('dob', dob);
        localStorage.setItem('phone', phone);
  
        alert('Changes saved successfully!');
  });
}


function createPost() {
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;
    const imageInput = document.getElementById("post-image");
    const imageFile = imageInput.files[0];
    let imageUrl = "";

    if (imageFile) {
        // Check if the selected file is an image
        if (imageFile.type.startsWith("image/")) {
            imageUrl = URL.createObjectURL(imageFile);
        } else {
            alert("Please select a valid image file.");
            return;
        }
    }

    const postPreview = document.getElementById("post-preview");

    // Create a new post element
    const postElement = document.createElement("div");
    postElement.classList.add("post-preview");

    const postTitle = document.createElement("h2");
    postTitle.classList.add("post-title");
    postTitle.textContent = title;

    const postContent = document.createElement("p");
    postContent.classList.add("post-content");
    postContent.textContent = content;

    // Create an image element if a valid image is selected
    if (imageUrl) {
        const postImage = document.createElement("img");
        postImage.classList.add("post-image");
        postImage.src = imageUrl;
        postImage.style.height = "600px";
        postImage.style.width = "550px";
        postElement.appendChild(postImage);
    }

    // Append the title and content to the new post element
    postElement.appendChild(postTitle);
    postElement.appendChild(postContent);

    // Append the new post element to the container
    postPreview.appendChild(postElement);

    // Clear the input fields
    document.getElementById("post-title").value = "";
    document.getElementById("post-content").value = "";
    imageInput.value = "";
}

const submitBtn = document.getElementById('submitBtn');
if(submitBtn){
    submitBtn.addEventListener('click', function() {
        const updatedName = document.getElementById('tag');
        const usernameInput = document.getElementById("usernameInput").value;
        updatedName.textContent = usernameInput;
      });   
}



   