import React from "react";

function MenuPage(){

    function changePage(){
        window.location.href = "/";
    }

    return(
        <div className="menu-page">
            <h1>Menu</h1>
            <button onClick={changePage}>home page</button>
        </div>
    );
}

export default MenuPage;