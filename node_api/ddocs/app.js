module.exports = {
    _id: '_design/app',
    language: 'javascript',
    views: {
        messages: {
            map: function (doc) {
                if (doc.timestamp) {
                    emit(doc.timestamp, null);
                }
            }
        }
    }
};
