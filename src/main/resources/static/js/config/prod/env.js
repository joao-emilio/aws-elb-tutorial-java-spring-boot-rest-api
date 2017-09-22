(function (window) {
    window.__env = window.__env || {};

    // API url
    // For demo purposes we fetch from local file in this plunk
    // In your application this can be a url like https://api.github.com
    //window.__env.apiUrl = 'http://localhost:8080/api/';
    window.__env.apiUrl = 'http://pc.devthinkers.com/api/';

    window.__env.baseUrl = '/';
    window.__env.imagesUrl = 'https://s3-sa-east-1.amazonaws.com/bodyapp/';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
}(this));