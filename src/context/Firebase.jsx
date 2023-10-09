import { createContext, useContext ,useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth ,signInWithEmailAndPassword,onAuthStateChanged, signOut} from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyB4UZhrFwaiB8aclanOcceqphMqGuwzSFY",
    authDomain: "bookify-db89d.firebaseapp.com",
    projectId: "bookify-db89d",
    storageBucket: "bookify-db89d.appspot.com",
    messagingSenderId: "739910195666",
    appId: "1:739910195666:web:9aa98aeda2e46edfba900b"
  };

  export const useFirebase = ()=> useContext(FirebaseContext);

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const  firebaseAuth = getAuth(firebaseApp);
const fireStore =getFirestore(firebaseApp);
const storage =getStorage(firebaseApp);



export const FirebaseProvider =(props) =>{

    const [user,setUser] =useState(null);

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user)=>{
            if(user){
                setUser(user);
            }
            else{
                setUser(null);
            }
            console.log("User",user);
        })
    },[])

     
    

    const signupUserWithEmailAndPassword =(email,password) =>{
        createUserWithEmailAndPassword(firebaseAuth,email,password);
    }

    const signinUserWithEmailAndPassword =(email, password) =>{
        signInWithEmailAndPassword(firebaseAuth,email,password);
    }
    console.log(user);

    const handleLogout = () => {               
        signOut(firebaseAuth).then(() => {
        // Sign-out successful.
            
            console.log("Signed out successfully")
        }).catch((error) => {
            alert(error.message);
        // An error happened.
        });
    }



    const handleCreateNewListing = async (name, isbn, price, cover) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult = await uploadBytes(imageRef, cover);
        return await addDoc(collection(fireStore, "books"), {
          name,
          isbn,
          price,
          imageURL: uploadResult.ref.fullPath,
          userID: user.uid,
          userEmail: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      };

      const listAllBooks =()=>{
        return getDocs(collection(fireStore,"books"))
      }

      const getBookById = async (id) => {
        const docRef = doc(fireStore, "books", id);
        const result = await getDoc(docRef);
        return result;
      };

      const getImgURL = (path)=>{
        return getDownloadURL(ref(storage,path))
      }

      const placeOrder = async (bookId,qty)=>{
        const collectionRef = collection(fireStore,"books",bookId,"orders");
        const result = await addDoc(collectionRef,{
            userID: user.uid,
           userEmail: user.email,
           displayName: user.displayName,
           photoURL: user.photoURL,
           qty: Number(qty),

        })
        return result;
      }

      const fetchMyBooks = async(userID)=>{
        const collectionRef = collection(fireStore,"books");
        const q = query(collectionRef,where("userID","==",userID));
        const result  = await getDocs(q);
        return result;
      }

      const getOrders = async (bookId) => {
        const collectionRef = collection(fireStore, "books", bookId, "orders");
        const result = await getDocs(collectionRef);
        return result;
      };



    const isLoggedIn =user ?true :false;



    return (
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword ,signinUserWithEmailAndPassword ,isLoggedIn,handleCreateNewListing,listAllBooks,getImgURL,getBookById,placeOrder,fetchMyBooks,getOrders,handleLogout,user}}>
            {props.children}
        </FirebaseContext.Provider>
    )
};