<div class="jumbotron">
    <h1>Sign up today</h1>
    <p>
        
    </p>
    {{#if login}}
        <a class="btn btn-lg btn-success signup-btn" href="/play" role="button">Play for free</a>
    {{else}}
        <a class="btn btn-lg btn-success signup-btn" href="/signup" role="button">Play for free</a>
    {{/if}}
</div>