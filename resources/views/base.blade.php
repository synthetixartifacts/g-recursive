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
        <textarea type="text" id="main-goal" value="">create a small AI household and have fun together</textarea>
    </div>

    <div class="actions">
        <button id="start_it" class="primary disabled">Start world</button>
        <!-- <button id="stop_it" class="tiercary disabled">Stop</button> -->
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
    <li>Create another AI agent</li>
    <li>Talk to a specific agent</li>
    <li>Add a goal</li>
    <li>Complete a goal</li>
    <li>Write in memory</li>
    <li>Perform a Google search</li>
    <li>Browse a URL</li>
</ul>

If you have any suggestions for new actions, please send them to me 😀
<br><br>
You can also contribute to the code: <a href="https://github.com/synthetixartifacts/g-recursive" target="_blank">GITHUB</a>

<br/><br/>
Enjoy exploring the possibilities and witnessing the power of AI in action!



</div></div>

@vite(['resources/js/lifeCycle/init.js'])

@endsection