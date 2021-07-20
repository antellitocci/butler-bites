async function formSubmitHandler() {
    event.preventDefault();
    //get the id value for category button
    var btnClicked = document.activeElement;
    var category_id = btnClicked.id;
    category_id = parseInt(category_id);
    
};

document.querySelector('#categoryBtnEl').addEventListener('click', formSubmitHandler);