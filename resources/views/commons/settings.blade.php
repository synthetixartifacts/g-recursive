
<div id="settings-gp"></div>

<div id="settings-open">
    <h2>Settings</h2>

    <div class="one-set">
        <h3>OpenAI API key</h2>
        <div class="password-container">
            <input id="api_key" type="password" name="api_key" class="api_key" placeholder="GPT API KEY" />
            <span class="toggle-password" id="toggle-password">&#x1F441;</span>
        </div>

        <div class="remember_wrap">
            <input type="checkbox" id="remember" name="remember" />
            <label for="remember">
                Remember API key
                <span class="mini">(7 days in cookie)</span>
            </label>
        </div>
    </div>

    <div class="one-set">
        <h3>GPT Model</h2>
        <select id="model_name">
            <option value="gpt-3.5-turbo">GPT 3 - Turbo</option>
            <option value="gpt-4">GPT 4</option>
        </select>
    </div>

    <div class="one-set">
        <h3>Tokens</h2>
        <input type="number" id="max_token" name="max_token" value="300" />
        <div class="remember_wrap">
            Max <a href="https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them">tokens →</a>
        </div>
    </div>

    <div class="one-set">
        <h3>Max iterations</h2>
        <input type="number" id="max-iteration" step="1" name="max-iteration" value="10" />
    </div>

    <div class="one-set">
        <h3>Call per min</h2>
        <input type="number" id="max-call-min" step="1" name="max-call-min" value="3" />
    </div>


    <div class="one-set explain">
        By default, if you do not use your key, settings are locked and max iteration is 10.
        <br/>
        Open AI key are available for you to "purchase", you only pay.
        <br/><br/>
        <a href="https://platform.openai.com/account/api-keys" target="_blank">Create a key →</a>
        <br/><br/>
    </div>


    <div class="explain">
        <h3>Support</h3>
        It's a creative project. Like it?
        <br/>
        Feel free to buy me a coffee, it really helps 😊

        <br/><br/>
    </div>

    <br/><br/>
    <br/><br/>
    <br/><br/>
</div>