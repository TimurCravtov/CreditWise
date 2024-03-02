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
    Bank(int id, std::string name, std::string logo_path) {
        this->id = id;
        this->name = std::move(name);
        this->logo_path;
    }
    std::string get_name() {
        return this->name;
    }
    std::string get_logo() {
        return this->logo_path;
    }

    crow::json::wvalue to_json() {
        crow::json::wvalue json;
        json["id"] = id;
        json["name"] = name;
        json["logo_path"] = logo_path;
        return json;
    }

};


#endif //I2_BANK_H
