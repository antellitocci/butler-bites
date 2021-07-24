async function newImageFormHandler(event) {
    event.preventDefault();
    
    const imageFile = req.file;
    const result = await uploadImage(imageFile);
    const image_key = result.Key;
    const recipe_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
}