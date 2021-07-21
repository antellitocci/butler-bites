module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    return_avg_rating: object => {
        let sum = 0;
        object.forEach(element => {
            sum += element.score;
            console.log(sum);
        });
        let average_score = parseInt(sum/object.length).toFixed(2);
        return average_score;
    }
};