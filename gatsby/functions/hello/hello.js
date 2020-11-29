// aws lambda documentation for this setup
exports.handler = async (event, context) => {
    console.log(event);
    return {
        statusCode: 200,
        body: 'Hello!!'
    }
}

// go to URL http://localhost:8888/.netlify/functions/hello