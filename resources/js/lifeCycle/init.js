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

import './world';


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

        $killButton.addClass('disabled');
        $startButton.removeClass('disabled');

        thisWorld.killWorld();
    });


});

