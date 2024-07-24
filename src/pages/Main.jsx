import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from "../styles/Main.module.css";
import Header from '../components/Header';
import { IoMdClose } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa"; // Import the calendar icon

Modal.setAppElement('#root'); // This is important for accessibility

function Main() {
    // Initialize state from local storage
    const [todoList, setTodoList] = useState(() => {
        const storedTodos = localStorage.getItem("todoList");
        return storedTodos ? JSON.parse(storedTodos) : [];
    });
    const [type, setType] = useState("Social");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [jobName, setJobName] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [filterDate, setFilterDate] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        // Set the date input to today's date
        if (showForm) {
            const today = new Date().toISOString().split("T")[0];
            setDate(today);
        }
    }, [showForm]);

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const handleDate = (event) => {
        setDate(event.target.value);
    };

    const handleTime = (event) => {
        setTime(event.target.value);
    };

    const handleJobName = (event) => {
        setJobName(event.target.value);
    };

    const handleFilterDate = (event) => {
        setFilterDate(event.target.value);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const closeModal = () => {
        setShowForm(false);
    };

    const addTodo = (event) => {
        event.preventDefault();
        const newTodo = {
            jobName,
            type,
            date,
            time
        };
        const updatedTodoList = [...todoList, newTodo].sort((a, b) => {
            const dateTimeA = new Date(`${a.date}T${a.time}`);
            const dateTimeB = new Date(`${b.date}T${b.time}`);
            return dateTimeA - dateTimeB;
        });
        updateTodos(updatedTodoList);
        setJobName("");
        setType("Social");
        setDate(new Date().toISOString().split("T")[0]);
        setTime("");
        setShowForm(false);
    };

    const discardTodo = (index) => {
        const updatedTodoList = todoList.filter((_, i) => i !== index);
        updateTodos(updatedTodoList);
    };

    const updateTodos = (updatedTodoList) => {
        setTodoList(updatedTodoList);
        localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    };

    const filteredTodos = filterDate
        ? todoList.filter(todo => todo.date === filterDate)
        : todoList;

    return (
        <div>
            <Header />
            <div className={styles.page}>
                <div className={styles.todoListHeader}>
                    <button onClick={toggleForm} className={styles.addBtn}>
                        {showForm ? "Cancel Add" : "Add a to-do"}
                    </button>
                    <div className={styles.calendarIcon}>
                        <FaCalendarAlt size={20} />
                        <input type="date" value={filterDate} onChange={handleFilterDate} className={styles.datePicker} />
                    </div>
                </div>
                <div className={styles.todoList}>
                    <h1>To-Do List</h1>
                    <div className={styles.todoCards}>
                        {filteredTodos.map((todo, index) => (
                            <div key={index} className={styles.todoItem}>
                                <IoMdClose size={20} onClick={() => discardTodo(index)} className={styles.closeIcon} />
                                <h3>{todo.jobName}</h3>
                                <p>Type: {todo.type}</p>
                                <p>Date: {todo.date}</p>
                                <p>Time: {todo.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <Modal
                    isOpen={showForm}
                    onRequestClose={closeModal}
                    contentLabel="Add To-Do"
                    className={styles.modalContent}
                    overlayClassName={styles.modalOverlay}
                >
                    <form className={styles.addForm} onSubmit={addTodo}>
                        <h2 className={styles.formTitle}>Add a New To-Do</h2>
                        <label className={styles.labels}>
                            Job Name
                            <input type="text" value={jobName} onChange={handleJobName} required className={styles.input} />
                        </label>
                        <label className={styles.labels}>
                            Type
                            <select value={type} onChange={handleChange} required className={styles.select}>
                                <option value="Social">Social</option>
                                <option value="Must">Must</option>
                                <option value="Should">Should</option>
                            </select>
                        </label>
                        <label className={styles.labels}>
                            Date
                            <input type="date" value={date} onChange={handleDate} required className={styles.input} />
                        </label>
                        <label className={styles.labels}>
                            Time
                            <input type="time" value={time} onChange={handleTime} required className={styles.input} />
                        </label>
                        <button type="submit" className={styles.submitBtn}>Add To-Do</button>
                    </form>
                </Modal>
            </div>
        </div>
    );
}

export default Main;
