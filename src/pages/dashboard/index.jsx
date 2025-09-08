import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./dashboard.module.css";
import ButtonComp from "../../components/ButtonComp";
import TextField from "../../components/textField";
import LogoutButton from "../../components/logout/index.jsx";
import { useNavigate } from "react-router-dom";

import { db } from "../../firebase.js";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const Dashboard = () => {
  let [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [hover, setHover] = useState(false);
  const [clearBtnHover, setClearBtnHover] = useState(false);
  const [saveBtnHover, setSaveBtnHover] = useState(false);
  const [editIndexNumber, setEditIndexNumber] = useState(null);
  const [editedVal, setEditedVal] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      todos = [];
      const querySnapShot = await getDocs(collection(db, "todos"));
      querySnapShot.forEach((doc) => {
        todos.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      setTodos([...todos]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addTodo = async () => {
    try {
      if (todoValue.length < 3) {
        alert("Value must be 3 or more characters");
        return;
      }

      await addDoc(collection(db, "todos"), {
        value: todoValue,
        createdAt: new Date(),
      });

      setTodoValue("");
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearHandler = async () => {
    try {
      if (todos.length < 1) return;
      const permission = confirm(
        "Are you Sure? You Want To Delete All Todos..."
      );

      if (confirm) {
        const querySnapShot = await getDocs(collection(db, "todos"));
        querySnapShot.docs.map((data) => {
          deleteDoc(doc(db, "todos", data.id));
        });

        fetchData();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const saveHandler = async (id) => {
    try {
      if (editedVal.length < 3) {
        alert("Value must be 3 or more characters");
        return;
      }

      await updateDoc(doc(db, "todos", id), {
        value: editedVal,
        updatedAt: new Date(),
      });

      setEditedVal("");
      setEditIndexNumber(null);
      fetchData();
    } catch (error) {}
  };

  const editHandler = (index) => {
    setEditedVal(todos[index].value);
    setEditIndexNumber(index);
  };

  const deleteHandler = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.removeItem("uid");
    navigate("/");
  };

  return (
    <>
      <main>
        <div className={styles.logoutContainer}>
          <LogoutButton onClick={logOutHandler} />
        </div>
        <div className={styles.input_parent}>
          <TextField
            placeholder="Enter Todo Here..."
            onChange={(event) => {
              setTodoValue(event.target.value);
              return;
            }}
            value={todoValue}
          />
          <ButtonComp
            label="Add"
            style={{
              backgroundColor: hover
                ? "rgb(45, 174, 152)"
                : "rgb(55, 225, 197)",
              color: hover ? "#fff" : "#000",
            }}
            onClick={addTodo}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
          <ButtonComp
            label="Clear All"
            style={{
              backgroundColor: clearBtnHover
                ? "rgb(17, 90, 117)"
                : "rgb(15, 130, 172)",
              color: "#fff",
            }}
            onClick={clearHandler}
            onMouseEnter={() => setClearBtnHover(true)}
            onMouseLeave={() => setClearBtnHover(false)}
          />
        </div>

        <ul>
          {todos.map(({ value, id }, index) => {
            return editIndexNumber == index ? (
              <li className="textField_parent" key={index}>
                <TextField
                  placeholder="Edit Todo..."
                  onChange={(event) => {
                    setEditedVal(event.target.value);
                  }}
                  value={editedVal}
                />
                <ButtonComp
                  label="Save"
                  style={{
                    backgroundColor: saveBtnHover
                      ? "rgb(45, 174, 152)"
                      : "rgb(55, 225, 197)",
                    color: saveBtnHover ? "#fff" : "#000",
                  }}
                  onClick={() => saveHandler(id)}
                  onMouseEnter={() => setSaveBtnHover(true)}
                  onMouseLeave={() => setSaveBtnHover(false)}
                />
              </li>
            ) : (
              <li key={index}>
                <h4>{value}</h4>
                <div className={styles.todo_btns}>
                  <button
                    className={styles.editBtn}
                    onClick={() => editHandler(index)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteHandler(id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default Dashboard;
