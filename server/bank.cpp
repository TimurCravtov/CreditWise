#include "bank.h"

#include <utility>
#include <crow.h>

Bank::Bank(int id, std::string name, std::string logo_path) : id(id), name(std::move(name)), logo_path(std::move(logo_path)) {}

std::string Bank::get_name() {return this->name;}
std::string Bank::get_logo() {return this->logo_path;}
crow::json::wvalue Bank::to_json() {
    crow::json::wvalue json;
    json["id"] = this->id;
    json["name"] = this->name;
    json["logo_path"] = this->logo_path;
    return json;
}


