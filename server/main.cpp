// server-side headers

#include "crow.h"
#include "crow/middlewares/cors.h"

// ecosystem headers
#include "bank.h"
#include <vector>

int main() {
    /*
     * CREATING THE DATA BASE
     */
    Bank maib(1, "MAIB", "https://play-lh.googleusercontent.com/bg-VhuZhJDnq8_RFolfEH1lDAUc0CYOggn61meBWTSx-dBdlG6EMbJnctc_vKwNd2PI");
    Bank micb(2, "MICB", "https://play-lh.googleusercontent.com/EgWN92o0GZGMo6WrziiMm9Mn96gGaUoE0sa3__sb80iZ3SitvIfU06fFcWFInXJlnw");
    Bank ecb(3, "ECB", "https://play-lh.googleusercontent.com/tz_HYqFsze-9Qg6KwhaPD32kKyvnTqR1O8Ks9fvwZTL3OCewfwm1aZMfP4k7E_migA=w480-h960");
    Bank vb(4, "VICTORIABANK", "https://play-lh.googleusercontent.com/-xZ8xhoz_aJnQgfYWGj2OzZCKVwBI39H2kLSOiSifueL6NTeJjjMp_mWifY7AS_aLA");
    maib.add_offer("Consumer credit", 1000, 400000, 1, 240, 11.3);
    maib.add_offer("Another credit", 10000, 40000, 12, 100, 3.3);
    maib.add_offer("Rassrochka", 100, 10000, 6 , 24, 0);
    maib.add_offer("Aaaaaa", 1000, 200000, 6, 360, 5.5);
    ecb.add_offer("R", 100, 1000000, 1, 12, 5.6);
    micb.add_offer("Consumer", 1000, 100000, 6, 12, 11.09);
    std::vector<Bank> banks;
    banks.push_back(maib);
    banks.push_back(vb);
    banks.push_back(micb);
    banks.push_back(ecb);
    // *****************************************************************************************************************

    crow::App<crow::CORSHandler> app;
    auto& cors = app.get_middleware<crow::CORSHandler>();
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

    CROW_ROUTE(app, "/api/calculate")
            .methods("POST"_method)
                    ([](const crow::request& req) {
                        const auto& json = crow::json::load(req.body);
                        crow::json::wvalue x;
                        x["sum"] = "NaN";
                        std::cout << json;
                        if (!json) {
                            return x;
                        }
                        int loanAmount = json["loanAmount"].i();
                        int loanTerm = json["loanTerm"].i();
                        std::string activeCredit = json["activeCredit"].s();
                        x["sum"] = 5 + 5;
                        return x;
                    });

    app.port(8080).run();
    return 0;

}
