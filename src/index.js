import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, getDoc, getDocs
} from 'firebase/firestore'
import{
    getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword
} from 'firebase/auth'
import{
    ref, uploadBytesResumable, getDownloadURL, getStorage
} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyDu8hQHr1fRKRPtjHEGe5Yd2OQxToUwvAM",
    authDomain: "fir-practice-4046f.firebaseapp.com",
    projectId: "fir-practice-4046f",
    storageBucket: "fir-practice-4046f.appspot.com",
    messagingSenderId: "159175746905",
    appId: "1:159175746905:web:df8130e88cee80370f5848"
  };

   //initialize app
   const app = initializeApp(firebaseConfig)

   //initialize service
   const db = getFirestore()
   const auth = getAuth()
   const storage = getStorage(app);

   //collection ref
   const colRef = collection(db, 'posts')
   const idRef = collection(db, 'idCollectionTracker')
 
   //get collection data **REAL TIME COLLECTION DATA** = makes it so we dont have to refresh to see changes everytime but it happens automatically
   //this below is also known as setting up a "subscription"
   var allPostsArray = [];
     onSnapshot(colRef, (snapshot) => {
         let posts = []
         snapshot.docs.forEach((post) => {
             posts.push({...post.data(), id: post.id})
         })
         console.log(posts)
         //this will run and output all the current posts from an array
         getDocs(colRef)
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() contains the data of the document
      allPostsArray.push(doc.data());
      for(let i =0; i<allPostsArray.length; i++){
        let post = allPostsArray[i]
        if(!post.hasOwnProperty("posted")){
          displayPost(post.title, post.content, post.image)
          post.posted = true;
        }
      }
    });
  })
  .catch((error) => {
    console.error("Error getting documents: ", error);
  });
     })
     
//signing users up
const signupForm = document.querySelector('.signupInputFB')
if(signupForm){
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const email = signupForm.email.value
    const password = signupForm.password.value
    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created:',cred.user)
            signupForm.reset()
            window.location.href = "explore.html";
        })
        .catch((err)=>{
          alert("Password should be at least 6 characters")
            console.log(err.message)
        })
})
}
//////
// logging in and out
const logoutButton = document.querySelector('.logoutButton1')
if(logoutButton){
  logoutButton.addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        console.log('user signed out')
        window.location.href = "index.html";
      })
      .catch(err => {
        console.log(err.message)
      })
  })
}

const loginForm = document.querySelector('.login1')
if(loginForm){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
  
    const email = loginForm.email.value
    const password = loginForm.password.value
  
    signInWithEmailAndPassword(auth, email, password)
      .then(cred => {
        console.log('user logged in:', cred.user)
        loginForm.reset()
        window.location.href = "explore.html";
      })
      .catch(err => {
        console.log(err.message)
        alert("Invalid Credentials")
      })
  })
}



    //creating posts
    let imageUrl = "";
    const createNewPost = document.querySelector('.createPostFB')
    if (createNewPost) {
      createNewPost.addEventListener('submit', (e) => {
        e.preventDefault();
        const imageInput = document.getElementById("post-image");
        const imageFile = imageInput.files[0];
    
        if (imageFile) {
          const storageRef = ref(storage, 'images/' + imageFile.name);
          const uploadTask = uploadBytesResumable(storageRef, imageFile);
    
          uploadTask.on('state_changed', (snapshot) => {
            // You can track the upload progress here
          }, (error) => {
            // Handle errors
          }, () => {
            // Upload complete, you can now get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              // Store the permanent URL in a variable
              imageUrl = downloadURL;
              console.log('Permanent Image URL:', imageUrl);
    
              // Now that you have the image URL, add the document to Firestore
              addDoc(colRef, {
                title: createNewPost.title.value,
                content: createNewPost.content.value,
                image: imageUrl,
              })
                .then(() => {
                  console.log(colRef.title);
                  addDoc(idRef, {
                    documentID: colRef.id,
                    createdTimestamp: new Date()
                  });
                  createNewPost.reset();
                })
                .catch((error) => {
                  console.error("Error adding document:", error);
                });
            });
          });
        } else {
          console.log('No image selected.');
        }
      });
    }
    


    function displayPost(title, content, image){
        
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

            const postImage =  document.createElement('img')
            postImage.classList.add("post-image");
            postImage.src = image;
            postImage.style.height = "600px";
            postImage.style.width = "550px";  
            postElement.appendChild(postImage);
        

        // Append the title and content to the new post element
        postElement.appendChild(postTitle);
        postElement.appendChild(postContent);

        // Append the new post element to the container
        postPreview.appendChild(postElement);

        
        // // Clear the input fields
        // document.getElementById("post-title").value = "";
        // document.getElementById("post-content").value = "";
        // imageInput.value = "";
    }


 
