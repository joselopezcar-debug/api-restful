function errorHandler(err, req, res, next) {
    console.error(err.stack); // Muestra el error en la consola para desarrollo

    const statusCode = err.statusCode || 500;
    const message = err.message || "Ocurrió un error interno en el servidor";

    res.status(statusCode).json({
        error: true,
        status: statusCode,
        message: message
    });
}

module.exports = errorHandler;