#include "bank.h"
#include "loan.h"
#include <utility>
#include <crow.h>
#include <vector>

Bank::Bank(int id, std::string name, std::string logo_path) : id(id), name(std::move(name)), logo_path(std::move(logo_path)) {}

std::string Bank::get_name() {return this->name;}
std::string Bank::get_logo() {return this->logo_path;}
void Bank::add_offer(std::string loan_type, int min_requested, int max_requested, int min_term, int max_tem, float DAE) {
    this->offers.emplace_back(loan_type, min_requested, max_requested, min_term, max_tem, DAE);
}
crow::json::wvalue Bank::to_json() {
    crow::json::wvalue json;
    json["id"] = this->id;
    json["name"] = this->name;
    json["logo_path"] = this->logo_path;

    crow::json::wvalue::list offers_list;
    for (auto offer : this->offers) {
        offers_list.push_back(offer.to_json());
    }
    json["offers"] = crow::json::wvalue(offers_list);
    return json;
}
std::vector<Loan> Bank::get_offers() const {
    return this->offers;
}

int Bank::get_offer_id(std::string offer) const {
    for (int i = 0; i < this->offers.size(); i++) {
        std::cout << this->offers[0].get_loan_type() << " \n";
        if (this->offers[i].get_loan_type() == offer) return i;
    }
    return -1;
}
