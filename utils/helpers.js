module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    return_avg_rating: object => {
        let sum = 0;
        if (object.length === 0) return 'Not Rated';
        object.forEach(element => {
            sum += element.score;
            console.log(sum);
        });
        let average_score = (sum/object.length).toFixed(2) + " / 5.00";
        return average_score;
    }
};