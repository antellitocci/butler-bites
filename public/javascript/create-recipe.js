async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="title"]').value;
    const category_id = document.querySelector('select[name="categorize"').value;
    const prep_time = document.querySelector('input[name="prepTime"]').value;
    const cook_time = document.querySelector('input[name="cookTime"]').value;
    const serving_size = document.querySelector('input[name="yieldAmt"]').value;
    const ingredients = document.querySelector('#ingredients').value;
    const directions = document.querySelector('input[name="directions"]').value;
  
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        category_id,
        prep_time,
        cook_time,
        serving_size,
        ingredients,
        directions
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-recipe').addEventListener('click', newFormHandler);