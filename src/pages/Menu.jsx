import React from "react";

function MenuPage(){

    function changePage(){
        const button = document.getElementById('button');
        button.remove();
        window.location.href = "/";
    }

    return(
        <div className="menu-page">
            <h1>Menu</h1>
            <button onClick={changePage} id="button">home page</button>
        </div>
    );
}

export default MenuPage;