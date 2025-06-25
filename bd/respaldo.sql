-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: db_backend_users
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_USER'),(2,'ROLE_ADMIN');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `email` varchar(75) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(75) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Maria','PERLA','sin@eliminarEl_ID.com','Striker246','$2a$10$DOMDxjYyfZ/e7RcBfUpzqeaCs8pLgcizuiQWXPkU35nOhZlFcE9MS'),(2,'Voldi','Lopez','voldi@purpura','admin','$2a$10$DOMDxjYyfZ/e7RcBfUpzqeaCs8pLgcizuiQWXPkU35nOhZlFcE9MS'),(3,'feerte','ewrewrwe','rwerew@sde','dssrrfesrf','$2a$10$DOMDxjYyfZ/e7RcBfUpzqeaCs8pLgcizuiQWXPkU35nOhZlFcE9MS'),(4,'ESTEFANI','dwdwew','sin@eliminarEl_ID.com1','Striker2461','$2a$10$xbVHWfoDZ7glJ5TVcKAnkOtgKwdhOE7Nln7YOBFp.67GkayF7cGw2'),(6,'numero_6','EN POST MAN','ALGO@a','Gatito00','$2a$10$167hPMt7fRCPq1Yp1oS/SOBIf3NXxmx/GFPxFLcDAZzjEdrT.yQxy'),(7,'numero_7','EN POST MAN','ALGO@7','Gatito007','$2a$10$WkkjNceHjUR/Agl7MUe8DOpKF/uikGrFBO/MG1eHHM6CacH6YejNO'),(8,'Angela','Ramirez','anguie@Prueba','CumbresEDITADA','$2a$10$ebmgXQy5fS0QsQHBi677seze67bbSb.2eK82.GOLdfP38pY0nP2KC'),(9,'Jannet EDITA FUNCIONA','Rivero','angela@ojona2','CUmbres0000','$2a$10$xr771gK/XAzs5K1j9xEIdeqRCMiimPoejA7QNOPhS3MvjwhZxNuey'),(10,'Jaquelin','Silva','jaqui@pop','Narujacki','$2a$10$1Fg.R9DDMc5bkxFxUXQaX.Ljidpb1EHbfO55f.pvWOFhvP1W7OCZa'),(12,'MARIA','DELCARMEN','mari@lu','marilopez','$2a$10$T2vmV3ldywKV.daCrL.0beVldF2Nri6/vE1vkX0MIrmsRB8BhVNIm'),(25,'Maria','Lopez','mari.doe@example.com','mcdl1997','$2a$10$QA0W5IOVxBNiAxx2O73fHuPbfn9W076sHEFLRQS9iTGzRVLHT9B1W'),(52,'ANDREA','Colorado','mari.doe@example.com0000000000','Striker2460000000','$2a$10$HKJwECU./hKfrSoHauD6meDX1//sjF87L8L8YWZ3Wz0ODET/TT37K'),(120,'Maria','Colorado','mari.doe@example.com9','Striker2469','$2a$10$vEizNipl69PNeYowQdXpverUNe8yYrRuS9yZJKm0f8IdUDV7e9dva'),(121,'Maria','Colorado','mari.doe@example.com11','Striker24611111','$2a$10$XrrEcNPdWrDnRkPlqzKBo.eXsGWt9eDEIcL732xoiQucziSAtryKu');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `fk_roles` (`role_id`),
  CONSTRAINT `fk_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `fk_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES (1,1),(2,1),(3,1),(4,1),(6,1),(7,1),(8,1),(9,1),(10,1),(12,1),(25,1),(52,1),(120,1),(121,1),(2,2),(7,2);
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-25 17:16:06
