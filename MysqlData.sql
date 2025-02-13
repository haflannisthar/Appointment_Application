CREATE DATABASE  IF NOT EXISTS `appointmentapp` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `appointmentapp`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: appointmentapp
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `starttime` time NOT NULL,
  `endtime` time NOT NULL,
  `duration` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_appointments_user1_idx` (`user_id`),
  CONSTRAINT `fk_appointments_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'2025-02-12','09:24:00','11:24:00',10,1),(3,'2025-02-11','10:30:00','14:29:00',10,1),(4,'2025-02-14','09:30:00','11:30:00',10,1),(5,'2025-02-15','13:31:00','15:31:00',10,1),(6,'2025-02-16','12:40:00','14:37:00',10,1),(7,'2025-02-17','09:38:00','11:38:00',10,1),(8,'2025-02-11','21:39:00','23:39:00',15,1),(9,'2025-02-12','21:40:00','23:40:00',10,1),(11,'2025-02-19','12:15:00','15:15:00',10,1);
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `BookingID` varchar(45) NOT NULL,
  `createdat` datetime NOT NULL,
  `timeslot` time NOT NULL,
  `user_id` int NOT NULL,
  `appointments_id` int NOT NULL,
  `name` varchar(225) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `status_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_bookings_user1_idx` (`user_id`),
  KEY `fk_bookings_appointments1_idx` (`appointments_id`),
  KEY `fk_bookings_status1_idx` (`status_id`),
  CONSTRAINT `fk_bookings_appointments1` FOREIGN KEY (`appointments_id`) REFERENCES `appointments` (`id`),
  CONSTRAINT `fk_bookings_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  CONSTRAINT `fk_bookings_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,'2025/02/11/001','2025-02-11 13:00:00','10:30:00',2,3,'Manjula','Manjula@gail.com','0754865215',1),(2,'2025/02/11/002','2025-02-11 17:16:45','10:40:00',1,3,'Mohamed Haflan','manx@gmail.com','0777277175',2),(6,'2025/02/11/003','2025-02-11 17:18:10','09:24:00',1,1,'Anura Kumar','anura@gmail.com','0777859685',2),(7,'2025/02/11/004','2025-02-11 17:19:26','09:30:00',1,4,'Hafsa Riyaz','hafsa@gmail.com','0115252542',2),(8,'2025/02/11/005','2025-02-11 17:56:51','13:31:00',1,5,'Mohamed Nisthar','nistharhds@gmail.com','0772363030',2),(9,'2025/02/11/006','2025-02-11 18:01:56','22:17:00',1,1,'Mohamed Haflan','haflan395@gmail.com','0777277175',2),(10,'2025/02/15/001','2025-02-12 14:52:33','13:41:00',1,5,'Ranjith Villa','Ranjith@gmail.com','0112536245',1),(11,'2025/02/14/001','2025-02-13 11:04:32','09:40:00',2,4,'Nusha Munaj','nusha@gmail.com','0452263517',1),(14,'2025/02/15/002','2025-02-13 11:09:40','13:51:00',2,5,'Nusha Munaj','nusha@gmail.com','0452265325',1),(15,'2025/02/14/002','2025-02-13 11:12:32','11:20:00',2,4,'Azarn Mand','azranm@gmail.com','0112536254',1),(16,'2025/02/19/001','2025-02-13 12:16:29','12:15:00',1,11,'Admin Admin','admin@gmail.com','0758596525',2),(17,'2025/02/19/002','2025-02-13 12:17:30','12:25:00',2,11,'Munaj Munnawwar','munamsz@gmail.co','0775865625',2),(18,'2025/02/16/001','2025-02-13 12:25:31','12:40:00',2,6,'Mohamed Haflan','haflan395@gmail.com','0777277175',1),(22,'2025/02/16/002','2025-02-13 12:34:58','14:20:00',1,6,'Anura Kumar','anura@gmail.com','0785241523',1),(23,'2025/02/17/001','2025-02-13 12:36:03','10:18:00',2,7,'Nisthar Mwsaz','nistharhds@gmail.com','0772363030',2),(24,'2025/02/16/003','2025-02-13 13:51:39','12:50:00',5,6,'Nisthar Shafeena','nisthar@yahoo.com','0772363030',1);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ADMIN'),(2,'USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Booked'),(2,'Cancelled');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_user_role1_idx` (`role_id`),
  CONSTRAINT `fk_user_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ADMIN','$2a$10$MCTc/06gIY3RuZ5R8rumUuqes7I4gb.rK2mRwp34KdGjaXVXkqbSu','mohaflan395@gmail.com',1),(2,'Munaj','$2a$10$ux1vy8goe3UvsO9NZKSKPO7Uy5A.YfTIeH0IASCkTEdiVht7DyJdS','munaj@gmail.com',2),(3,'haflan52','$2a$10$0Z7a68cuQfWMIBn7g6d9jucjCj2QaIIVNl3JKt8UDP6WFvar4tw3K','haflan395@gmail.com',2),(4,'tmobile12','$2a$10$YawNpuH4w0O6FOX4Q0IRlObUKk2ib9cRGI4aPjTnbKLDtCwtLMTz2','tescomobilejaffna@gmail.com',2),(5,'ahmnisthar','$2a$10$VgBP2oCjAhz4hzIlhnJ7yegnzFnnQW25DnLX3lkNDalernm2X2xdK','ahmnisthar@gmail.com',2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-13 14:09:36
