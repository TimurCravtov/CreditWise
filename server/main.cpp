// server-side headers

#include "crow.h"
#include "crow/middlewares/cors.h"

// ecosystem headers
#include "bank.h"
#include <vector>

int main() {

    Bank maib(1, "MAIB", "https://play-lh.googleusercontent.com/bg-VhuZhJDnq8_RFolfEH1lDAUc0CYOggn61meBWTSx-dBdlG6EMbJnctc_vKwNd2PI");
    std::vector<Bank> banks;
    banks.push_back(maib);

    crow::App<crow::CORSHandler> app;

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

    CROW_ROUTE(app, "/api/banks")
            ([&banks]() {
                crow::json::wvalue response;
                for (auto& bank : banks) {
                    response["banks"] = bank.to_json();
                }
                return response;
            });

    // Run the server on port 8080
    app.port(8080).run();
    return 0;

}
