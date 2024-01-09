import React, { useState, useEffect } from "react";
import NewElement from "../component/NewElement";

function Task(){
    const [list, setList] = useState([]);
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        // This code block will run after every render, including when arry is updated
        console.log(list);

    }, [list]);

    function click(){
        const userData = {
            title: userInput,
            id: getRandomNumber(1, 100000),
            done: false
        };

        setList([...list, userData]);
        // createNewELement(userData.title, userData.id);
        console.log(userInput);
        setUserInput('');
    }


    function getRandomNumber(min, max) {
        const randomNumber = Math.random();
        const scaledNumber = min + Math.floor(randomNumber * (max - min + 1));
        return scaledNumber;
    }

    function removeItemFunction(id){
        setList(prevArray => prevArray.filter(obj => obj.id !== id));
        // const element = document.getElementById(id);
        // element.parentNode.remove();
    }

    function taskDone(){
        const span = document.querySelectorAll('.task');
        const checkbox = document.querySelectorAll('.checkbox');

        for(let i=0; i < checkbox.length; i++){
            if(checkbox[i].checked === true){
                span[i].style.textDecoration = 'line-through';
                list[i].done = true;
                break;
            }
            else{
                span[i].style.textDecoration = 'none';
                list[i].done = false;
                break;
            }
        }

    }

    return(
        <div>
            <div className="headingContainer">
                <h1 className="heading">To Do List</h1>
                <input type="text" placeholder="enter anything" alt="user input" id="user" className="inputTask" onChange={(e) => setUserInput(e.target.value)} />
                <button onClick={click} className="addTask">Add Task</button>
            </div>

            <div id="mainContainer">
                {/* {list.map(object => <div key={object.id} className="taskContainer">
                                        <input type="checkbox" alt="checkbox" className="checkbox" onChange={taskDone} />
                                        <span className="task">{object.title}</span>
                                        <button className="deleteTask" onClick={() => removeItemFunction(object.id)}>Delete</button>
                                    </div>)} */}

                {list.map(object => <NewElement key={object.id} id={object.id} title={object.title} removeItem={removeItemFunction} taskDone={taskDone} />)}

            </div>
        </div>
    );
}

export default Task;