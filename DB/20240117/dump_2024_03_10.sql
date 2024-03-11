-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: inventario
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `articulo`
--

DROP TABLE IF EXISTS `articulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulo` (
  `id_articulo` int NOT NULL AUTO_INCREMENT,
  `articulo_estado_id` int NOT NULL,
  `categoria_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `office_id` int NOT NULL,
  PRIMARY KEY (`id_articulo`),
  KEY `fk_articulo_articulo_estado1_idx` (`articulo_estado_id`),
  KEY `fk_articulo_categoria1_idx` (`categoria_id`),
  KEY `fk_articulo_usuario1_idx` (`usuario_id`),
  KEY `fk_articulo_oficina1_idx` (`office_id`),
  CONSTRAINT `fk_articulo_articulo_estado1` FOREIGN KEY (`articulo_estado_id`) REFERENCES `articulo_estado` (`articulo_estado_id`),
  CONSTRAINT `fk_articulo_categoria1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`categoria_id`),
  CONSTRAINT `fk_articulo_oficina1` FOREIGN KEY (`office_id`) REFERENCES `oficina` (`office_id`),
  CONSTRAINT `fk_articulo_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo`
--

LOCK TABLES `articulo` WRITE;
/*!40000 ALTER TABLE `articulo` DISABLE KEYS */;
INSERT INTO `articulo` VALUES (1,1,1,1,1),(2,2,2,2,2),(3,3,3,3,3),(4,4,4,4,4),(5,1,5,5,5),(6,1,2,1,4),(7,3,2,1,4);
/*!40000 ALTER TABLE `articulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articulo_baja`
--

DROP TABLE IF EXISTS `articulo_baja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulo_baja` (
  `id_articulo_baja` int NOT NULL AUTO_INCREMENT,
  `id_articulo` int NOT NULL,
  `fecha_baja` timestamp(1) NOT NULL,
  `motivo_baja` varchar(200) NOT NULL,
  `autorizacion` varchar(45) NOT NULL,
  PRIMARY KEY (`id_articulo_baja`),
  KEY `fk_articulo_baja_articulo1_idx` (`id_articulo`),
  CONSTRAINT `fk_articulo_baja_articulo1` FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`id_articulo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo_baja`
--

LOCK TABLES `articulo_baja` WRITE;
/*!40000 ALTER TABLE `articulo_baja` DISABLE KEYS */;
INSERT INTO `articulo_baja` VALUES (3,5,'2024-03-07 01:12:10.0','por algo','juan');
/*!40000 ALTER TABLE `articulo_baja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articulo_detalle`
--

DROP TABLE IF EXISTS `articulo_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulo_detalle` (
  `articulo_detalle_id` int NOT NULL AUTO_INCREMENT,
  `id_articulo` int NOT NULL,
  `anio` varchar(255) NOT NULL,
  `dimension` varchar(255) NOT NULL,
  `art_num` varchar(255) NOT NULL,
  `art_nombre` varchar(45) NOT NULL,
  `art_ingreso` timestamp NULL DEFAULT NULL,
  `art_codigo` varchar(255) DEFAULT NULL,
  `art_glosa` varchar(2000) DEFAULT NULL,
  `art_image_path` text,
  PRIMARY KEY (`articulo_detalle_id`),
  KEY `fk_articulo_detalle_articulo1_idx` (`id_articulo`),
  CONSTRAINT `fk_articulo_detalle_articulo1` FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`id_articulo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo_detalle`
--

LOCK TABLES `articulo_detalle` WRITE;
/*!40000 ALTER TABLE `articulo_detalle` DISABLE KEYS */;
INSERT INTO `articulo_detalle` VALUES (1,1,'2012','31x21','64','Hagen Daza - Dk Choocolate','2023-03-16 03:00:00','w71719','Dilation of Left Brachial Artery, Bifurcation, with Drug-eluting Intraluminal Device, Open Approach','application/x-mspowerpoint'),(2,2,'1993','02x15','64','Savory','2023-05-31 04:00:00','t35774','Occlusion of Left Axillary Lymphatic with Intraluminal Device, Percutaneous Endoscopic Approach','application/vnd.ms-excel'),(3,3,'2010','29x03','31','Bread - Pullman, Sliced','2023-02-25 03:00:00','e07047','Restriction of Right Vertebral Vein with Extraluminal Device, Percutaneous Endoscopic Approach','image/gif'),(4,4,'2012','53x73','30','Sugar - Crumb','2023-07-25 04:00:00','a98538','Change Other Device in Skull, External Approach','video/avi'),(5,5,'2003','66x70','24','Soup - Campbells Bean Medley','2023-03-29 03:00:00','p79784','Reposition Right Femoral Shaft with Hybrid External Fixation Device, Percutaneous Approach','image/png'),(6,6,'2021','100X30','121','computadores23333','2024-03-05 02:14:26','x2095','algo','lindos estuches 2'),(7,7,'2021','100X300','121','computadores1','2024-03-05 18:04:11','x2095',NULL,'lindos estuches 3');
/*!40000 ALTER TABLE `articulo_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articulo_estado`
--

DROP TABLE IF EXISTS `articulo_estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulo_estado` (
  `articulo_estado_id` int NOT NULL AUTO_INCREMENT,
  `articulo_estado` varchar(255) NOT NULL,
  PRIMARY KEY (`articulo_estado_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo_estado`
--

LOCK TABLES `articulo_estado` WRITE;
/*!40000 ALTER TABLE `articulo_estado` DISABLE KEYS */;
INSERT INTO `articulo_estado` VALUES (1,'0'),(2,'0'),(3,'1'),(4,'1'),(5,'1');
/*!40000 ALTER TABLE `articulo_estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `categoria_id` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(255) NOT NULL,
  PRIMARY KEY (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'oficina'),(2,'laboratorio'),(3,'muebles'),(4,'articulos de escritorio'),(5,'pc');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamento` (
  `departament_id` int NOT NULL AUTO_INCREMENT,
  `departament` varchar(255) NOT NULL,
  `campus_id` int NOT NULL,
  PRIMARY KEY (`departament_id`),
  KEY `fk_departamento_sede1_idx` (`campus_id`),
  CONSTRAINT `fk_departamento_sede1` FOREIGN KEY (`campus_id`) REFERENCES `sede` (`campus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (1,'nueva escuela2',1),(2,'escuela informatica',2),(3,'escuela informatica',3),(4,'nueva escuela2',1),(5,'departamento informatica',3);
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oficina`
--

DROP TABLE IF EXISTS `oficina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oficina` (
  `office_id` int NOT NULL AUTO_INCREMENT,
  `departament_id` int NOT NULL,
  `office` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`office_id`),
  KEY `fk_oficina_departamento1_idx` (`departament_id`),
  CONSTRAINT `fk_oficina_departamento1` FOREIGN KEY (`departament_id`) REFERENCES `departamento` (`departament_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oficina`
--

LOCK TABLES `oficina` WRITE;
/*!40000 ALTER TABLE `oficina` DISABLE KEYS */;
INSERT INTO `oficina` VALUES (1,1,'620'),(2,2,'740'),(3,3,'967'),(4,4,'090'),(5,5,'537'),(8,1,'99');
/*!40000 ALTER TABLE `oficina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `rol_id` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(255) NOT NULL,
  `state` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`rol_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'superadmin',2),(2,'admin',1),(3,'publico',0);
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sede`
--

DROP TABLE IF EXISTS `sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sede` (
  `campus_id` int NOT NULL AUTO_INCREMENT,
  `campus` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`campus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
INSERT INTO `sede` VALUES (1,'Macul'),(2,'Macul'),(3,'Macul'),(4,'Dieciocho'),(5,'Providencia');
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `campus_id` int NOT NULL,
  `rol_id` int NOT NULL,
  `username` varchar(55) NOT NULL,
  `password` varchar(80) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_state` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `correo_UNIQUE` (`email`),
  KEY `fk_usuario_sede1_idx` (`campus_id`),
  KEY `fk_usuario_rol1_idx1` (`rol_id`),
  CONSTRAINT `fk_usuario_rol1` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`rol_id`),
  CONSTRAINT `fk_usuario_sede1` FOREIGN KEY (`campus_id`) REFERENCES `sede` (`campus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,1,1,'tdarbon0','uK5/EST2ni|L.K>','aquoit0@webmd.com',1),(2,2,0,'aaumerle1','jK6!8N@z','sgainsbury1@taobao.com',1),(3,3,2,'ckealey2','wA9_\'#h@t\"BV','fdebenham2@rediff.com',1),(4,4,1,'mhundey3','tD9@jFwGT~H','mheadingham3@aol.com',1),(5,5,1,'ddavies4','lW5_{yy_i3','elortz4@jalbum.net',1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_log`
--

DROP TABLE IF EXISTS `usuario_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_log` (
  `user_log_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `details` varchar(255) DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  `accion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_log_id`),
  KEY `fk_usuario_log_usuario1_idx` (`user_id`),
  CONSTRAINT `fk_usuario_log_usuario1` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_log`
--

LOCK TABLES `usuario_log` WRITE;
/*!40000 ALTER TABLE `usuario_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `v_infogenerator`
--

DROP TABLE IF EXISTS `v_infogenerator`;
/*!50001 DROP VIEW IF EXISTS `v_infogenerator`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_infogenerator` AS SELECT 
 1 AS `ID`,
 1 AS `art_nombre`,
 1 AS `anio`,
 1 AS `art_num`,
 1 AS `dimension`,
 1 AS `art_ingreso`,
 1 AS `art_codigo`,
 1 AS `art_glosa`,
 1 AS `art_image_path`,
 1 AS `articulo_estado`,
 1 AS `categoria`,
 1 AS `office`,
 1 AS `departament`,
 1 AS `campus`,
 1 AS `articulo_detalle_id`,
 1 AS `articulo_estado_id`,
 1 AS `categoria_id`,
 1 AS `office_id`,
 1 AS `departament_id`,
 1 AS `campus_id`,
 1 AS `fecha_baja`,
 1 AS `motivo_baja`,
 1 AS `autorizacion`,
 1 AS `id_articulo_baja`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_users`
--

DROP TABLE IF EXISTS `v_users`;
/*!50001 DROP VIEW IF EXISTS `v_users`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_users` AS SELECT 
 1 AS `user_id`,
 1 AS `campus_id`,
 1 AS `rol_id`,
 1 AS `username`,
 1 AS `password`,
 1 AS `email`,
 1 AS `user_state`,
 1 AS `rol`,
 1 AS `rol_state`,
 1 AS `campus`,
 1 AS `departament_id`,
 1 AS `departament`,
 1 AS `departament_campus_id`,
 1 AS `office_id`,
 1 AS `office`,
 1 AS `office_departament_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_infogenerator`
--

/*!50001 DROP VIEW IF EXISTS `v_infogenerator`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_infogenerator` AS select `arttotal`.`id_articulo` AS `ID`,`art`.`art_nombre` AS `art_nombre`,`art`.`anio` AS `anio`,`art`.`art_num` AS `art_num`,`art`.`dimension` AS `dimension`,`art`.`art_ingreso` AS `art_ingreso`,`art`.`art_codigo` AS `art_codigo`,`art`.`art_glosa` AS `art_glosa`,`art`.`art_image_path` AS `art_image_path`,`state`.`articulo_estado` AS `articulo_estado`,`category`.`categoria` AS `categoria`,`office`.`office` AS `office`,`departament`.`departament` AS `departament`,`sede`.`campus` AS `campus`,`art`.`articulo_detalle_id` AS `articulo_detalle_id`,`state`.`articulo_estado_id` AS `articulo_estado_id`,`category`.`categoria_id` AS `categoria_id`,`office`.`office_id` AS `office_id`,`departament`.`departament_id` AS `departament_id`,`sede`.`campus_id` AS `campus_id`,`artbaja`.`fecha_baja` AS `fecha_baja`,`artbaja`.`motivo_baja` AS `motivo_baja`,`artbaja`.`autorizacion` AS `autorizacion`,`artbaja`.`id_articulo_baja` AS `id_articulo_baja` from (((((((`articulo` `arttotal` join `articulo_detalle` `art` on((`art`.`id_articulo` = `arttotal`.`id_articulo`))) join `articulo_estado` `state` on((`state`.`articulo_estado_id` = `arttotal`.`articulo_estado_id`))) join `categoria` `category` on((`category`.`categoria_id` = `arttotal`.`categoria_id`))) join `oficina` `office` on((`office`.`office_id` = `arttotal`.`office_id`))) join `departamento` `departament` on((`departament`.`departament_id` = `office`.`departament_id`))) join `sede` on((`sede`.`campus_id` = `departament`.`campus_id`))) left join `articulo_baja` `artbaja` on((`artbaja`.`id_articulo` = `arttotal`.`id_articulo`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_users`
--

/*!50001 DROP VIEW IF EXISTS `v_users`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_users` AS select `u`.`user_id` AS `user_id`,`u`.`campus_id` AS `campus_id`,`u`.`rol_id` AS `rol_id`,`u`.`username` AS `username`,`u`.`password` AS `password`,`u`.`email` AS `email`,`u`.`user_state` AS `user_state`,`r`.`rol` AS `rol`,`r`.`state` AS `rol_state`,`s`.`campus` AS `campus`,`d`.`departament_id` AS `departament_id`,`d`.`departament` AS `departament`,`d`.`campus_id` AS `departament_campus_id`,`o`.`office_id` AS `office_id`,`o`.`office` AS `office`,`o`.`departament_id` AS `office_departament_id` from ((((`usuario` `u` join `rol` `r` on((`u`.`rol_id` = `r`.`rol_id`))) join `sede` `s` on((`u`.`campus_id` = `s`.`campus_id`))) join `departamento` `d` on((`u`.`campus_id` = `d`.`campus_id`))) join `oficina` `o` on((`d`.`departament_id` = `o`.`departament_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-10 22:00:00
