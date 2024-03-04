#ifndef I2_LOAN_H
#define I2_LOAN_H

#include <string>
#include <utility>
#include <crow.h>

enum Currency {dollar, euro, lei};

class Loan {

    // from bank:
    std::string loan_type;
    int min_requested;
    int max_requested;
    float DAE;
    int term_in_month;
    int min_term;
    int max_term;

    // from user:
    float requested_amount;

    Currency currency;

public:
    Loan(std::string loan_type, int min_requested, int max_requested, int min_term, int max_tem, float DAE) :
        loan_type(std::move(loan_type)),
        min_requested(min_requested),
        max_requested(max_requested),
        min_term(min_term),
        max_term(max_tem),
        DAE(DAE)
    {}

    crow::json::wvalue to_json() {
        crow::json::wvalue json;
        json["type"] = this->loan_type;
        json["min_requested"] = this->min_requested;
         json["max_requested"] = this->max_requested;

        json["min_term"] = this->min_term;
        json["max_term"] = this->max_term;
        json["DAE"] = this->DAE;
        return json;
    }

};

#endif
