const fs = require('fs');

exports.ImageRemover = function(link) {
    try {
        fs.unlinkSync('/public/' + link);
    } catch (error) {
        console.log(error);
    }
}