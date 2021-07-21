module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    return_avg_rating: object => {
        let ratingObj = object[0].average_score;
        return parseInt(ratingObj).toFixed(2);
    }
};