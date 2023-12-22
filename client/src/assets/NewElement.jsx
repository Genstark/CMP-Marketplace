function NewElement({id, title, removeItem, taskDone}){
    return(
        <div className="taskContainer">
            <input type="checkbox" alt="checkbox" className="checkbox" onChange={taskDone} />
            <span className="task">{title}</span>
            <button className="deleteTask" id={id} onClick={() => removeItem(id)}>Delete</button>
        </div>
    );
}

export default NewElement;