async function ratingHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const score = document.querySelector('#rating-score').value;
    console.log(id);
    console.log(score);

    const response = await fetch('/api/rating', {
        method: 'POST',
        body: JSON.stringify({
            score,
            id
        }),
        headers: {
            'Content-Type': 'applicable/json'
        }
    });
    if (response.ok) {
        res.redirect(req.get('referer'));
    };
};

document.querySelector('#addRating').addEventListener('click', ratingHandler);