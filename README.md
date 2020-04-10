# DATAVIZ

## Projet

Dataviz est un projet sur la visualisation de données concernant la météo et la qualité des cours d'eau en France.
Le back a été construit avec NodeJS et ExpressJS, et le front avec Angular 8. Sequelize est requis au préalable.
Docker est également utilisée pour notre base de données.



## Lancement du Docker

Rendez-vous dans le dossier Docker-Bdd. Une fois dans ce dossier, exécutez la commande suivante pour créer le réseau interne du docker :  
`docker network create --internal reseau_interne_base`  
Ensuite, lancer le docker avec la commande suivante :
`docker-compose up -d`  
Une fois lancé, allez sur [localhost:8888](localhost:8888). Vous arriverez sur la page de connexion de PhpMyAdmin.  
L'identifiant est **root** et le mot de passe est **root**.  
Créez une nouvelle base de données nommée **dataviz**.

## Installation du back

A présent, rendez-vous dans le dossier Back/backend.
Installez les modules nécessaires :
`npm install`
Pour créer le schéma de la base de données, exécutez la commande suivante :
`sequelize db:migrate`
Pour plus d'informations sur Sequelize, je vous invite à vous documenter [dessus](https://sequelize.org/v5/)).
Puis :
`npm start`
Le back est prêt et à l'écoute.


## Installation du front

Il s'agit du dossier Front, exécutez la commande suivante pour installer les modules nécessaires :  
`npm install`
Pour lancer le serveur Angular, exécutez la commande suivante : 
`ng serve -o` (le `-o` va ouvrir automatiquement une fenêtre sur le site).  


Rendez-vous sur la page [localhost:4200](localhost:4200) pour profitez du site Dataviz.

## Swagger

Un swagger est disponible à l'adresse [localhost:3000/explorer](localhost:3000/explorer).
