#ifndef I2_BANK_H
#define I2_BANK_H
#include <string>
#include <utility>
#include <vector>
#include <crow.h>

class Bank {

    int id;
    std::string name;
    std::string logo_path;

public:
    Bank(int id, std::string name, std::string logo_path);
    std::string get_name();
    std::string get_logo();
    crow::json::wvalue to_json();
};

#endif //I2_BANK_H
