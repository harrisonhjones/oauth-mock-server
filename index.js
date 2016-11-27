/** HTTP Server **/
var uuid = require('uuid');
const express = require('express');  
const app = express();  

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var port = process.env.PORT || 3000;

app.listen(port, (err) => {  
    if (err) {
        return console.log('[ERROR] [HTTP-SERVER] something bad happened. Error:', err);
    }
    console.log('[INFO] [HTTP-SERVER] server is listening on port:', port);
})

/** Misc Pages **/
app.get('/', (request, response) => {
    console.log('[INFO] [HTTP-SERVER] GET /index');

    var payload = ''; 
    payload += ('<h1>Index page</h1>\n')
    payload += ('OAuth mock server. Provide the authorization code below you want to use.<br/>\n');
    payload += ('<a href="/sping">/sping GET</a><br/>\n');
    payload += ('<a href="/privacy">/privacy GET</a><br/>\n');
    payload += ('<a href="/authorize">/authorize GET</a><br/>\n');
    payload += ('/token POST<br/>\n');
    response.send(payload);
});

app.get('/sping', (request, response) => {  
    console.log('[INFO] [HTTP-SERVER] GET /sping');
    var payload = '';
    payload += 'healthy';
    response.send(payload);
});

app.get('/privacy', (request, response) => {
    console.log('[INFO] [HTTP-SERVER] GET /privacy'); 
    var payload = '';
    payload += 'Please email harrisonhjones@gmail.com for privacy information';
    response.send(payload);
});

/** OAuth Account Linking **/
app.get('/authorize', (request, response) => {  
    console.log('[INFO] [HTTP-SERVER] GET /authorize');
    var payload = '';
    payload += '<h1>Authorize</h1>\n';
    payload += ('<b>Redirect URI</b>: ' + request.query['redirect_uri'] + '<br/>\n');
    payload += ('<b>State</b>: ' + request.query['state'] + '<br/>\n');
    payload += ('<br/><b>Authorization Code</b>: <input type="text" id="auth_code" value="bob"/><br/>\n');
    payload += ('<br/><button type="button" onclick="link()">Authorize</button>\n')

    // Link script
    payload += '<script type="text/javascript">\n';
    payload += '\tfunction link() {\n';
    payload += '\t\tvar url = "' + request.query['redirect_uri'] + '?state=' + request.query['state'] + '&code=" + document.getElementById(\'auth_code\').value;\n';
    payload += '\t\tconsole.log(url);\n';
    payload += '\t\twindow.location = url;\n';
    payload += '\t}\n';
    payload += '</script>\n';

    response.send(payload);
});

app.post('/token', (request, response) => {  
    console.log('[INFO] [HTTP-SERVER] POST /token');
    var payload = '';
    payload += ('{"access_token": "' + request.body.code + '"}');
    response.send(payload);
});

module.exports = app;