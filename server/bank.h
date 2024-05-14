#ifndef  BANK_H
#define BANK_H
#include <string>
#include <utility>
#include <vector>
#include <crow.h>
#include "loan.h"

class Bank {

    unsigned long id;
    std::string name;
    std::string logo_path;
    std::vector<Loan> offers;

public:
    Bank(unsigned long id, std::string name, std::string logo_path);
    void add_offer(std::string loan_type, unsigned long min_requested, unsigned long max_requested, unsigned long min_term, unsigned long max_tem, float DAE, int floating_percent = 0);
    std::string get_name();
    std::string get_logo();
    crow::json::wvalue to_json();
    std::vector<Loan> get_offers() const;
    unsigned long get_offer_id(std::string offer) const;
};

#endif //BANK_H
