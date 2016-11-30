#!/bin/bash

echo "=> Creating and importing tbnl_2003 database"

mysql -uroot -e "CREATE DATABASE tbnl_2003;"
mysql -uroot tbnl_2003 < /tbnl_2003/tbnl_2003.sql
