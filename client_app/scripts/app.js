;(function () {

    var $message, $messagesBody;

    function clearMessageInput() {
        $message.val('');
    }

    function displayMessages(messages) {
        messages.forEach(function (message) {
            var content = '<tr id="message-' + message._id + '">';
            content += '<td>' + message.timestamp + '</td>';
            content += '<td>' + message.message + '</td>';
            content += '</tr>';
            $messagesBody.prepend(content);
        });
    }

    function loadMessages() {
        console.log('loading messages...');
        $.get('/api/messages', function (result) {
            console.log(result);
            if (result) {
                console.log('Fetched', result.length, 'messages');
                displayMessages(result);
            }
        });
    }

    function saveMessage() {
        var message = $message.val();
        console.log('message:', message);
        $.post('/api/messages', { message: message }, function (result) {
            var result = [].concat(result);
            displayMessages(result);
        });
        clearMessageInput();
    }

    $('#my-form').on('submit', function () {
        console.log('submitting form...');
        saveMessage();
        return false;
    });

    $(function () {
        $message = $('#message');
        $messagesBody = $('#messages-body');
        loadMessages();
    });

})();
