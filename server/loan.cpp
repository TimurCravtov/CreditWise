#include "loan.h"
#include <cmath>

Loan::Loan(std::string loan_type, unsigned long min_requested, unsigned long max_requested, unsigned long min_term, unsigned long max_term, float DAE, int floating_percent) :
        loan_type(std::move(loan_type)),
        min_requested(min_requested),
        max_requested(max_requested),
        min_term(min_term),
        max_term(max_term),
        DAE(DAE),
        floating_percent(floating_percent)
{}

double Loan::calculate_month_payment(long requested, long term) const {
    double r = this->DAE / 1200;
    return r * requested / (1 - pow((1 + r) ,-term));
}

double Loan::calculate_total_payment(long requested, long term) const {
    return term * calculate_month_payment(requested, term);
}

std::string Loan::get_loan_type() const {
    return this->loan_type;
}

crow::json::wvalue Loan::to_json() {
    crow::json::wvalue json;
    json["type"] = this->loan_type;
    json["min_requested"] = this->min_requested;
    json["max_requested"] = this->max_requested;
    json["min_term"] = this->min_term;
    json["max_term"] = this->max_term;
    json["DAE"] = this->DAE;
    json["floating_percent"] = this->floating_percent;
    return json;
}

std::vector<double> Loan::calculate_payment(long requested, long term, double DAE) {
    double r = DAE / 1200;
    double M = r * requested / (1 - pow((1 + r) ,-term));
    return std::vector<double> {M, term*M};
}

