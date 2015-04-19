;(function () {

    function loadMessages() {
        console.log('loading messages...');
        $.get('/api/messages', function (result) {
            console.log(result);
            if (result && result.data) {
                console.log('Fetched', result.data.length, 'messages');
            }
        });
    }

    function saveMessage() {
        var message = $('#message').val();
    }

    $('#my-form').on('submit', function () {
        console.log('submitting form...');
        saveMessage();
        return false;
    });

    $(function () {
        loadMessages();
    });

})();
