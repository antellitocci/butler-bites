async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('textarea[name="title"]').value.trim();
    const category_id = document.querySelector('select[name="categorize"]').value.trim();
    const prep_time = document.querySelector('textarea[name="prepTime"]').value.trim();
    const cook_time = document.querySelector('textarea[name="cookTime"]').value.trim();
    const serving_size = document.querySelector('textarea[name="servingSize"]').value.trim();
    const ingredients = document.querySelector('textarea[name="ingredients"]').value.trim();
    const directions = document.querySelector('textarea[name="directions"]').value.trim();

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
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
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.editRecipeForm').addEventListener('submit', editFormHandler);