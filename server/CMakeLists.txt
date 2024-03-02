cmake_minimum_required(VERSION 3.27)
project(i2)


set(CMAKE_CXX_STANDARD 17)
find_package(Crow REQUIRED)

find_package(Boost)
find_package(Boost REQUIRED COMPONENTS date_time)

add_executable(i2 main.cpp
        bank.cpp
        bank.h)
target_link_libraries(i2 PRIVATE wsock32 ws2_32 kernel32 user32 gdi32 winspool shell32 ole32 oleaut32 uuid comdlg32 advapi32)

target_link_libraries(i2 PRIVATE Crow::Crow)
