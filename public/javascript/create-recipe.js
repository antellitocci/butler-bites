async function newFormHandler(event) {
    event.preventDefault();
  
    // const title = document.querySelector('input[name="title"]').value;
    // const category_id = document.querySelector('select[name="categorize"').value;
    // const prep_time = document.querySelector('input[name="prepTime"]').value;
    // const cook_time = document.querySelector('input[name="cookTime"]').value;
    // const serving_size = document.querySelector('input[name="yieldAmt"]').value;
    // const ingredients = document.querySelector('#ingredients').value;
    // const directions = document.querySelector('input[name="directions"]').value;
    // const imageElem = document.getElementsByName('profile-file');
    // console.log(imageElem[0].files[0]);
    // const image1 = imageElem[0].files[0];
  
    // const response = await fetch(`/api/recipes`, {
    //   method: 'POST',
    //   file: image1,
    //   body: JSON.stringify({
    //     title,
    //     category_id,
    //     prep_time,
    //     cook_time,
    //     serving_size,
    //     ingredients,
    //     directions
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
  
    // if (response.ok) {
    //   document.location.replace('/dashboard');
    // } else {
    //   alert(response.statusText);
    // }
  }
  
  document.querySelector('new-recipe-form').addEventListener('submit', newFormHandler);