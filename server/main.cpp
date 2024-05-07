// server-side headers

#include "crow.h"
#include "crow/middlewares/cors.h"

// ecosystem headers
#include "bank.h"
#include "loan.h"
#include <vector>

int main() {
     /** CREATING THE DATA BASE
     * <pre>
     * I'm very sorry for it. I should have used a real database, but I have no idea how to implement it in crow.h
     * <pre>
     * I could have created a database.txt file, but that's worse, right?
     * <pre>
     * If you think my jokes are bad, have a look at my frontend code
     */
    Bank maib(1, "MAIB", "https://play-lh.googleusercontent.com/bg-VhuZhJDnq8_RFolfEH1lDAUc0CYOggn61meBWTSx-dBdlG6EMbJnctc_vKwNd2PI");
    Bank micb(2, "MICB", "https://play-lh.googleusercontent.com/EgWN92o0GZGMo6WrziiMm9Mn96gGaUoE0sa3__sb80iZ3SitvIfU06fFcWFInXJlnw");
    Bank ecb(3, "ECB", "https://play-lh.googleusercontent.com/tz_HYqFsze-9Qg6KwhaPD32kKyvnTqR1O8Ks9fvwZTL3OCewfwm1aZMfP4k7E_migA=w480-h960");
    Bank vb(4, "VICTORIABANK", "https://play-lh.googleusercontent.com/-xZ8xhoz_aJnQgfYWGj2OzZCKVwBI39H2kLSOiSifueL6NTeJjjMp_mWifY7AS_aLA");
    maib.add_offer("Consumer credit", 1000, 350000, 12, 60, 11.3);
    maib.add_offer("Credit de consum espresso", 5000, 40000, 12, 100, 10.20);
    maib.add_offer("Credit ipotecar", 50000, 5000000, 6, 360, 8.08, 1);
    ecb.add_offer("R", 100, 1000000, 1, 12, 5.6);
    micb.add_offer("Consumer", 1000, 100000, 6, 12, 11.09);
    maib.add_offer("Credit prima casă", 30000, 800000, 6, 300, 8.03, 1);

    micb.add_offer("Nevoi personale, fără gaj", 100000, 400000, 6, 60, 11.34);

    std::vector<Bank> banks;

    banks.push_back(maib);
    banks.push_back(micb);
    banks.push_back(ecb);
    banks.push_back(vb);
    // *****************************************************************************************************************

    // cors fixing for being able to fetch data
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


    // crow routes
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
                    ([banks](const crow::request& req) {
                        const auto& json = crow::json::load(req.body);
                        crow::json::wvalue x;
                        std::cout << json;
                        if (!json) {
                            return x;
                        }

                        double loan_amount = json["loanAmount"].d();
                        long loan_term = json["loanTerm"].d();
                        long bank_id = json["bankId"].d();

                        std::string activeCredit = json["activeCredit"].s();
                        long credit_id = banks[bank_id-1].get_offer_id(activeCredit);

                        x["monthPayment"] = banks[bank_id-1].get_offers()[credit_id].calculate_month_payment(loan_amount, loan_term);
                        x["totalPayment"] = banks[bank_id-1].get_offers()[credit_id].calculate_total_payment(loan_amount, loan_term);

                        return x;
                    });

    CROW_ROUTE(app, "/api/calculate/general")

            .methods("POST"_method) ([banks](const crow::request& req) {

                const auto& json = crow::json::load(req.body);
                crow::json::wvalue x;
                std::cout << json;
                if (!json) {
                    return x;
                }

                int loan_amount = json["loanAmount"].d();
                long loan_term = json["loanTerm"].d();
                long DAE = json["DAE"].d();

                auto payment = Loan::calculate_payment(loan_amount, loan_term, DAE);
                x["monthPayment"] = payment[0];
                x["totalPayment"] = payment[1];

                return x;

    });

    // running on port 8080
    app.port(8080).run();
    return 0;

}
