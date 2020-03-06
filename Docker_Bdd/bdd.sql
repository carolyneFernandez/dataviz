-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 04 mars 2020 à 12:36
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `dataviz`
--
CREATE DATABASE IF NOT EXISTS `dataviz` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `dataviz`;

-- --------------------------------------------------------

--
-- Structure de la table `city`
--

DROP TABLE IF EXISTS `city`;
CREATE TABLE IF NOT EXISTS `city` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `code_city` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `departement` varchar(255) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `latitude` decimal(10,7) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `city`
--

INSERT INTO `city` (`ID`, `code_city`, `name`, `departement`, `longitude`, `latitude`) VALUES
(1, 62041, 'Arras', 'Pas-de-Calais', '2.7772211', '50.2910480'),
(2, 75000, 'Paris', 'La Seine', '2.3514616', '48.8566969'),
(3, 59000, 'Lille', 'Nord', '3.0635282', '50.6365654'),
(4, 80000, 'Amiens', 'Somme', '2.2956951', '49.8941708'),
(5, 76000, 'Rouen', 'Seine Maritime', '1.0939658', '49.4404591'),
(6, 27000, 'Evreux', 'Eure', '1.1510164', '49.0268903'),
(7, 14000, 'Caen', 'Calvados', '-0.3690815', '49.1828008'),
(8, 61000, 'Alençon', 'Orne', '0.0911374', '48.4312059'),
(9, 50000, 'Saint-Lô', 'Manche', '-1.0906637', '49.1157004'),
(10, 72000, 'Le Mans', 'Sarthe', '0.1967379', '48.0073498'),
(11, 49000, 'Angers', 'Maine et Loire', '-0.5515588', '47.4739884'),
(12, 44000, 'Nantes', 'Loire Atlantique', '-1.5541362', '47.2186371'),
(13, 85000, 'La Roche-sur-Yon', 'Vendée', '-1.4269698', '46.6705431'),
(14, 35000, 'Rennes', 'Ille et Vilaine', '-1.6800198', '48.1113387'),
(15, 56000, 'Vannes', 'Morbihan', '-2.7599079', '47.6586772'),
(16, 22000, 'Saint-Brieuc', 'Côtes d\'Armor', '-2.7645226', '48.5138054'),
(17, 29000, 'Quimper', 'Finistère', '-4.1024782', '47.9960325'),
(18, 28000, 'Chartres', 'Eure et Loir', '1.4881434', '48.4438601'),
(19, 45000, 'Orléans', 'Loiret', '1.9086066', '47.9027336'),
(20, 18000, 'Bourges', 'Cher', '2.3989320', '47.0805693'),
(21, 41000, 'Blois', 'Loir et Cher', '1.3337639', '47.5876861'),
(22, 37000, 'Tours', 'Indre et Loire', '0.6889268', '47.3900474'),
(23, 36000, 'Châteauroux', 'Indre', '1.6957099', '46.8047000'),
(24, 23000, 'Guéret', 'Creuse', '1.8713349', '46.1686865'),
(25, 19000, 'Tulle', 'Corrèze', '1.7706904', '45.2678158'),
(26, 87000, 'Limoges', 'Haute-Vienne', '1.2644847', '45.8354243'),
(27, 79000, 'Niort', 'Deux-Sèvres', '-0.4645212', '46.3239455'),
(28, 16000, 'Angoulême', 'Charente', '0.1576745', '45.6512748'),
(29, 17000, 'La Rochelle', 'Charente Maritime', '-1.1520434', '46.1591126'),
(30, 24000, 'Périgueux', 'Dordogne', '0.7184407', '45.1909365'),
(31, 56000, 'Vannes', 'Morbihan', '-2.7599079', '47.6586772'),
(32, 47000, 'Agen', 'Lot et Garonne', '0.6176324', '44.2015624'),
(33, 33000, 'Bordeaux', 'Gironde', '-0.5800364', '44.8412250'),
(34, 40000, 'Mont-de-Marsan', 'Landes', '-0.5009720', '43.8911318'),
(35, 64000, 'Pau', 'Pyrénées Atlantiques', '-0.3685668', '43.2957547'),
(36, 65000, 'Tarbes', 'Hautes-Pyrénées', '0.0781021', '43.2328580'),
(37, 32000, 'Auch', 'Gers', '0.5850507', '43.6463558'),
(38, 82000, 'Montauban', 'Tarn et Garonne', '44.0175835', '1.3549991'),
(39, 46000, 'Cahors', 'Lot', '1.4364999', '44.4495000'),
(40, 12000, 'Rodez', 'Aveyron', '2.5728419', '44.3516207'),
(41, 48000, 'Mende', 'Lozère', '3.4991057', '44.5180226'),
(52, 30000, 'Nîmes', 'Gard', '4.3600687', '43.8374249'),
(53, 34000, 'Montpellier', 'Hérault', '3.8767337', '43.6112422'),
(54, 11000, 'Carcassonne', 'Aude', '2.3491069', '43.2130358'),
(55, 66000, 'Perpignan', 'Pyrénées Orientales', '2.8953121', '42.6985304'),
(56, 9000, 'Foix', 'Ariège', '1.6053807', '42.9638998'),
(57, 31000, 'Toulouse', 'Haute-Garonne', '1.4442469', '43.6044622'),
(58, 81000, 'Albi', 'Tarn', '2.1478990', '43.9277552'),
(59, 13001, 'Marseille', 'Bouches du Rhône', '5.3699525', '43.2961743'),
(60, 83000, 'Toulon', 'Var', '5.9304919', '43.1257311'),
(61, 6000, 'Nice', 'Alpes Maritimes', '7.2683912', '43.7009358'),
(62, 4000, 'Digne-les-Bains', 'Alpes de Haute-Provence', '6.2351431', '44.0918144'),
(63, 84000, 'Avignon', 'Vaucluse', '4.8059012', '43.9492493'),
(64, 5000, 'Gap', 'Hautes-Alpes', '6.0820018', '44.5611978'),
(65, 7000, 'Privas', 'Ardèche', '4.5986733', '44.7352708'),
(66, 26000, 'Valence', 'Drôme', '4.8920811', '44.9332277'),
(67, 38000, 'Grenoble', 'Isère', '5.7357819', '45.1875602'),
(68, 73000, 'Chambéry', 'Savoie', '5.9203636', '45.5662672'),
(69, 74000, 'Annecy', 'Haute-Savoie', '6.1288847', '45.8992348'),
(70, 1000, 'Bourg-en-Bresse', 'Ain', '5.2250324', '46.2051192'),
(71, 69001, 'Lyon', 'Rhône', '4.8320114', '45.7578137'),
(72, 42000, 'Saint-Étienne', 'Loire', '4.3873058', '45.4401467'),
(73, 43000, 'Le Puy-en-Velay', 'Haute-Loire', '3.8855537', '45.0459739'),
(74, 15000, 'Aurillac', 'Cantal', '2.4433101', '44.9285441'),
(75, 63000, 'Clermont-Ferrand', 'Puy de Dôme', '3.0819427', '45.7774551'),
(76, 3000, 'Moulins', 'Allier', '3.3331703', '46.5660526'),
(77, 71, 'Mâcon', 'Saône et Loire', '4.8322266', '46.3036683'),
(78, 39000, 'Lons-le-Saunier', 'Jura', '5.5586167', '46.6739021'),
(79, 21000, 'Dijon', 'Côte d\'Or', '5.0414701', '47.3215806'),
(80, 25000, 'Besançon', 'Doubs', '6.0243622', '47.2380222'),
(81, 90000, 'Belfort', 'Territoire de Belfort', '6.8628942', '47.6379599'),
(82, 70000, 'Vesoul', 'Haute-Saône', '6.1545239', '47.6197251'),
(83, 89000, 'Auxerre', 'Yonne', '3.5705790', '47.7961287'),
(84, 58000, 'Nevers', 'Nièvre', '3.1577203', '46.9876601'),
(85, 1000, 'Troyes', 'Aube', '4.0746257', '48.2971626'),
(86, 52000, 'Chaumont', 'Haute-Marne', '5.1395849', '48.1111324'),
(87, 88000, 'Épinal', 'Vosges', '6.4503643', '48.1747684'),
(88, 68000, 'Colmar', 'Haut-Rhin', '7.3579641', '48.0777517'),
(89, 67000, 'Strasbourg', 'Bas-Rhin', '7.7507127', '48.5846140'),
(90, 57000, 'Metz', 'Moselle', '6.1763552', '49.1196964'),
(91, 54000, 'Nancy', 'Meurthe et Moselle', '6.1834097', '48.6937223'),
(92, 55000, 'Bar-le-Duc', 'Meuse', '5.1623805', '48.7712673'),
(93, 8000, 'Charleville-Mézières', 'Ardennes', '4.7206939', '49.7735712'),
(94, 51000, 'Châlons-en-Champagne', 'Marne', '4.3628851', '48.9566218'),
(95, 77000, 'Melun', 'Seine et Marne', '2.6608169', '48.5399270'),
(96, 95000, 'Pontoise', 'Val d\'Oise', '2.1008067', '49.0508845'),
(97, 78000, 'Versailles', 'Yvelines', '2.1266886', '48.8035403'),
(98, 91000, 'Évry', 'Essonne', '3.2560400', '48.2640600'),
(99, 94000, 'Créteil', 'Val de Marne', '2.4530731', '48.7771486'),
(100, 93000, 'Bobigny', 'Seine Saint-Denis', '2.4452231', '48.9063870'),
(101, 92000, 'Nanterre', 'Hauts de Seine', '2.2071267', '48.8924273'),
(102, 0, 'Laon', 'Aisne', '3.6206860', '49.5646650'),
(103, 60000, 'Beauvais', 'Oise', '2.0823355', '49.4300997'),
(104, 97100, 'Basse-Terre', 'Guadeloupe', '-61.7333373', '16.0000778'),
(105, 97200, 'Fort-de-France', 'Martinique', '-61.0676724', '14.6027962'),
(106, 97300, 'Cayenne', 'Guyane', '-52.3258307', '4.9371143'),
(107, 20000, 'Ajaccio', 'Corse du sud', '8.7376029', '41.9263991'),
(108, 20200, 'Bastia', 'Haute-Corse', '9.4525420', '42.7065505'),
(109, 97400, 'Saint-Denis', 'Réunion', '55.4481370', '-20.8799889'),
(110, 97600, 'Mamoudzou', 'Mayotte', '45.2279908', '-12.7805856');

-- --------------------------------------------------------

--
-- Structure de la table `cloud`
--

DROP TABLE IF EXISTS `cloud`;
CREATE TABLE IF NOT EXISTS `cloud` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `cover` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `cloud`
--

INSERT INTO `cloud` (`ID`, `cover`, `name`) VALUES
(1, 20, 'few clouds'),
(2, 26, 'scattered clouds'),
(3, 24, 'few clouds'),
(4, 51, 'broken clouds'),
(5, 26, 'scattered clouds');

-- --------------------------------------------------------

--
-- Structure de la table `data`
--

DROP TABLE IF EXISTS `data`;
CREATE TABLE IF NOT EXISTS `data` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `temperature` int(11) NOT NULL,
  `wind` int(11) NOT NULL,
  `precipitation` int(11) NOT NULL,
  `cloud` int(11) NOT NULL,
  `city` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `pression` decimal(10,0) NOT NULL,
  `humidity` decimal(10,0) NOT NULL,
  `weather` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_temperature` (`temperature`),
  KEY `FK_wind` (`wind`),
  KEY `FK_precipitation` (`precipitation`),
  KEY `FK_cloud` (`cloud`),
  KEY `FK_city` (`city`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `data`
--

INSERT INTO `data` (`ID`, `temperature`, `wind`, `precipitation`, `cloud`, `city`, `date`, `pression`, `humidity`, `weather`) VALUES
(1, 1, 1, 1, 1, 2, '2020-03-01 03:00:00', '1026', '86', 'clear sky'),
(2, 2, 2, 2, 2, 2, '2020-03-02 03:00:00', '1030', '90', 'clear sky'),
(3, 3, 3, 3, 3, 2, '2020-03-03 03:00:00', '1000', '60', 'clear sky'),
(4, 4, 4, 4, 4, 2, '2020-03-04 03:00:00', '1010', '70', 'light rain'),
(5, 5, 5, 5, 5, 2, '2020-03-05 03:00:00', '1005', '75', 'clear sky');

-- --------------------------------------------------------

--
-- Structure de la table `precipitation`
--

DROP TABLE IF EXISTS `precipitation`;
CREATE TABLE IF NOT EXISTS `precipitation` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `mode` varchar(255) NOT NULL,
  `value` int(11) NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `precipitation`
--

INSERT INTO `precipitation` (`ID`, `mode`, `value`) VALUES
(1, 'no', 15),
(2, 'no', 20),
(3, 'clear sky', 16),
(4, 'rain', 110),
(5, 'clear sky', 30);

-- --------------------------------------------------------

--
-- Structure de la table `temperature`
--

DROP TABLE IF EXISTS `temperature`;
CREATE TABLE IF NOT EXISTS `temperature` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `value` decimal(10,2) NOT NULL,
  `value_max` decimal(10,2) NOT NULL,
  `value_min` decimal(10,2) NOT NULL,
  `feeling` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `temperature`
--

INSERT INTO `temperature` (`ID`, `value`, `value_max`, `value_min`, `feeling`) VALUES
(1, '25.50', '28.00', '21.00', '24.00'),
(2, '26.00', '28.50', '20.00', '24.00'),
(3, '21.00', '27.00', '18.00', '20.00'),
(4, '15.00', '16.00', '10.00', '14.00'),
(5, '16.00', '16.00', '14.00', '15.00');

-- --------------------------------------------------------

--
-- Structure de la table `wind`
--

DROP TABLE IF EXISTS `wind`;
CREATE TABLE IF NOT EXISTS `wind` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `direction_degree` decimal(10,3) NOT NULL,
  `direction_code` varchar(255) NOT NULL,
  `direction_name` varchar(255) NOT NULL,
  `speed` decimal(10,2) NOT NULL,
  `speed_name` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `wind`
--

INSERT INTO `wind` (`ID`, `direction_degree`, `direction_code`, `direction_name`, `speed`, `speed_name`) VALUES
(1, '23.000', 'NNE', 'North-northeast', '0.93', 'Calm'),
(2, '248.001', 'WSW', 'West-southwest', '4.86', 'Genttle Breeze'),
(3, '230.000', 'E', 'East', '4.60', 'Gentle Breeze'),
(4, '24.000', 'NNE', 'North-northeast', '0.94', 'Calm'),
(5, '25.000', 'N', 'North', '1.00', 'Calm');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `data`
--
ALTER TABLE `data`
  ADD CONSTRAINT `FK_city` FOREIGN KEY (`city`) REFERENCES `city` (`ID`),
  ADD CONSTRAINT `FK_cloud` FOREIGN KEY (`cloud`) REFERENCES `cloud` (`ID`),
  ADD CONSTRAINT `FK_precipitation` FOREIGN KEY (`precipitation`) REFERENCES `precipitation` (`ID`),
  ADD CONSTRAINT `FK_temperature` FOREIGN KEY (`temperature`) REFERENCES `temperature` (`ID`),
  ADD CONSTRAINT `FK_wind` FOREIGN KEY (`wind`) REFERENCES `wind` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
