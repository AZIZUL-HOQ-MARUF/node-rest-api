module.exports = class AppResponse {
    constructor(status, body, message) {
        this.status = status || null;
        this.body = body || null;
        this.message = message || null;
    }
}