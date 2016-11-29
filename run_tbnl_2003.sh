#!/bin/bash

source /run.sh

mysql -uroot -e "CREATE DATABASE tbnl_2003;"
mysql -uroot tbnl_2013 < /tbnl_2003/tnl_2003.sql