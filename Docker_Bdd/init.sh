#!/bin/bash
docker-compose up -d
docker exec -it dataviz_db mysql -u"root" -p"root" -h"localhost" < /var/bdd.sql
