import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from "../styles/Main.module.css";
import Header from '../components/Header';

Modal.setAppElement('#root'); // This is important for accessibility

function Main() {
    const [type, setType] = useState("Social");
    const [date, setDate] = useState("");
    const [jobName, setJobName] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [todoList, setTodoList] = useState([]);

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const handleDate = (event) => {
        setDate(event.target.value);
    };

    const handleJobName = (event) => {
        setJobName(event.target.value);
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
            date
        };
        setTodoList([...todoList, newTodo]);
        setJobName("");
        setType("Social");
        setDate("");
        setShowForm(false);
    };

    return (
        <div>
            <Header />
            <div className={styles.page}>
                <button onClick={toggleForm} className={styles.addBtn}>
                    {showForm ? "Cancel Add" : "Add a to-do"}
                </button>
                <Modal
                    isOpen={showForm}
                    onRequestClose={closeModal}
                    contentLabel="Add To-Do"
                    className={styles.modalContent}
                    overlayClassName={styles.modalOverlay}
                >
                    <form className={styles.addForm} onSubmit={addTodo}>
                        <label className={styles.labels}>
                            Job name
                            <input type="text" value={jobName} onChange={handleJobName} required />
                        </label>
                        <label className={styles.labels}>
                            Type
                            <select value={type} onChange={handleChange} required>
                                <option value="Social">Social</option>
                                <option value="Must">Must</option>
                                <option value="Should">Should</option>
                            </select>
                        </label>
                        <label className={styles.labels}>
                            Date-Time
                            <input type="datetime-local" value={date} onChange={handleDate} required />
                        </label>
                        <button type="submit" className={styles.submitBtn}>Add To-Do</button>
                    </form>
                </Modal>
                <div className={styles.todoList}>
                    {todoList.map((todo, index) => (
                        <div key={index} className={styles.todoItem}>
                            <h3>{todo.jobName}</h3>
                            <p>Type: {todo.type}</p>
                            <p>Date: {todo.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Main;
