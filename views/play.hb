<script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
<script src="http://code.jquery.com/jquery-1.11.1.js"></script>

<pre><code>{{print}}</code></pre>

<script>
    
    var socket = io();

    socket.on('connect', function(msg){
        console.log('connected!')
    });

    socket.on('disconnect', function(msg){
        console.log('disconnected!')
    });
    
</script>