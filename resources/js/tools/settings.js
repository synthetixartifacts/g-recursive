

$(document).ready(function() {

    $('#settings-gp').on('click', function() {
        $('body').toggleClass('sidebar-open');
    });

    $('#toggle-password').on('click', function() {
        var $passwordInput = $('#api_key');
        var inputType      = $passwordInput.attr('type');

        if (inputType === 'password') {
            $passwordInput.attr('type', 'text');
        } else {
            $passwordInput.attr('type', 'password');
        }
    });

    const $apiInput = $('#api_key');

    $apiInput.on('change', function() {
        saveApiInput();
    });
    $apiInput.on('keyup', function() {
        saveApiInput();
        $apiInput.css('border-color', '#26cfe4');
    });
    $('#remember').on('change', function() {
        saveApiInput();
    });


    function saveApiInput() {
        if ($('#remember').prop('checked')) {
            var $apiInput = $('#api_key');
            setCookie('gp_api_key', $apiInput.val(), 7);
        }
    }


    $('#max_token').on('change', function() {
        setCookie('gp_max_token', $('#max_token').val(), 7);
    });



    $('#model_name').on('change', function() {
        saveModel();
    });
    function saveModel() {
        setCookie('model_name', $('#model_name').val(), 30);
    }



    // Set initial value
    var apiKeyValue = getCookie('gp_api_key');
    if (apiKeyValue) {
        $('#api_key').val(apiKeyValue);
        $('#remember').prop('checked', true);
    }
    var apiToken = getCookie('gp_max_token');
    if (apiToken) {
        $('#max_token').val(apiToken);
    }
    var modelName = getCookie('model_name');
    if (modelName) {
        $('#model_name').val(modelName);
    }



    // CPM
    $('#max-call-min').on('change', function() {
        setCookie('max-call-min', $('#max-call-min').val(), 7);
    });
    var temp = getCookie('max-call-min');
    if (temp) {
        $('#max-call-min').val(temp);
    }

});