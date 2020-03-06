# DATAVIZ

## Installation du front

Il s'agit du dossier Front. Après avoir cloné le git, il faut exécuter la commande suivante : `npm install` (cette commande va installer tous les modules).  
Pour lancer le serveur Angular, exécutez la commande suivante : `ng serve -o` (le `-o` va ouvrir automatiquement une fenêtre avec le front).  

## Installation du back

Il s'agit du dossier Back. Il faut faire la même commande que celle du front pour installer : `npm install`

## Lancement du docker-bdd et création de la base de donnée

Il faut se rendre dans le dossier Docker-Bdd. Une fois dans le dossier, exécutez la commande suivante pour lancer le docker : `docker-compose up -d`  
Une fois lancé, allez sur [localhost:8888](localhost:8888). Vous arriverez sur la page de connexion de PhpMyAdmin.  
L'identifiant est **root** et le mot de passe est **root**.  
Ensuite, dans les onglets en haut, sélectionnez **Importer**. Il faudra alors importer le fichier **bdd.sql**. Une fois importé, cliquez sur **Exécuter**.  
Normalement, la base apparaîtra sur la liste à gauche, ce qui veut dire qu'elle est entièrement opérationnelle.