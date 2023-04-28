@extends('commons.init')

@section('content_alone')

<div class="contained top_page"><div class="wrap content-text">
<h1>G Recursive</h1>
<h2>An autonomous recursive system that uses the GPT API to achieve a specific goal</h2>
<h3>Test/Fun/Creative Project - Use at your own risk 😁</h3>
</div>
</div>
@include('tools.separator-color')
@include('tools.separator-dark')

<div class="contained"><div class="wrap content-text">

<div class="goal-zone">
    <div class="goal">
        <label class="">
            Main goal
            <span class="small">- main objective for the world and the first AI entity to be spawned.
        </label>
        <textarea type="text" id="main-goal" value=""></textarea>
    </div>

    <div class="actions">
        <button id="start_it" class="primary disabled">Start world</button>
        <button id="kill_it" class="secondary disabled">End World</button>
    </div>

</div>
</div></div>

@include('tools.separator-color')
@include('tools.separator-dark')

<div class="contained"><div class="wrap content-text">

<div id="world_listing" class="ai_listing"></div>

<div id="world_history">
    <div class="history_msg"><div class="infos">World yet to be started</div></div>
</div>
</div></div>


@include('tools.separator-color')
@include('tools.separator-dark')

<div class="contained"><div class="wrap content-text">

<h2>Welcome to an AI-powered virtual world!</h2>

In this interactive environment, you can set a main goal and watch the AI characters come to life as they work towards achieving it. By clicking "Start,"
you initiate an automated process where the AI characters communicate, take actions, and make decisions autonomously.

<br/><br/>
Behind the scenes, the application manages a world with its own goals and memory, while each AI character has its unique identity, role, and objectives. Our advanced AI technology allows the characters to intelligently interact with each other, remember past events, and adapt their actions to achieve the main goal you set.

<br/><br/>
AI have actions they can use by using JSON in their response.
<br/>
Currently, they can use the following list of actions (which will be enhanced over time):
<br/>
<ul>
    <li>Create another AI agent (createAI)</li>
    <li>Talk to a specific agent (talkToAI)</li>
    <li>Add a goal (addGoal)</li>
    <li>Complete a goal (completeGoal)</li>
    <li>Write in memory (writeMemory)</li>
    <li>Perform a Google search (googleSearch)</li>
    <li>Browse a URL (browseUrl)</li>
    <li>Add a comment (comment)</li>
    <li>Set all goals as complished (endAI)</li>
    <li>Execute JS script on your browser tab (execJs)</li>
</ul>

If you have any suggestions for new actions, please send them to me 😀
<br><br>
You can also contribute to the code: &nbsp;&nbsp;&nbsp;<a href="https://github.com/synthetixartifacts/g-recursive" target="_blank">
<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
GITHUB&nbsp;&nbsp;
</a>

<br/><br/>
Enjoy exploring the possibilities and witnessing the power of AI in action!



</div></div>



@include('tools.separator-color')
@include('tools.separator-dark')

<div class="contained"><div class="wrap content-text">

<h2>Customize Prompts!</h2>

Everything is linked to prompt that are sent to GPT API.
<br/></br/>
Here, you'll be able to change almost all prompt text that is send to the API if you want to play with it.
<br/>
<b>Have fun! 😄</b>

<br/><br/>

<div class="config">
    <hr/>
    <div class="item">
        <label>First AI Name</label>
        <input type="text" id="first_ai_name" name="first_ai_name" value="" />
    </div>
    <div class="item">
        <label>First AI Role</label>
        <input type="text" id="first_ai_role" name="first_ai_role" value="" />
    </div>

    <div class="item">
        <label>First AI First Message</label>
        <input type="text" id="first_ai_message" name="first_ai_message" value="" />
        <div class="infos">
            First message that will be sent to the first AI created.
        </div>
    </div>
    <br/>
    <hr/>

    <div class="item">
        <label>API System message "content"</label>
        <textarea id="person_system_content" name="person_system_content"></textarea>
        <div class="infos">
            You need to keep <b>__name__</b> and <b>__role__</b> for the logic to work.
        </div>
    </div>
    <div class="item">
        <label>API System message "suffix"</label>
        <input type="text" id="person_system_suffix" name="person_system_suffix" value="" />
        <div class="infos">
            All system message are composed like this:  <b>contentMessage - Goals - Action List - Suffix</b>
        </div>
    </div>
    <br/>
    <hr/>


    <div class="item">
        <label>API User message "prefix"</label>
        <input type="text" id="person_user_prefix" name="person_user_prefix" value="" />
        <div class="infos">
        </div>
    </div>
    <div class="item">
        <label>API User message "suffix"</label>
        <textarea id="person_user_suffix" name="person_user_suffix"></textarea>
        <div class="infos">
        </div>
    </div>
    <br/>
    <hr/>


    <div class="item">
        <label>Action message "prefix"</label>
        <input type="text" id="action_msg_prefix" name="action_msg_prefix" value="" />
        <div class="infos">
        </div>
    </div>
    <div class="item">
        <label>Action message "suffix"</label>
        <textarea id="action_msg_suffix" name="action_msg_suffix"></textarea>
        <div class="infos">
        </div>
    </div>
    <br/>
    <hr/>

    <div class="item">
        <label>Retry Message</label>
        <input type="text" id="user_retry_message" name="user_retry_message" value="" />
        <div class="infos">
            Message that will be sent back to the last AI that "acted".
        </div>
    </div>

</div>



<br/><br/>
Know that the memory and the list of actions are the only things you can update.


</div></div>

<script>
  const googleApiKey = '{{ config("app.google_api_key") }}';
  const googleCseId = '{{ config("app.google_cse_id") }}';
</script>


@vite(['resources/js/lifeCycle/init.js'])

@endsection