// Import
import './api/openai';

import './config';
import './writer';
import './memory';

import './goal/goal';
import './goal/goals';

import './gperson/GPerson';

import './gperson/action/_baseAction';
import './gperson/action/endAI';
import './gperson/action/createAI';
import './gperson/action/talkToAI';
import './gperson/action/saySomething';
import './gperson/action/completeGoal';
import './gperson/action/writeMemory';
import './gperson/action/googleSearch';
import './gperson/action/askForAction';
import './gperson/action/browseUrl';
import './gperson/action/addGoal';
import './gperson/action/execJs';
import './gperson/action/execPhp';
import './gperson/action/askUserInfos';
import './gperson/action/writeToFile';

import './world';


// TODO - Change main logic for AI to talk back by answering with and array like this instead ["memory":"new memory","comment":"new comment","actions":[action1, action2, ...]]
// TODO - and change the logic to use this array

// Start on ready
$(function() {
    let thisWorld = null;

    const $startButton = $('#start_it');
    const $killButton  = $('#kill_it');

    // Start button Trigger
    $startButton.on('click', function() {
        if ($startButton.hasClass('disabled')) {
            return;
        }

        $startButton.addClass('disabled');
        $killButton.removeClass('disabled');

        // RESET???
        if (thisWorld != null) {
            alert('Need to refresh for now - Sorry');
            return;
        }

        $("html, body").animate({
            scrollTop: $('#main-goal').offset().top - 50
        }, 600);


        thisWorld = new WorldCycle(
            {
                id: 'grecursive',
                name: 'name',
                goals: [$('#main-goal').val()]
            }
        );

        thisWorld.startWorld();
    });

    // Enable Start button
    $('#start_it').removeClass('disabled');


    // Kill Trigger
    $killButton.on('click', function() {
        if ($killButton.hasClass('disabled')) {
            return;
        }

        thisWorld.killWorld();
    });



    // Main Goal Cookie
    // $('#main-goal').on('change', function() {
    //     setCookie('main-goal', $('#main-goal').val(), 7);
    // });
    // var temp = getCookie('main-goal');
    // if (temp) {
    //     $('#main-goal').val(temp);
    // }


    // Set value for default input
    $('#main-goal').val(worldConfig.default_goal);

    $('#first_ai_name').val(worldConfig.first_ai.infos.name);
    $('#first_ai_role').val(worldConfig.first_ai.infos.role);
    $('#first_ai_message').val(worldConfig.first_ai.firstMsg);

    $('#person_system_content').val(worldConfig.person.system.content);
    $('#person_system_suffix').val(worldConfig.person.system.suffix);
    $('#person_user_prefix').val(worldConfig.person.msg.prefix);
    $('#person_user_suffix').val(worldConfig.person.msg.sufix);

    $('#action_msg_prefix').val(worldConfig.actionsMsg.prefix);
    $('#action_msg_suffix').val(worldConfig.actionsMsg.sufix);

    $('#user_retry_message').val(worldConfig.retryMessage);



    var arrayOfElementsCookied = [
        'main-goal',
        'first_ai_name',
        'first_ai_role',
        'first_ai_message',
        'person_system_content',
        'person_system_suffix',
        'person_user_prefix',
        'person_user_suffix',
        'action_msg_prefix',
        'action_msg_suffix',
        'user_retry_message',
    ]

    for (const elem of arrayOfElementsCookied) {
        $('#' + elem).on('change', function() {
            setCookie(elem, $('#' + elem).val(), 7);
        });
        var temp = getCookie(elem);
        if (temp) {
            $('#' + elem).val(temp);
        }
    }
});

