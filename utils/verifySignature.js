const crypto = require('crypto');


const verifySignature = (req, res, next) => {
    const url = "https://knowledge-base-backend-7tiz.onrender.com" + res.originalUrl.split('?')[0];
    const query = req.originalUrl.split('?')[1];
    const timestamp = req.headers['timestamp'];
    const receivedHash = req.headers['authorization'];
    const requestBody = JSON.stringify(req.body || "");

    const signatureString = url + query + timestamp + receivedHash + requestBody;

    const computedHash = crypto.createHash('sha256').update(signatureString).digest('hex');

    if(signatureHash == computedHash) {
        return next();
    }

    return res.status(401).json({ error: "Unauthorized request"})
}

module.exports(verifySignature);