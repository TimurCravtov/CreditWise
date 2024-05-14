#ifndef LOAN_H
#define LOAN_H

#include <string>
#include <utility>
#include <crow.h>

class Loan {
    std::string loan_type;
    unsigned long min_requested;
    unsigned long max_requested;
    double DAE;
    unsigned long min_term;
    unsigned long max_term;
    int floating_percent;

public:
    Loan(std::string loan_type, unsigned long min_requested, unsigned long max_requested, unsigned long min_term, unsigned long max_term, float DAE, int floating_percent = 0);
    double calculate_month_payment(long requested, long term) const;
    double calculate_total_payment(long requested, long term) const;
    std::string get_loan_type() const;
    crow::json::wvalue to_json();

    static std::vector<double> calculate_payment(long requested, long term, double DAE);
};

#endif
