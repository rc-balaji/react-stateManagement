// Home.js

import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { app } from "../firebase/firebase";
import {
  getFirestore,
  deleteDoc,
  collection,
  updateDoc,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  doc
} from "firebase/firestore";
import "./Home.css"; // Import the CSS file
import { auth } from "../firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

export const Home = () => {
  const db = getFirestore(app);
  const coll = collection(db, "tasks");
  const user = auth.currentUser;
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [NewTask,setNewTask]=useState('')

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, [auth]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Create a query with a where clause to filter tasks by userId
        const q = query(coll, where("userId", "==", user.uid));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const taskList = [];
          querySnapshot.forEach((doc) => {
            taskList.push({ id: doc.id, ...doc.data() });
          });
          setTasks(taskList);
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [coll, user]);

  const Update = async (id)=>{
    if (!user) return;
    try{
        await updateDoc(doc(db, 'tasks', id),{
            task:prompt("Enter a Task for Update")
        });
        setNewTask("")
    }catch(error){
        console.error(error.message);
    }
    
  }

  const Delete = async (id) => {
    if (!user) return;

    try{
        await deleteDoc(doc(db, 'tasks', id));
    }catch(error){
        console.error(error.message);
    }
  };

  const Add = async () => {
    if (!user) return;

    try {
      await addDoc(coll, {
        task: task,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });
      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  
    function formatFirestoreTimestampToTime(timestamp) {
        if (timestamp && timestamp.toDate) {
          const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date
          const hours = date.getHours().toString().padStart(2, "0"); // Get hours (in 2-digit format)
          const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes (in 2-digit format)
          const seconds = date.getSeconds().toString().padStart(2, "0"); // Get seconds (in 2-digit format)
          
          return `${hours}:${minutes}:${seconds}`;
        }
        
        return ""; // Handle the case where the timestamp is null or undefined
      }
  return (<div>
  <Navbar />
    <div className="home-container">
  <div className="add-task-container">
    <input
      type="text"
      className="input-field"
      placeholder="Enter task"
      value={task}
      onChange={(e) => {
        setTask(e.target.value);
      }}
    />
    <button className="add-button" onClick={Add}>
      Add
    </button>
  </div>

  <div className="task-list">
    <h2 className="task-list-header">Tasks</h2>
    {tasks.map((taskItem) => (
      <div className="task-item" key={taskItem.id}>
        <div style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            gap:20
        }} > 
        <h3>{taskItem.task}</h3>
        <h3> {formatFirestoreTimestampToTime(taskItem.timestamp)}</h3>
        
       
         </div>
        
        <div className="btn" >
        <button className="update-button" onClick={() => Update(taskItem.id)}>
          Update
            
        </button>
        <button className="delete-button" onClick={() => Delete(taskItem.id)}>
          Delete
        </button>
        </div>
      </div>
    ))}
  </div>
</div>
</div>
  );
};
