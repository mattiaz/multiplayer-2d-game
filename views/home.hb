<div class="jumbotron">
    {{#if login}}
        <h1>Join the game</h1>
        <h2>{{{message}}}</h2>
        <a class="btn btn-lg btn-success signup-btn" href="/play" role="button">Play now!</a>
    {{else}}
        <h1>Sign up today</h1>
        <a class="btn btn-lg btn-success signup-btn" href="/signup" role="button">Play for free</a>
    {{/if}}
</div>
<div class="row marketing">
    <div class="col-lg-6">
        <h4>Status</h4>
        <p>{{{players}}}</p>
    </div>

    <div class="col-lg-6">
    <h4>Development</h4>
    <p>Check out some dev stuffs: <a href="/test">test page</a>. A debugger page with all active users and more.</p>

    <h4>Credits</h4>
    <p>A project made by Mattias Ajander. <br>Twitter: <a href="http://twitter.com/mattiasajander">@mattiasajander</a><br>Github: <a href="https://github.com/mattiaz">@mattiaz</a></p>
    </div>
</div>