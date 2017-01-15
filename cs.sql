-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: cs
-- ------------------------------------------------------
-- Server version	5.6.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `catalogs`
--

DROP TABLE IF EXISTS `catalogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `owner_name` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `md5` char(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `garbage` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `cur_catalog_name` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `father_catalog_name` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `validate` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `click` int(11) NOT NULL DEFAULT '0',
  `download` int(11) NOT NULL DEFAULT '0',
  `address` char(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `size` bigint(20) NOT NULL DEFAULT '-1',
  `root_garbage` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogs`
--

LOCK TABLES `catalogs` WRITE;
/*!40000 ALTER TABLE `catalogs` DISABLE KEYS */;
INSERT INTO `catalogs` VALUES (47,'yfh','4a2d4a3307038ede06cfdb28256aa272','0000-00-00 00:00:00','u=1825165654,1935296637&fm=21&gp=0.jpg','yfh',NULL,0,38,'/website/storage/picture',5550,0,'2015-11-26 20:13:03','2015-11-26 20:13:03'),(48,'yfh','d7bd7049fb7e0de07779f2d067073424','0000-00-00 00:00:00','Al、eluveitie、l、the - Passage.mp3','yfh',NULL,0,7,'/website/storage/music',2190058,0,'2015-11-30 03:15:40','2015-11-30 03:15:40'),(49,'yfh','6436b0043144fdee01f0a2baecf76be7','0000-00-00 00:00:00','夜的钢琴曲 - 五.mp3','yfh',NULL,0,2,'/website/storage/music',1526888,0,'2015-11-30 03:55:15','2015-11-30 03:55:15'),(50,'yfh','1ad84a1885e6d65432d3b5b3f253fc6c','0000-00-00 00:00:00','魔戒-I See Fire(Performed by Ed Sheeran).mp3','yfh',NULL,0,0,'/website/storage/music',2408064,0,'2015-11-30 03:55:35','2015-11-30 03:55:35'),(51,'yfh','af198dd4968519b8249e8f1ff2465cd1','0000-00-00 00:00:00','钢琴曲 - River Flows In You.mp3','yfh',NULL,0,0,'/website/storage/music',3021984,0,'2015-11-30 03:56:06','2015-11-30 03:56:06'),(52,'yfh','297b34c9703ed19d079e4dfc3d2b9746','0000-00-00 00:00:00','Journey - Capozio.mp3','yfh',NULL,0,0,'/website/storage/music',2889017,0,'2015-11-30 05:01:11','2015-11-30 05:01:11'),(53,'yfh','ac3990a4c31c81fbc78d7b85fb167ade','0000-00-00 00:00:00','纯音乐 - You.mp3','yfh',NULL,0,0,'/website/storage/music',3363317,0,'2015-11-30 06:39:39','2015-11-30 06:39:39'),(54,'yfh','09786ebed02f1772ed2b6658f1a8bf1b','0000-00-00 00:00:00','周杰伦 - 霍元甲.mp3','yfh',NULL,0,0,'/website/storage/music',4489223,0,'2015-11-30 06:42:35','2015-11-30 06:42:35'),(55,'yfh','ab73c71eb76daff78325eba36864a176','0000-00-00 00:00:00','张学友 - 烦恼歌.mp3','yfh',NULL,0,0,'/website/storage/music',4079619,0,'2015-11-30 06:53:53','2015-11-30 06:53:53'),(56,'yfh',NULL,'0000-00-00 00:00:00','123','yfh',NULL,0,0,NULL,-1,0,'2015-12-05 00:35:34','2015-12-05 00:35:34'),(57,'yfh',NULL,'0000-00-00 00:00:00','456','yfh/123',NULL,0,0,NULL,-1,0,'2015-12-05 00:35:49','2015-12-05 00:35:49'),(58,'yfh',NULL,'0000-00-00 00:00:00','789','yfh',NULL,0,0,NULL,-1,0,'2015-12-10 01:23:15','2015-12-10 01:23:15'),(59,'yfh',NULL,'0000-00-00 00:00:00','新建文件夹','yfh',NULL,0,0,NULL,-1,0,'2015-12-10 01:23:21','2015-12-10 01:23:21'),(60,'zcy',NULL,'0000-00-00 00:00:00','7741','zcy',NULL,0,0,NULL,-1,0,'2015-12-12 00:35:23','2015-12-12 00:35:23'),(61,'zcy','0005c61ba91038ed35d32b3be33f1cbd','0000-00-00 00:00:00','456.jpg','zcy/7741/123',NULL,0,0,'/website/storage/picture',118676,0,'2015-12-12 01:03:23','2015-12-12 01:03:23'),(62,'yfh','fe29747a42d1658099f9e2dd653e9782','0000-00-00 00:00:00','新建文本文档.txt','yfh',NULL,0,3,'/website/storage/text',10692,0,'2015-12-12 21:17:01','2015-12-12 21:17:01'),(66,'zcy','67290e13ad2016a78b59b0d89096498a','0000-00-00 00:00:00','haha1.flv','zcy/7741',NULL,17,0,'/website/storage/video',13736859,0,'2015-12-16 03:37:22','2015-12-16 03:37:22'),(67,'zcy','610c5dce66c50a43aa147c009ed47ac1','0000-00-00 00:00:00','Hearthstone 2015_9_26 0_00_24.mp4','zcy/7741',NULL,5,0,'/website/storage/video',6056035,0,'2015-12-16 04:39:07','2015-12-16 04:39:07'),(68,'zcy','5d708a7c0929ec9794ead68cd4c83965','0000-00-00 00:00:00','123.avi','zcy/7741/123',NULL,4,0,'/website/storage/video',24834138,0,'2015-12-16 16:48:48','2015-12-16 16:48:48'),(69,'zcy',NULL,'0000-00-00 00:00:00','123','zcy/7741',NULL,0,0,NULL,-1,0,'2015-12-24 04:35:46','2015-12-24 04:35:46'),(70,'zcy',NULL,'0000-00-00 00:00:00','新建文件夹','zcy',NULL,0,0,NULL,-1,0,'2016-01-07 19:24:58','2016-01-07 19:24:58');
/*!40000 ALTER TABLE `catalogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `md5` char(64) COLLATE utf8_unicode_ci NOT NULL,
  `file_size` bigint(20) NOT NULL,
  `address` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `owner_num` int(11) NOT NULL,
  `type` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (30,'4a2d4a3307038ede06cfdb28256aa272',5550,'/website/storage/picture',1,'jpg','2015-11-26 20:13:02','2015-11-26 20:13:02'),(31,'d7bd7049fb7e0de07779f2d067073424',2190058,'/website/storage/music',1,'mp3','2015-11-30 03:15:38','2015-11-30 03:15:38'),(32,'6436b0043144fdee01f0a2baecf76be7',1526888,'/website/storage/music',1,'mp3','2015-11-30 03:55:15','2015-11-30 03:55:15'),(33,'1ad84a1885e6d65432d3b5b3f253fc6c',2408064,'/website/storage/music',1,'mp3','2015-11-30 03:55:35','2015-11-30 03:55:35'),(34,'af198dd4968519b8249e8f1ff2465cd1',3021984,'/website/storage/music',1,'mp3','2015-11-30 03:56:06','2015-11-30 03:56:06'),(35,'297b34c9703ed19d079e4dfc3d2b9746',2889017,'/website/storage/music',1,'mp3','2015-11-30 05:01:11','2015-11-30 05:01:11'),(36,'ac3990a4c31c81fbc78d7b85fb167ade',3363317,'/website/storage/music',1,'mp3','2015-11-30 06:39:39','2015-11-30 06:39:39'),(37,'09786ebed02f1772ed2b6658f1a8bf1b',4489223,'/website/storage/music',1,'mp3','2015-11-30 06:42:35','2015-11-30 06:42:35'),(38,'ab73c71eb76daff78325eba36864a176',4079619,'/website/storage/music',1,'mp3','2015-11-30 06:53:53','2015-11-30 06:53:53'),(39,'0005c61ba91038ed35d32b3be33f1cbd',118676,'/website/storage/picture',2,'jpg','2015-12-12 01:02:40','2015-12-12 01:03:23'),(40,'fe29747a42d1658099f9e2dd653e9782',10692,'/website/storage/text',1,'txt','2015-12-12 21:17:01','2015-12-12 21:17:01'),(44,'67290e13ad2016a78b59b0d89096498a',13736859,'/website/storage/video',1,'flv','2015-12-16 03:37:22','2015-12-16 03:37:22'),(45,'610c5dce66c50a43aa147c009ed47ac1',6056035,'/website/storage/video',1,'mp4','2015-12-16 04:39:07','2015-12-16 04:39:07'),(46,'5d708a7c0929ec9794ead68cd4c83965',24834138,'/website/storage/video',1,'avi','2015-12-16 16:48:48','2015-12-16 16:48:48');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_messages`
--

DROP TABLE IF EXISTS `message_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message_messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `body` text COLLATE utf8_unicode_ci NOT NULL,
  `owner_name` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_messages`
--

LOCK TABLES `message_messages` WRITE;
/*!40000 ALTER TABLE `message_messages` DISABLE KEYS */;
INSERT INTO `message_messages` VALUES (1,'1111111111111111111111111111','yfh','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'22222222222222222222222','yfh','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'33333333333333333333333333333','yfh','0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,'444444444444444444444','yyy','0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,'555555555555555555555555555','yfh','0000-00-00 00:00:00','0000-00-00 00:00:00'),(6,'66666666666666666666666666','yfh','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `message_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `body` text COLLATE utf8_unicode_ci NOT NULL,
  `owner_name` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `create_date` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES ('2014_10_12_000000_create_users_table',1),('2014_10_12_100000_create_password_resets_table',1),('2015_10_12_143045_create_files_table',2),('2015_10_12_143105_create_catalogs_table',2),('2015_10_12_143141_create_posts_table',2),('2015_10_12_143157_create_messages_table',2),('2015_10_12_143210_create_message_messages_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `permission_name` char(255) NOT NULL,
  `chinese_name` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'peoplev1','用户'),(2,'peoplev2','管理员'),(3,'homePagev1','滑动展览'),(4,'homePagev2','热度TOP榜'),(5,'homePagev3','下载TOP榜'),(6,'homePagev4','管理员推荐'),(7,'suffix','后缀'),(8,'delete','删除'),(9,'recycle','回收站');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_group`
--

DROP TABLE IF EXISTS `permission_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_name` char(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_group`
--

LOCK TABLES `permission_group` WRITE;
/*!40000 ALTER TABLE `permission_group` DISABLE KEYS */;
INSERT INTO `permission_group` VALUES (3,'sb','0000-00-00 00:00:00'),(8,'dsb','0000-00-00 00:00:00'),(9,'xsb','0000-00-00 00:00:00'),(10,'abc','2016-01-02 20:39:38');
/*!40000 ALTER TABLE `permission_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_relationship`
--

DROP TABLE IF EXISTS `permission_relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission_relationship` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_name` char(255) NOT NULL,
  `permission_name` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_relationship`
--

LOCK TABLES `permission_relationship` WRITE;
/*!40000 ALTER TABLE `permission_relationship` DISABLE KEYS */;
INSERT INTO `permission_relationship` VALUES (7,'sb','peoplev1'),(28,'dsb','homePagev1'),(54,'xsb','delete'),(56,'sb','peoplev2'),(57,'sb','recycle'),(58,'xsb','suffix'),(59,'abc','recycle'),(60,'abc','peoplev1'),(61,'abc','homePagev1'),(62,'abc','homePagev2'),(63,'abc','homePagev3'),(64,'abc','homePagev4'),(65,'abc','suffix'),(66,'abc','delete');
/*!40000 ALTER TABLE `permission_relationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `body` text COLLATE utf8_unicode_ci NOT NULL,
  `owner_name` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `create_date` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sy`
--

DROP TABLE IF EXISTS `sy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sy` (
  `s1` char(255) NOT NULL,
  `s2` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sy`
--

LOCK TABLES `sy` WRITE;
/*!40000 ALTER TABLE `sy` DISABLE KEYS */;
INSERT INTO `sy` VALUES ('sy1','sy1'),('sy','sy'),('sy','sy'),('sy','sy');
/*!40000 ALTER TABLE `sy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type_name` varchar(20) NOT NULL,
  `group_name` char(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type_name` (`type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'txt','text'),(2,'doc','text'),(3,'pdf','text'),(4,'rtf','text'),(5,'bmp','picture'),(6,'gif','picture'),(7,'jpeg','picture'),(8,'tiff','picture'),(9,'psd','picture'),(10,'png','picture'),(11,'swf','picture'),(12,'svg','picture'),(13,'jpg','picture'),(14,'gig','picture'),(15,'mp3','music'),(16,'wav','music'),(17,'amr','music'),(18,'mid','music'),(19,'torrent','bt'),(20,'avi','video'),(21,'wma','video'),(22,'rmvb','video'),(23,'rm','vedio'),(24,'flash','video'),(26,'mp4','video'),(27,'3gp','video'),(28,'zip','archive'),(29,'rar','archive'),(30,'flv','video');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_group`
--

DROP TABLE IF EXISTS `type_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_group`
--

LOCK TABLES `type_group` WRITE;
/*!40000 ALTER TABLE `type_group` DISABLE KEYS */;
INSERT INTO `type_group` VALUES (1,'text'),(2,'picture'),(3,'music'),(4,'bt'),(5,'video'),(6,'archive'),(7,'other');
/*!40000 ALTER TABLE `type_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sex` char(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'male',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `admin` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `used_space` bigint(20) NOT NULL DEFAULT '0',
  `head_address` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `delete_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_name_unique` (`name`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'zcy','female','1024742580@qq.com','$2y$10$L..2cjOuLjpCJScDNDSjq.9jOqgSQBj410Z3dGM2iLiwQ2nF/Wg/y','sb','wOYtyYs9MQjmPcm7HyKv3ECrnmp8M54lHd3FFMhM43xQlHmEjI6IhmHcaO6o',85956285,'/website/head_picture/zcy.jpg','0000-00-00 00:00:00','2015-11-24 04:38:14','2015-12-31 01:42:39'),(25,'kj','male','892498546@qq.com','$2y$10$uBHgTjlolf.lbSPQD6pLb.PXpktCKBwUaD4BkPSBLpfCfpS/GrtMO','user',NULL,0,'/website/head_picture/kj.jpg','0000-00-00 00:00:00','2015-12-20 00:31:45','2015-12-20 00:31:45'),(30,'yfh','male','690828339@qq.com','$2y$10$H.vrHOzsCL8Gu3qkc5pbEuoJLbuxwyBJ4iqH/O8yIC/AYlrJG8sbW','abc','TJpyDGBAgIkqAmJYrFK4ljs2STtj88iDASPmNRotzeyF27geIgnwBF09dMh9',0,'/website/head_picture/yfh.jpg','0000-00-00 00:00:00','2016-05-17 22:46:45','2016-09-06 06:26:18'),(31,'yyffhh','male','18227687927@sina.cn','$2y$10$Z5rXuoa3W7R4M3dUg/oqzeVSwlxHeuKMF9hRBWuSduokbaW.MiJS.','user',NULL,0,'/website/head_picture/yyffhh.jpg','0000-00-00 00:00:00','2016-06-24 21:31:03','2016-06-24 21:31:03');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-06 22:28:52
