#ifndef I2_BANK_H
#define I2_BANK_H
#include <string>
#include <utility>
#include <vector>
#include <crow.h>
#include "loan.h"

class Bank {

    int id;
    std::string name;
    std::string logo_path;
    std::vector<Loan> offers;

public:
    Bank(int id, std::string name, std::string logo_path);
    void add_offer(std::string loan_type, int min_requested, int max_requested, int min_term, int max_tem, float DAE);
    std::string get_name();
    std::string get_logo();
    crow::json::wvalue to_json();
};

#endif //I2_BANK_H
