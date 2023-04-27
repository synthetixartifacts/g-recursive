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
        <label class="">Main goal</label>
        <br/>
        <textarea type="text" id="main-goal" value="">create a small AI household and have fun together</textarea>
    </div>
</div>





</div></div>

<br/><br/>

<h2>WORLD</h2>
<hr/>
<div id="world_listing" class="ai_listing"></div>
<hr/>


<div id="new_action"></div>

<div class="columns"><div class="w2">
</div><div class="w2 right">
</div></div>
<div class="infos-lifecycle">
<div id="ai_chatting_chat">
    <h3>Talking</h3>
    <div class="long_discussion"></div>
</div>
<div id="world_history">
    <h3>Actions</h3>
    <div class="long_discussion"></div>
</div>
</div>


</div></div>



@vite(['resources/js/lifeCycle/init.js'])

@endsection