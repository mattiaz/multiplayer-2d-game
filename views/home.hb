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