#include "crow.h"
#include "crow/middlewares/cors.h"

int main() {

    crow::App<crow::CORSHandler> app;

    // Customize CORS
    auto& cors = app.get_middleware<crow::CORSHandler>();

    std::string data = "hello";

    cors
            .global()
            .headers("X-Custom-Header", "Upgrade-Insecure-Requests")
            .methods("POST"_method, "GET"_method)
            .prefix("/cors")
            .origin("example.com")
            .prefix("/nocors")
            .ignore();


    CROW_ROUTE(app, "/")
            ([]() {
                crow::json::wvalue response;
                response["message"] = "Hi brp";
                return response;
            });

    // Run the server on port 8080
    app.port(8080).run();
    return 0;
}
