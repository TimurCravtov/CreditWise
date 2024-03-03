#ifndef I2_LOAN_H
#define I2_LOAN_H

enum Currency {DOLLAR, EURO, LEI};

class loan {
    float requested_amount;
    float term;
    Currency currency;
};


#endif //I2_LOAN_H
