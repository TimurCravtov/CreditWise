// server-side headers

#include "crow.h"
#include "crow/middlewares/cors.h"

// ecosystem headers
#include "bank.h"
#include <vector>

int main() {

    Bank maib(1, "MAIB", "https://play-lh.googleusercontent.com/bg-VhuZhJDnq8_RFolfEH1lDAUc0CYOggn61meBWTSx-dBdlG6EMbJnctc_vKwNd2PI");
    Bank micb(2, "MICB", "https://play-lh.googleusercontent.com/EgWN92o0GZGMo6WrziiMm9Mn96gGaUoE0sa3__sb80iZ3SitvIfU06fFcWFInXJlnw");
    Bank ecb(3, "ECB", "https://stroyka.md/images/articles/logos/199.png");

    std::vector<Bank> banks;
    banks.push_back(maib);
    banks.push_back(micb);
    banks.push_back(ecb);
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
            ([banks]() {
                crow::json::wvalue x;
                crow::json::wvalue::list bank_list;
                for (auto bank: banks) {
                    bank_list.push_back(bank.to_json());
                }

                x["banks"] = crow::json::wvalue(bank_list);
                return x;

            });

    CROW_ROUTE(app, "/api/bank/<string>")
            ([banks](const std::string& bankName){
                for (auto bank : banks) {
                    if (bank.get_name() == bankName) {
                        return bank.to_json();
                    }
                }
                return crow::json::wvalue();
            });

    // Run the server on port 8080
    app.port(8080).run();
    return 0;

}
