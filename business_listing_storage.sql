-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 05, 2024 at 02:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `business_listing_storage`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` varchar(36) NOT NULL,
  `phoneNumber` varchar(100) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `deviceId` varchar(100) DEFAULT NULL,
  `lastStatus` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'INACTIVE',
  `createdBy` varchar(255) DEFAULT NULL,
  `roles` enum('ADMIN','EMPLOYEE','VENDOR','STAFF','USER') NOT NULL DEFAULT 'USER',
  `type` enum('FACEBOOK','GOOGLE','EMAIL','PHONE','GUEST') NOT NULL DEFAULT 'PHONE',
  `status` enum('ACTIVE','DEACTIVE','DELETED','SUSPENDED','PENDING') NOT NULL DEFAULT 'ACTIVE',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `phoneNumber`, `password`, `deviceId`, `lastStatus`, `createdBy`, `roles`, `type`, `status`, `createdAt`, `updatedAt`) VALUES
('121e0e93-a443-45e1-9637-625455f5a797', 'admin', '$2b$13$RbVPz7zNJgyA8j.DzgzPdeN28o4BvjB1Ki0a/AcfpiehkOHNUtotS', NULL, 'INACTIVE', NULL, 'ADMIN', 'PHONE', 'ACTIVE', '2024-06-24 15:22:05.572880', '2024-06-24 15:22:05.572880'),
('727e9317-43e2-4e7f-9348-b6cd2f192bfa', '7439088784', NULL, NULL, 'INACTIVE', NULL, 'VENDOR', 'PHONE', 'ACTIVE', '2024-06-26 12:23:20.142642', '2024-06-26 12:23:20.142642'),
('764795de-2a9b-4447-92a9-fd884e511341', '7797707517', NULL, NULL, 'INACTIVE', NULL, 'USER', 'PHONE', 'ACTIVE', '2024-07-04 17:21:44.669771', '2024-07-04 17:21:44.669771'),
('7e14049f-2b72-45a8-b27b-28f4994cbc72', '8017382083', NULL, NULL, 'INACTIVE', NULL, 'USER', 'PHONE', 'ACTIVE', '2024-06-27 12:40:03.815062', '2024-06-27 12:40:03.815062'),
('895d0cdc-de65-4f04-8cbb-d3ee68407705', '8092326469', NULL, NULL, 'INACTIVE', NULL, 'VENDOR', 'PHONE', 'ACTIVE', '2024-07-04 15:11:48.680384', '2024-07-04 15:11:48.680384');

-- --------------------------------------------------------

--
-- Table structure for table `area`
--

CREATE TABLE `area` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `pincode` varchar(50) DEFAULT NULL,
  `cityId` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `area`
--

INSERT INTO `area` (`id`, `name`, `pincode`, `cityId`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'JADAVAPUR POLICE STATION', '700034', 1, 1, '2024-06-25 13:14:39.556488', '2024-06-25 13:25:20.000000'),
(2, 'JADAVAPUR 8b', '700032', 1, 1, '2024-06-25 13:15:38.566442', '2024-06-25 13:25:18.000000'),
(3, 'DHAKURIA', '700031', 1, 1, '2024-06-25 13:16:20.297697', '2024-06-25 13:24:52.000000');

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` varchar(36) NOT NULL,
  `categoryId` varchar(255) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `imagePath` text DEFAULT NULL,
  `status` enum('ACTIVE','DEACTIVE','DELETED','SUSPENDED','PENDING') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `categoryId`, `image`, `imagePath`, `status`, `createdAt`, `updatedAt`) VALUES
('36e62572-94d0-4971-883e-cd4cae3c942d', NULL, 'http://localhost:5892/uploads\\Banners\\c10c27ac31010dd976e95b3636a1076f093.jpg', 'uploads\\Banners\\c10c27ac31010dd976e95b3636a1076f093.jpg', 'ACTIVE', '2024-06-25 11:58:17.199117', '2024-06-25 12:04:00.397441'),
('4b98d9a5-490d-4091-af94-8103971493ce', 'cd4b2fa8-3c0d-4e50-904d-b16a5e13df1f', 'http://localhost:5892/uploads\\Banners\\f618997a1be52acbd51887397eed9cdc.jpg', 'uploads\\Banners\\f618997a1be52acbd51887397eed9cdc.jpg', 'ACTIVE', '2024-07-02 18:12:18.110349', '2024-07-02 18:12:59.373358'),
('64da016b-3d5e-46e0-beec-1f3e37bafa36', 'ff034b6e-94ac-4fbf-aaa3-fcac793a5fbd', 'http://localhost:5892/uploads\\Banners\\368f6c09bcf64f2218a84a1455fc5262.jpg', 'uploads\\Banners\\368f6c09bcf64f2218a84a1455fc5262.jpg', 'ACTIVE', '2024-07-02 18:11:29.778054', '2024-07-02 18:13:02.637565'),
('aa424bf3-e458-4fee-9257-7c9208c3e116', NULL, 'http://localhost:5892/uploads\\Banners\\893103cecdeae162b8cb5fa327691fbe4.jpg', 'uploads\\Banners\\893103cecdeae162b8cb5fa327691fbe4.jpg', 'ACTIVE', '2024-06-25 12:05:51.641611', '2024-07-02 18:01:16.777984'),
('b91d420a-1a70-4449-9e35-58f03df96485', NULL, 'http://localhost:5892/uploads\\Banners\\89807c5ffc570a724ff324af64c52a310.jpg', 'uploads\\Banners\\89807c5ffc570a724ff324af64c52a310.jpg', 'ACTIVE', '2024-07-02 18:03:39.545818', '2024-07-02 18:03:49.933234'),
('dd5880fe-5cd3-40d1-8587-492d1d6da46e', NULL, 'http://localhost:5892/uploads\\Banners\\a275891d59188c1d10e180c9e1d6f10734.jpg', 'uploads\\Banners\\a275891d59188c1d10e180c9e1d6f10734.jpg', 'ACTIVE', '2024-06-25 11:58:48.470841', '2024-07-02 18:01:20.159148');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` varchar(36) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `author` varchar(55) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `image` text DEFAULT NULL,
  `imagePath` text DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `status` enum('ACTIVE','DEACTIVE','DELETED','SUSPENDED','PENDING') NOT NULL DEFAULT 'PENDING',
  `accountId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `author`, `desc`, `date`, `image`, `imagePath`, `createdAt`, `updatedAt`, `status`, `accountId`) VALUES
('0e6c4484-9b6e-429c-878e-68dfaddf7594', 'Business Listing Blog 2', 'WASS', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, risus id tincidunt volutpat, ligula orci sodales dui, ut mattis erat felis in justo. Cras nec laoreet augue, molestie eleifend sapien. Vivamus ullamcorper nisi ante, non euismod leo porta eget. Aliquam eget imperdiet enim, vitae tempor elit. Duis dictum turpis sed condimentum auctor.', '2024-06-24', 'http://localhost:5892/uploadscompanyDetaillogsa4bb49910910a683785f750288918010f4d.jpg', 'uploadscompanyDetaillogsa4bb49910910a683785f750288918010f4d.jpg', '2024-06-24 15:40:42.559156', '2024-06-24 16:08:29.841262', 'ACTIVE', '121e0e93-a443-45e1-9637-625455f5a797'),
('2937bc06-9126-4574-96a6-5edb0b2a1e8b', 'Business Listing Blog', 'WASS', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, risus id tincidunt volutpat, ligula orci sodales dui, ut mattis erat felis in justo. Cras nec laoreet augue, molestie eleifend sapien. Vivamus ullamcorper nisi ante, non euismod leo porta eget. Aliquam eget imperdiet enim, vitae tempor elit. Duis dictum turpis sed condimentum auctor.', '2024-06-24', 'http://localhost:5892/uploadscompanyDetaillogsa4bb49910910a683785f750288918010f4d.jpg', 'uploadscompanyDetaillogsa4bb49910910a683785f750288918010f4d.jpg', '2024-06-24 15:40:30.417587', '2024-06-24 16:07:51.986955', 'ACTIVE', '121e0e93-a443-45e1-9637-625455f5a797'),
('507583de-6706-42c7-b4e9-17f5672f3c16', 'Business Listing Blog 5', 'WASS', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, risus id tincidunt volutpat, ligula orci sodales dui, ut mattis erat felis in justo. Cras nec laoreet augue, molestie eleifend sapien. Vivamus ullamcorper nisi ante, non euismod leo porta eget. Aliquam eget imperdiet enim, vitae tempor elit. Duis dictum turpis sed condimentum auctor.', '2024-06-24', 'http://localhost:5892/uploadscompanyDetaillogsa4bb49910910a683785f750288918010f4d.jpg', 'uploadscompanyDetaillogsa4bb49910910a683785f750288918010f4d.jpg', '2024-06-24 15:40:48.827777', '2024-06-24 16:07:28.858779', 'ACTIVE', '121e0e93-a443-45e1-9637-625455f5a797'),
('66499844-4ae6-4639-89ac-e36f846a689d', 'Business Listing Blog 4', 'WASS', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, risus id tincidunt volutpat, ligula orci sodales dui, ut mattis erat felis in justo. Cras nec laoreet augue, molestie eleifend sapien. Vivamus ullamcorper nisi ante, non euismod leo porta eget. Aliquam eget imperdiet enim, vitae tempor elit. Duis dictum turpis sed condimentum auctor.', '2024-06-24', 'http://localhost:5892/uploadscompanyDetaillogsa4bb49910910a683785f750288918010f4d.jpg', 'uploadscompanyDetaillogsa4bb49910910a683785f750288918010f4d.jpg', '2024-06-24 15:40:46.899422', '2024-06-24 16:07:55.609331', 'ACTIVE', '121e0e93-a443-45e1-9637-625455f5a797'),
('a217adaa-58e7-4208-bd4a-a90269c94c33', 'Business Listing Blog 3', 'WASS', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, risus id tincidunt volutpat, ligula orci sodales dui, ut mattis erat felis in justo. Cras nec laoreet augue, molestie eleifend sapien. Vivamus ullamcorper nisi ante, non euismod leo porta eget. Aliquam eget imperdiet enim, vitae tempor elit. Duis dictum turpis sed condimentum auctor.', '2024-06-24', 'http://localhost:5892/uploadscompanyDetaillogsa4bb49910910a683785f750288918010f4d.jpg', 'uploadscompanyDetaillogsa4bb49910910a683785f750288918010f4d.jpg', '2024-06-24 15:40:44.870973', '2024-06-24 16:08:52.160570', 'ACTIVE', '121e0e93-a443-45e1-9637-625455f5a797'),
('cde06e18-db97-45b6-8ac9-6ff2d3bc8da9', 'Business Listing Blog 1', 'WASS', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, risus id tincidunt volutpat, ligula orci sodales dui, ut mattis erat felis in justo. Cras nec laoreet augue, molestie eleifend sapien. Vivamus ullamcorper nisi ante, non euismod leo porta eget. Aliquam eget imperdiet enim, vitae tempor elit. Duis dictum turpis sed condimentum auctor.', '2024-06-24', 'http://localhost:5892/uploadscompanyDetaillogsa4bb49910910a683785f750288918010f4d.jpg', 'uploadscompanyDetaillogsa4bb49910910a683785f750288918010f4d.jpg', '2024-06-24 15:40:39.714605', '2024-06-24 16:08:55.002693', 'ACTIVE', '121e0e93-a443-45e1-9637-625455f5a797');

-- --------------------------------------------------------

--
-- Table structure for table `call_history`
--

CREATE TABLE `call_history` (
  `id` varchar(36) NOT NULL,
  `accountId` varchar(255) DEFAULT NULL,
  `companyDetailId` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `role` enum('ADMIN','EMPLOYEE','VENDOR','STAFF','USER') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `call_history`
--

INSERT INTO `call_history` (`id`, `accountId`, `companyDetailId`, `createdAt`, `updatedAt`, `role`) VALUES
('06954b88-8514-4966-b963-6c73909e3796', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:54.196213', '2024-07-04 18:48:54.196213', 'USER'),
('0e5b52e8-12f9-4c01-a6ab-da9c6f2de99d', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:47:57.135691', '2024-07-04 18:47:57.135691', 'USER'),
('0f565afd-4720-4f11-b271-26bd51d8eb80', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-01 11:15:07.280726', '2024-07-01 11:15:07.280726', 'VENDOR'),
('0fef5d10-43cd-4592-8c0e-557fd7eaedd5', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:40:26.081820', '2024-07-04 12:40:26.081820', 'USER'),
('198cf063-ab0f-407e-8605-b7f517241da7', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:39.194966', '2024-07-04 18:48:39.194966', 'USER'),
('1a4b2ea1-b97e-471b-bb4d-68a9a4648163', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:47.867581', '2024-07-04 18:48:47.867581', 'USER'),
('1acac8ef-2628-4be4-8f72-23d89dac01bd', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:58:27.378720', '2024-07-04 18:58:27.378720', 'VENDOR'),
('1fd7ad78-6641-41c8-9e50-7c1e2b7bd05d', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:47:45.430196', '2024-07-04 18:47:45.430196', 'USER'),
('21e60646-90db-481b-928c-891ddcc7a06c', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:40:44.824926', '2024-07-04 12:40:44.824926', 'USER'),
('236b2550-922e-4829-b7ef-d101197a0e6c', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:42:06.769306', '2024-07-04 12:42:06.769306', 'USER'),
('28d68444-e9ac-454d-a8bd-6a8c9425281a', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:42:10.121806', '2024-07-04 12:42:10.121806', 'USER'),
('292ddb6e-5e9b-432a-b3d7-d718d909c81e', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:40:52.601363', '2024-07-04 12:40:52.601363', 'USER'),
('2cbd4d09-5fb8-42ef-8593-ff6b98f15c63', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:23.169482', '2024-07-04 18:48:23.169482', 'USER'),
('2f4c5543-e30f-4cd0-9af4-0f50a402df31', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:42:00.795933', '2024-07-04 12:42:00.795933', 'USER'),
('2f6e618f-2b52-4e2b-836f-60c803bfcf28', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:34.125261', '2024-07-04 18:48:34.125261', 'USER'),
('30e91ee7-2b6e-4998-aaaa-46dd1e629ed9', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:36.190557', '2024-07-04 18:48:36.190557', 'USER'),
('3ce504fe-4b43-4a05-a497-4ab0313dd44f', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:40:50.330743', '2024-07-04 12:40:50.330743', 'USER'),
('45b7bcb1-c5cc-4a4a-9151-1c902a81643f', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:25.640762', '2024-07-04 18:48:25.640762', 'USER'),
('4753cc30-ca68-4575-95b9-5481c2373bee', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:03.106023', '2024-07-04 18:48:03.106023', 'USER'),
('53579cd1-c63e-4e38-ae55-f70aa02b682a', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:08.186280', '2024-07-04 18:48:08.186280', 'USER'),
('569389cb-0176-4ba6-bfa8-f3cae9585606', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:42:14.591784', '2024-07-04 12:42:14.591784', 'USER'),
('57fbdc13-3bc2-4087-9965-b5acdf1dc3d1', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:42:02.393756', '2024-07-04 12:42:02.393756', 'USER'),
('585e2ac0-1d50-49f6-8bbe-3f8b2db0d90b', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:05.708441', '2024-07-04 18:48:05.708441', 'USER'),
('58f8aa50-60a4-4296-b20e-850585feec29', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:44.388577', '2024-07-04 18:48:44.388577', 'USER'),
('59617823-d431-45e9-8344-844ccea55c0b', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:42:08.231941', '2024-07-04 12:42:08.231941', 'USER'),
('59ab5a45-4b5d-445c-9b69-7812c554b1b8', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:41:59.066308', '2024-07-04 12:41:59.066308', 'USER'),
('59e0de7c-dd0a-4c06-85ac-78257d995146', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:58:47.276530', '2024-07-04 18:58:47.276530', 'VENDOR'),
('5a64d72e-8815-49e0-9efb-7e9c5e14d2b5', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:27.989998', '2024-07-04 18:48:27.989998', 'USER'),
('5c809805-6414-498f-a768-6b0bf25ea539', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:10.685151', '2024-07-04 18:48:10.685151', 'USER'),
('622aadf3-8856-4dd8-a757-96fe79bf761b', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:42:17.107271', '2024-07-04 12:42:17.107271', 'USER'),
('6787972c-add9-4630-bd8e-f56977167210', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:40:46.791703', '2024-07-04 12:40:46.791703', 'USER'),
('6938baca-331d-43bf-91f5-4aecf013c92b', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:40:58.754479', '2024-07-04 12:40:58.754479', 'USER'),
('6f9a2966-6cf9-4665-a3dd-c61d64149e36', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:42:05.090127', '2024-07-04 12:42:05.090127', 'USER'),
('73acd9bd-9995-41df-a9d2-7a777748359b', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:15.325905', '2024-07-04 18:48:15.325905', 'USER'),
('76da1738-9ff1-4972-97cf-92ba10450f97', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:00.009683', '2024-07-04 18:48:00.009683', 'USER'),
('7ae9f051-a1d2-411c-af7a-4b4196244670', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:41:02.926926', '2024-07-04 12:41:02.926926', 'USER'),
('800fe129-1c78-4472-b721-398d1d6d0d04', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:40:56.461000', '2024-07-04 12:40:56.461000', 'USER'),
('88bca862-4e86-4acf-82d5-fe25a2cebd26', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:41:06.902692', '2024-07-04 12:41:06.902692', 'USER'),
('8e98ab84-7aac-4b75-88ce-a9d8e7d1dba7', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-06-27 18:46:56.233865', '2024-07-01 10:37:47.338510', 'USER'),
('9b236435-7214-4836-9ca9-03dfce13f97a', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:41:00.963714', '2024-07-04 12:41:00.963714', 'USER'),
('a1418bd2-5173-49a0-8c7d-e9af378a3b14', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:20.166932', '2024-07-04 18:48:20.166932', 'USER'),
('b7e51ed1-f0d3-4e10-955e-b4ff7065f7a6', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:12.952403', '2024-07-04 18:48:12.952403', 'USER'),
('c27885f2-62f1-419a-9905-c060c08289a9', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:31.827466', '2024-07-04 18:48:31.827466', 'USER'),
('c6c37981-4d67-4153-bded-4ae2e114f6d3', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:42:03.687487', '2024-07-04 12:42:03.687487', 'USER'),
('d35ad29b-121b-4bac-b986-d9b10d8379df', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-06-27 18:46:23.281219', '2024-07-01 10:37:51.395515', 'USER'),
('d8ea86b4-3d4b-426c-ac3e-bf44edfaa5ba', '764795de-2a9b-4447-92a9-fd884e511341', 'f21dfe15-7587-4374-92c6-54f2a63579ad', '2024-07-04 18:48:41.760924', '2024-07-04 18:48:41.760924', 'USER'),
('e18f78cb-d9e2-4330-8984-b833cfc561fb', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-07-04 12:40:54.612469', '2024-07-04 12:40:54.612469', 'USER'),
('f95f3e31-b7aa-4f00-88bf-c0bf0198de84', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'fe421672-f86f-4da9-8def-e7052566801e', '2024-06-27 18:46:39.016155', '2024-07-01 10:37:55.442348', 'USER');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `imageName` text DEFAULT NULL,
  `status` enum('ACTIVE','DEACTIVE','DELETED','SUSPENDED','PENDING') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `type` enum('NORMAL','NEW','TRENDING') NOT NULL DEFAULT 'NEW'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `image`, `imageName`, `status`, `createdAt`, `updatedAt`, `type`) VALUES
('3adaa8b1-7e78-4f6d-a5f8-16c68f425a0c', 'Hospital', NULL, NULL, 'ACTIVE', '2024-06-24 17:53:02.774278', '2024-07-02 12:16:43.455151', 'NORMAL'),
('74bd18fc-3c22-4723-9dae-291cb10dffba', 'Tailors', 'http://localhost:5892/uploads\\companyDetail\\category\\79710c5fcd5c9e11a88f2e4b410a65b477.jpg', 'uploads\\companyDetail\\category\\79710c5fcd5c9e11a88f2e4b410a65b477.jpg', 'ACTIVE', '2024-06-24 17:55:08.872739', '2024-06-27 17:18:10.516641', 'NORMAL'),
('846285f0-79c5-4ad2-bb3d-054b35cd5cbc', 'AC Service', NULL, NULL, 'ACTIVE', '2024-06-24 17:53:26.495379', '2024-06-27 17:18:15.855178', 'NORMAL'),
('c1dedc4d-10bc-44e0-8ad0-518aea12baee', 'Tours & Travels', NULL, NULL, 'ACTIVE', '2024-06-24 17:55:00.353236', '2024-06-27 17:18:20.105549', 'NORMAL'),
('c3b1e46a-81af-460e-9f53-64d1fa83972f', 'Teacher', NULL, NULL, 'ACTIVE', '2024-06-24 17:54:47.194390', '2024-06-25 11:39:09.194072', 'NEW'),
('c62906d8-52d2-43b3-882e-856f93e01641', 'Painter', NULL, NULL, 'ACTIVE', '2024-06-24 17:53:09.212446', '2024-06-27 17:18:25.049651', 'TRENDING'),
('cd4b2fa8-3c0d-4e50-904d-b16a5e13df1f', 'Salon', NULL, NULL, 'ACTIVE', '2024-06-24 17:54:35.309490', '2024-06-25 11:39:22.325699', 'NEW'),
('d2d30828-664b-41eb-b736-98af588206b6', 'Doctor', NULL, NULL, 'ACTIVE', '2024-06-24 17:53:12.643085', '2024-07-02 12:16:38.596657', 'TRENDING'),
('ff034b6e-94ac-4fbf-aaa3-fcac793a5fbd', 'Phone Store', NULL, NULL, 'ACTIVE', '2024-06-24 17:52:40.308032', '2024-06-25 11:39:33.643454', 'NEW');

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `stateId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `name`, `status`, `stateId`) VALUES
(1, 'KOLKATA', 1, 21),
(2, 'HOWRAH', 1, 21),
(3, 'SILIGURI', 1, 21);

-- --------------------------------------------------------

--
-- Table structure for table `company_category`
--

CREATE TABLE `company_category` (
  `id` varchar(36) NOT NULL,
  `accountId` varchar(255) DEFAULT NULL,
  `categoryId` varchar(255) DEFAULT NULL,
  `offer` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `isOffer` enum('All','Yes','No') NOT NULL DEFAULT 'No'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_category`
--

INSERT INTO `company_category` (`id`, `accountId`, `categoryId`, `offer`, `createdAt`, `updatedAt`, `isOffer`) VALUES
('08707a04-85a7-4c6f-92d9-a8c8461ba204', '895d0cdc-de65-4f04-8cbb-d3ee68407705', 'd2d30828-664b-41eb-b736-98af588206b6', 50, '2024-07-04 15:22:20.978008', '2024-07-04 15:22:57.149955', 'Yes'),
('fe5846cb-f7cc-4676-a92e-9e73b8a9359e', '727e9317-43e2-4e7f-9348-b6cd2f192bfa', '846285f0-79c5-4ad2-bb3d-054b35cd5cbc', 20, '2024-06-26 16:12:10.626923', '2024-07-01 15:56:28.000000', 'Yes');

-- --------------------------------------------------------

--
-- Table structure for table `company_detail`
--

CREATE TABLE `company_detail` (
  `id` varchar(36) NOT NULL,
  `name` varchar(55) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `businessName` varchar(55) DEFAULT NULL,
  `businessDesc` varchar(500) DEFAULT NULL,
  `address1` varchar(500) DEFAULT NULL,
  `address2` varchar(500) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `pincode` varchar(50) DEFAULT NULL,
  `profile` text DEFAULT NULL,
  `profileName` text DEFAULT NULL,
  `status` enum('PENDING','APPROVED','SUSPENDED') NOT NULL DEFAULT 'PENDING',
  `accountId` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `fbLink` varchar(255) DEFAULT NULL,
  `wpLink` varchar(255) DEFAULT NULL,
  `instaLink` varchar(255) DEFAULT NULL,
  `callNumber` varchar(100) DEFAULT NULL,
  `profileId` int(11) DEFAULT NULL,
  `minPrice` varchar(100) DEFAULT NULL,
  `maxPrice` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_detail`
--

INSERT INTO `company_detail` (`id`, `name`, `email`, `businessName`, `businessDesc`, `address1`, `address2`, `state`, `city`, `area`, `pincode`, `profile`, `profileName`, `status`, `accountId`, `createdAt`, `updatedAt`, `fbLink`, `wpLink`, `instaLink`, `callNumber`, `profileId`, `minPrice`, `maxPrice`) VALUES
('f21dfe15-7587-4374-92c6-54f2a63579ad', 'Abhijeet Das', 'abhijeet@gmail.com', 'Doctor', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus convallis elementum urna, tristique eleifend elit dapibus ac. Nunc non efficitur lectus, nec tristique lorem. Integer at ex vitae quam mollis mattis vitae sed purus. Ut libero auguam metus mauris, ultricies quis risus nontur at eros eget orci aliquam fringilla.', 'JODHPUR PARK 1', 'JODHPUR PARK 2', 'WEST BENGAL', 'KOLKATA', 'JODHPUR PARK', '700034', 'http://localhost:5892/uploads\\companyDetail\\profile\\d50ceb908c9409527c4fb7cb1b6f0af8.jpg', 'uploads\\companyDetail\\profile\\d50ceb908c9409527c4fb7cb1b6f0af8.jpg', 'APPROVED', '895d0cdc-de65-4f04-8cbb-d3ee68407705', '2024-07-04 15:11:48.725018', '2024-07-04 15:39:04.668434', 'https://www.facebook.com/', 'https://www.facebook.com/', 'https://www.facebook.com/', '8092326469', 2147483647, '1000', '5000'),
('fe421672-f86f-4da9-8def-e7052566801e', 'Shayandip Chitrakar', 'demo@gmail.com', 'Phone Store', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus convallis elementum urna, tristique eleifend elit dapibus ac. Nunc non efficitur lectus, nec tristique lorem. Integer at ex vitae quam mollis mattis vitae sed purus. Ut libero auguam metus mauris, ultricies quis risus nontur at eros eget orci aliquam fringilla.', 'south city', 'south city 2', 'WEST BENGAL', 'KOLKATA', 'SOUTH CITY', '700034', 'http://localhost:5892/uploads\\companyDetail\\profile\\89561afa588b5c1a10338ea172c872ac6.png', 'uploads\\companyDetail\\profile\\89561afa588b5c1a10338ea172c872ac6.png', 'APPROVED', '727e9317-43e2-4e7f-9348-b6cd2f192bfa', '2024-06-26 12:23:20.165479', '2024-06-27 15:24:43.944950', 'https://www.facebook.com/', 'https://www.facebook.com/', 'https://www.facebook.com/', '9988776655', 2147483647, '0', '10000');

-- --------------------------------------------------------

--
-- Table structure for table `company_image`
--

CREATE TABLE `company_image` (
  `id` varchar(36) NOT NULL,
  `file` text DEFAULT NULL,
  `fileName` text DEFAULT NULL,
  `accountId` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_image`
--

INSERT INTO `company_image` (`id`, `file`, `fileName`, `accountId`, `createdAt`, `updatedAt`) VALUES
('098705b7-97fd-43a0-bfcb-abce4b97a89b', 'http://localhost:5892/uploads\\companydetail\\images\\106bcbf092639c38c7d78abec3e1da652.jpg', 'uploads\\companydetail\\images\\106bcbf092639c38c7d78abec3e1da652.jpg', '895d0cdc-de65-4f04-8cbb-d3ee68407705', '2024-07-04 15:32:46.070134', '2024-07-04 15:32:46.070134'),
('3e15c7c9-6195-45ad-8946-326202c6f3ee', 'http://localhost:5892/uploads\\companydetail\\images\\7b2e48d281874ca242e19a7e2ed93437.jpg', 'uploads\\companydetail\\images\\7b2e48d281874ca242e19a7e2ed93437.jpg', '727e9317-43e2-4e7f-9348-b6cd2f192bfa', '2024-06-26 13:28:59.987476', '2024-06-26 13:28:59.987476'),
('9c7eb7ae-85d0-48ba-bebe-83192d8bffb5', 'http://localhost:5892/uploads\\companydetail\\images\\5010a7265ee53c27f4392c3db5b93358c.jpg', 'uploads\\companydetail\\images\\5010a7265ee53c27f4392c3db5b93358c.jpg', '727e9317-43e2-4e7f-9348-b6cd2f192bfa', '2024-06-26 18:00:23.592995', '2024-06-26 18:00:23.592995'),
('ae2d0e67-98b0-441d-b645-6199c391a902', 'http://localhost:5892/uploads\\companydetail\\images\\a6e7b5cf5972c5685a53c41af4206851.png', 'uploads\\companydetail\\images\\a6e7b5cf5972c5685a53c41af4206851.png', '895d0cdc-de65-4f04-8cbb-d3ee68407705', '2024-07-04 15:32:46.073436', '2024-07-04 15:32:46.073436'),
('ca84c2ca-dbb7-4b45-bb4a-39847ed67aa5', 'http://localhost:5892/uploads\\companydetail\\images\\cbcac5b29f107d45959dfd10ff1b1531073.jpg', 'uploads\\companydetail\\images\\cbcac5b29f107d45959dfd10ff1b1531073.jpg', '895d0cdc-de65-4f04-8cbb-d3ee68407705', '2024-07-04 15:32:46.075325', '2024-07-04 15:32:46.075325'),
('f6e76ffd-6d15-45f3-afb7-e8c4c4a0f4b4', 'http://localhost:5892/uploads\\companydetail\\images\\8929cb387273c773f6fe8a6b52e331c9.jpg', 'uploads\\companydetail\\images\\8929cb387273c773f6fe8a6b52e331c9.jpg', '727e9317-43e2-4e7f-9348-b6cd2f192bfa', '2024-06-26 18:00:23.599893', '2024-06-26 18:00:23.599893');

-- --------------------------------------------------------

--
-- Table structure for table `company_keyword`
--

CREATE TABLE `company_keyword` (
  `id` varchar(36) NOT NULL,
  `keyword` varchar(100) DEFAULT NULL,
  `accountId` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_keyword`
--

INSERT INTO `company_keyword` (`id`, `keyword`, `accountId`, `createdAt`, `updatedAt`) VALUES
('146a3084-2d67-4bc9-b33c-7bbfdbadeb5e', 'doctor good', '895d0cdc-de65-4f04-8cbb-d3ee68407705', '2024-07-04 15:36:33.517984', '2024-07-04 15:36:33.517984'),
('1f90be24-1dcb-4571-b3e6-c8f36f1e5ed6', 'doctor emergency', '895d0cdc-de65-4f04-8cbb-d3ee68407705', '2024-07-04 15:36:33.496898', '2024-07-04 15:36:33.496898'),
('6f877e01-8128-4f20-a977-bfaae9f2e86d', 'mobile', '727e9317-43e2-4e7f-9348-b6cd2f192bfa', '2024-06-26 15:08:59.024634', '2024-06-26 15:08:59.024634'),
('b3e401d5-75eb-49c7-b1f3-9b0a4cfd5f56', 'mobile repair', '727e9317-43e2-4e7f-9348-b6cd2f192bfa', '2024-06-26 15:08:58.988512', '2024-07-01 14:26:11.982486'),
('f4a096f1-218b-402d-939d-07ea0b68839a', 'doctor', '895d0cdc-de65-4f04-8cbb-d3ee68407705', '2024-07-04 15:36:33.493296', '2024-07-04 15:36:33.493296'),
('fd4bfb77-fd7d-45e2-8c92-d3437d7a9696', 'mobile sale', '727e9317-43e2-4e7f-9348-b6cd2f192bfa', '2024-06-26 15:33:13.029852', '2024-07-01 14:26:27.428841');

-- --------------------------------------------------------

--
-- Table structure for table `company_schedule`
--

CREATE TABLE `company_schedule` (
  `id` varchar(36) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `name` enum('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') NOT NULL DEFAULT 'Monday',
  `time_start` time DEFAULT NULL,
  `time_end` time DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `companyDetailId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_schedule`
--

INSERT INTO `company_schedule` (`id`, `createdAt`, `updatedAt`, `name`, `time_start`, `time_end`, `status`, `companyDetailId`) VALUES
('16f94d2e-aa1b-4157-8e04-880a14fb8a8a', '2024-06-26 12:23:20.200753', '2024-06-27 16:12:38.042374', 'Thursday', '10:00:00', '19:00:00', 1, 'fe421672-f86f-4da9-8def-e7052566801e'),
('1c83c2b2-59a9-44e0-8712-6e8ae8240e83', '2024-07-04 15:11:48.758598', '2024-07-04 16:15:22.000000', 'Wednesday', '05:00:00', '10:30:00', 1, 'f21dfe15-7587-4374-92c6-54f2a63579ad'),
('4325bcb8-47ed-4106-a92e-a2c5679e9d1f', '2024-06-26 12:23:20.188229', '2024-06-27 16:09:11.809240', 'Monday', '10:00:00', '19:00:00', 1, 'fe421672-f86f-4da9-8def-e7052566801e'),
('4cdc50e1-051b-409a-974e-51f921ed7e11', '2024-07-04 15:11:48.761457', '2024-07-04 15:11:48.761457', 'Saturday', '00:00:00', '00:00:00', 0, 'f21dfe15-7587-4374-92c6-54f2a63579ad'),
('701c48fb-e403-4433-b9c6-3c267ce2f266', '2024-06-26 12:23:20.198930', '2024-06-27 16:12:33.913697', 'Tuesday', '10:00:00', '19:00:00', 1, 'fe421672-f86f-4da9-8def-e7052566801e'),
('72c55ccc-4a66-4a07-a057-e704948c7cf4', '2024-07-04 15:11:48.760517', '2024-07-04 15:11:48.760517', 'Friday', '00:00:00', '00:00:00', 0, 'f21dfe15-7587-4374-92c6-54f2a63579ad'),
('8064d529-845f-4428-aa9d-526bf76f54ec', '2024-06-26 12:23:20.203164', '2024-06-27 16:12:42.917121', 'Friday', '10:00:00', '19:00:00', 1, 'fe421672-f86f-4da9-8def-e7052566801e'),
('bc159ea6-dfd6-447d-99f8-fdfa733e06bf', '2024-07-04 15:11:48.762673', '2024-07-04 15:11:48.762673', 'Sunday', '00:00:00', '00:00:00', 0, 'f21dfe15-7587-4374-92c6-54f2a63579ad'),
('ca54aa35-daba-4075-afae-6f27cdb52e5b', '2024-07-04 15:11:48.748612', '2024-07-04 16:15:42.000000', 'Monday', '05:00:00', '10:30:00', 1, 'f21dfe15-7587-4374-92c6-54f2a63579ad'),
('cd65c9fe-059b-489e-a967-0a10dbaea996', '2024-06-26 12:23:20.206015', '2024-06-27 16:12:22.220791', 'Wednesday', '10:00:00', '19:00:00', 0, 'fe421672-f86f-4da9-8def-e7052566801e'),
('d656a5c2-2c07-42f0-bf90-3009ce370075', '2024-07-04 15:11:48.756177', '2024-07-04 15:11:48.756177', 'Tuesday', '00:00:00', '00:00:00', 0, 'f21dfe15-7587-4374-92c6-54f2a63579ad'),
('d768b500-9247-46d4-a086-d330e53bc25d', '2024-06-26 12:23:20.204540', '2024-06-27 16:12:15.823030', 'Sunday', '10:00:00', '19:00:00', 0, 'fe421672-f86f-4da9-8def-e7052566801e'),
('e822268f-df27-476b-a4ec-0e2d043ae92b', '2024-06-26 12:23:20.203919', '2024-06-27 16:12:29.976987', 'Saturday', '10:00:00', '19:00:00', 0, 'fe421672-f86f-4da9-8def-e7052566801e'),
('fb53d62b-6ce3-4aa0-b9f6-b50de7be3106', '2024-07-04 15:11:48.759478', '2024-07-04 15:11:48.759478', 'Thursday', '00:00:00', '00:00:00', 0, 'f21dfe15-7587-4374-92c6-54f2a63579ad');

-- --------------------------------------------------------

--
-- Table structure for table `company_sub_category`
--

CREATE TABLE `company_sub_category` (
  `id` varchar(36) NOT NULL,
  `accountId` varchar(255) DEFAULT NULL,
  `subCategoryId` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_sub_category`
--

INSERT INTO `company_sub_category` (`id`, `accountId`, `subCategoryId`, `createdAt`, `updatedAt`) VALUES
('0f2db8c0-7150-414d-9dce-370f8023c0aa', '727e9317-43e2-4e7f-9348-b6cd2f192bfa', '73d33839-2d03-4826-b50d-f3f9144a087f', '2024-06-26 17:03:03.841959', '2024-06-26 17:03:03.841959'),
('69ff0255-63e9-4591-a467-5d1ccdadc0a6', '895d0cdc-de65-4f04-8cbb-d3ee68407705', 'dc7a28a9-00c9-49e6-a286-0d7d56120c45', '2024-07-04 15:28:57.419205', '2024-07-04 15:28:57.419205'),
('719db3e5-9573-4682-bc66-b8bc116f031e', '895d0cdc-de65-4f04-8cbb-d3ee68407705', 'dc7a28a9-00c9-49e6-a286-0d7d56120c11', '2024-07-04 15:28:57.412923', '2024-07-04 15:28:57.412923'),
('a40f6308-390d-414d-a523-1bf8f8bab36d', '727e9317-43e2-4e7f-9348-b6cd2f192bfa', 'dc7a28a9-00c9-49e6-a286-0d7d56120c07', '2024-06-26 16:52:37.512559', '2024-06-26 16:52:37.512559');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` varchar(36) NOT NULL,
  `name` text DEFAULT NULL,
  `phoneNumber` text DEFAULT NULL,
  `query` text DEFAULT NULL,
  `message` text DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `email_subscriber`
--

CREATE TABLE `email_subscriber` (
  `id` varchar(36) NOT NULL,
  `email` text DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` varchar(36) NOT NULL,
  `question` varchar(150) NOT NULL,
  `answer` text DEFAULT NULL,
  `status` enum('ACTIVE','DEACTIVE','DELETED','SUSPENDED','PENDING') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `accountId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `question`, `answer`, `status`, `createdAt`, `updatedAt`, `accountId`) VALUES
('03b32e8f-9e5b-4de8-a782-2846d7bcd654', 'DEMO QUESTION', 'DEMO ANSWER', 'ACTIVE', '2024-06-24 18:24:23.583933', '2024-06-24 18:29:12.198573', '121e0e93-a443-45e1-9637-625455f5a797'),
('0a6f7a6b-108f-45ab-97fb-62adc700dbbf', 'DEMO QUESTION 5', 'DEMO ANSWER 5', 'ACTIVE', '2024-06-24 18:24:57.169278', '2024-06-24 18:33:22.000000', '121e0e93-a443-45e1-9637-625455f5a797'),
('33c95dc0-2c79-4ed2-be34-8948f6de921b', 'DEMO QUESTION 4', 'DEMO ANSWER 4', 'PENDING', '2024-06-24 18:24:50.547376', '2024-06-24 18:24:50.547376', '121e0e93-a443-45e1-9637-625455f5a797'),
('77a4ab43-d47c-4f3a-a072-fabcd4994a79', 'DEMO QUESTION 3', 'DEMO ANSWER 3', 'PENDING', '2024-06-24 18:24:41.838087', '2024-06-24 18:24:41.838087', '121e0e93-a443-45e1-9637-625455f5a797'),
('c0d24ad9-f2c9-489e-9b35-28f88f264ac8', 'DEMO QUESTION 1', 'DEMO ANSWER 1', 'PENDING', '2024-06-24 18:24:30.737847', '2024-06-24 18:24:30.737847', '121e0e93-a443-45e1-9637-625455f5a797'),
('fddf3572-f50c-482c-8b3b-80655c6d58e4', 'DEMO QUESTION 2', 'DEMO ANSWER 2', 'ACTIVE', '2024-06-24 18:24:35.766338', '2024-06-24 18:29:22.398203', '121e0e93-a443-45e1-9637-625455f5a797');

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `id` varchar(36) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `icon` varchar(250) DEFAULT NULL,
  `iconPath` varchar(250) DEFAULT NULL,
  `status` enum('ACTIVE','DEACTIVE','DELETED','SUSPENDED','PENDING') NOT NULL DEFAULT 'PENDING'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leed`
--

CREATE TABLE `leed` (
  `id` varchar(36) NOT NULL,
  `companyDetailId` varchar(255) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `contactNumber` varchar(50) DEFAULT NULL,
  `wpNo` varchar(50) DEFAULT NULL,
  `enquiryFor` varchar(100) DEFAULT NULL,
  `accountId` varchar(255) DEFAULT NULL,
  `status` enum('NEW','CALLED') NOT NULL DEFAULT 'NEW',
  `location` varchar(100) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leed`
--

INSERT INTO `leed` (`id`, `companyDetailId`, `name`, `contactNumber`, `wpNo`, `enquiryFor`, `accountId`, `status`, `location`, `createdAt`, `updatedAt`) VALUES
('08835d6f-2104-4909-938a-2d7ed9d3e0d1', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 9', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:20.140611', '2024-07-04 18:48:20.140611'),
('22a3aa3b-d0fd-42d4-9e58-928946efc9a1', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 14', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:42:03.651789', '2024-07-04 12:42:03.651789'),
('346efe92-b796-424b-a4a0-f7793b8b0c50', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 8', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:15.289576', '2024-07-04 18:48:15.289576'),
('3886c59c-4818-42c9-bc5b-96fa3dc7565d', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 11', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:41:59.031649', '2024-07-04 12:41:59.031649'),
('3b1e4675-4ee8-4e5d-9f6c-bf7b296e48bf', 'fe421672-f86f-4da9-8def-e7052566801e', 'Abhijeet Das', '8017382083', '8017382083', 'Phone Store', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City, Kolkata-700034', '2024-06-27 18:46:39.008939', '2024-07-04 12:29:41.253716'),
('43e206bc-8eaf-4b2b-bf51-11f138cd7b8c', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 11', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:25.607740', '2024-07-04 18:48:25.607740'),
('45b80f78-42c9-46d5-9a8b-2dd98946c094', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 12', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:42:00.765041', '2024-07-04 12:42:00.765041'),
('556dc291-4a43-4594-9b5d-fae45b2e3917', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 16', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:42:06.732911', '2024-07-04 12:42:06.732911'),
('5793b1b0-d61c-421a-ba45-383572c04183', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 10', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:23.131416', '2024-07-04 18:48:23.131416'),
('5ddd9ce3-0ee0-444b-81c6-acf00308ba02', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:47:45.382988', '2024-07-04 18:47:45.382988'),
('67f939d0-a524-4c90-acf8-cc317ce62427', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 19', '764795de-2a9b-4447-92a9-fd884e511341', 'CALLED', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:47.823098', '2024-07-04 18:58:47.000000'),
('6898b475-f3f1-4a6a-adce-00056c2e1c29', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 3', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:40:50.299266', '2024-07-04 12:40:50.299266'),
('6a837f81-a8d3-4abb-ad86-85ec3a52e7ac', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 5', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:08.146751', '2024-07-04 18:48:08.146751'),
('6ad84581-5a9f-43da-8084-5756d0e8e2b0', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 18', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:42:10.090800', '2024-07-04 12:42:10.090800'),
('71978325-c037-4b85-bc83-7b18238afb83', 'fe421672-f86f-4da9-8def-e7052566801e', 'Uttam Patra', '8017382083', '8017382083', 'Phone Store', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City, Kolkata-700034', '2024-06-27 18:46:23.265263', '2024-07-04 12:19:54.390129'),
('770cc5ad-ffe8-45e2-ad5b-b7de4b7716d0', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 7', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:12.911371', '2024-07-04 18:48:12.911371'),
('7cbab410-94d1-4cde-a14b-8a8265b8784c', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 12', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:27.957267', '2024-07-04 18:48:27.957267'),
('7d7e30d6-56d0-4034-9524-f6598917f3cb', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 10', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:41:06.848921', '2024-07-04 12:41:06.848921'),
('83deab80-ef97-46a5-9cc1-3679b52284f8', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 13', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:31.815881', '2024-07-04 18:48:31.815881'),
('8a5d6dfc-28c1-42d3-82b1-26a4858d42b1', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 17', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:42:08.194072', '2024-07-04 12:42:08.194072'),
('8e82d73d-51ff-4bbb-bcc3-e00f88c757ad', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 4', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:40:52.558362', '2024-07-04 12:40:52.558362'),
('9ea5fd99-39df-4294-a80d-f21e9bbf88c6', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 20', '764795de-2a9b-4447-92a9-fd884e511341', 'CALLED', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:54.165853', '2024-07-04 18:58:27.000000'),
('a37c32be-433b-4ec5-9f82-2e7c81d700bc', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 15', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:42:05.083715', '2024-07-04 12:42:05.083715'),
('a4e4789d-fcf4-46db-a90f-1c9cfaf56dcc', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 15', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:36.160288', '2024-07-04 18:48:36.160288'),
('a50c9208-490e-4a7e-8001-809cc0b3ee8d', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 6', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:10.642161', '2024-07-04 18:48:10.642161'),
('af3cb07a-ab9c-4f4f-8095-2a3840ed79f2', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 4', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:05.665294', '2024-07-04 18:48:05.665294'),
('af9f951c-8f6c-482e-b6a5-768ef6461b9f', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 6', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:40:56.437350', '2024-07-04 12:40:56.437350'),
('b09f419c-7970-487a-88e7-b0e995c4d435', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 10', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:42:17.077834', '2024-07-04 12:42:17.077834'),
('b9f14a4b-2508-43f8-be8b-b7018ca2a6b6', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 2', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:47:59.974331', '2024-07-04 18:47:59.974331'),
('bbf0937b-745a-41fd-9f7c-5200feab9135', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 8', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:41:00.932778', '2024-07-04 12:41:00.932778'),
('bc854729-ed8c-4593-aa4c-a53bb8159718', 'fe421672-f86f-4da9-8def-e7052566801e', 'Shayandip Chitrakar', '8017382083', '8017382083', 'Phone Repair', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City, Kolkata-700034', '2024-07-04 18:46:56.190282', '2024-07-04 12:19:30.490360'),
('bcfe44e7-d2bb-4b7c-b2af-9faa6942f9ab', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 18', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:44.358117', '2024-07-04 18:48:44.358117'),
('c6fbbdf7-893e-4a41-91d7-56d5438874e6', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 7', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:40:58.718094', '2024-07-04 12:40:58.718094'),
('cb7b8ab9-101c-487f-a9bb-445517748118', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:40:26.051340', '2024-07-04 12:40:26.051340'),
('d59e4d74-3785-415f-bd67-7f67daef0fbf', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 3', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:03.082514', '2024-07-04 18:48:03.082514'),
('d6542b4b-8fd6-406c-b7b7-f901f0bb6001', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 2', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:40:46.744020', '2024-07-04 12:40:46.744020'),
('d87976ee-f344-4030-99b0-6efb1f95d0e9', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 9', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:41:02.896864', '2024-07-04 12:41:02.896864'),
('dd9506ba-1b27-4187-b463-316a8befd272', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 17', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:41.744007', '2024-07-04 18:48:41.744007'),
('df26a61c-96b1-49ec-bb42-f0e7c2c03fa8', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 5', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:40:54.581376', '2024-07-04 12:40:54.581376'),
('e121f0f5-3897-455c-8ca3-c72b2c1efc37', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 16', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:39.186865', '2024-07-04 18:48:39.186865'),
('e4c84edf-6973-4f09-93ed-0d8f07b3c167', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 14', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:48:34.088108', '2024-07-04 18:48:34.088108'),
('e7ce9e20-db9c-4813-a45e-c34d1a9d80ba', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 1', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:40:44.791925', '2024-07-04 12:40:44.791925'),
('e8431029-6439-4870-bc75-98335ff76634', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 19', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:42:14.561390', '2024-07-04 12:42:14.561390'),
('fbd14b87-b29a-49e2-9d16-f7cf758e7520', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'Swadhin Dhara', '7797707517', '7797707517', 'Doctor 1', '764795de-2a9b-4447-92a9-fd884e511341', 'NEW', 'Jodhpur Park,Kolkata-700034', '2024-07-04 18:47:57.125202', '2024-07-04 18:47:57.125202'),
('ff36b99a-16d4-415b-98ea-9eddcd8a8dc3', 'fe421672-f86f-4da9-8def-e7052566801e', 'DEMO USER', '8017382083', '8017382083', 'Phone Shop 13', '7e14049f-2b72-45a8-b27b-28f4994cbc72', 'NEW', 'South City,Kolkata-700034', '2024-07-04 12:42:02.360317', '2024-07-04 12:42:02.360317');

-- --------------------------------------------------------

--
-- Table structure for table `login_history`
--

CREATE TABLE `login_history` (
  `id` int(11) NOT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `origin` varchar(100) DEFAULT NULL,
  `type` enum('IN','OUT') NOT NULL DEFAULT 'IN',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `accountId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `name`, `title`) VALUES
(1, 'account', 'Account'),
(2, 'category', 'Category'),
(3, 'company_detail', 'Company Detail'),
(4, 'faq', 'Faq'),
(5, 'login_history', 'Login History'),
(6, 'menu', 'Menu'),
(7, 'notification', 'Notification'),
(8, 'page', 'Page'),
(9, 'permission', 'Permission'),
(10, 'search_history', 'Search History'),
(11, 'setting', 'Setting'),
(12, 'staff_detail', 'Staff Detail'),
(13, 'sub_category', 'Sub Category'),
(14, 'user_detail', 'User Detail'),
(15, 'user_permission', 'User Permission'),
(16, 'blog', 'Blog');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `type` enum('NEW PRODUCT','NEW ACCOUNT','CONTACT US','QNA','FEEDBACK','INVOICE','STAFF','TICKET','PRODUCT','PRODUCT VIEW','VENDOR RATING','VENDOR ACCOUNT','VENDOR INVOICE','VENDOR PAYMENT','VENDOR TICKET','USER PRODUCT','USER ACCOUNT','USER INVOICE','USER PAYMENT','USER TICKET','OFFER','LOGIN') DEFAULT NULL,
  `read` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `accountId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `id` int(11) NOT NULL,
  `title` enum('TERMS & CONDITIONS','PRIVACY POLICY','ENQUIRY DATA POLICY','DATA POLICY','LISTING POLICY','ABOUT APP') NOT NULL,
  `desc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `page`
--

INSERT INTO `page` (`id`, `title`, `desc`) VALUES
(1, 'TERMS & CONDITIONS', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, risus id tincidunt volutpat, ligula orci sodales dui, ut mattis erat felis in justo. Cras nec laoreet augue, molestie eleifend sapien. Vivamus ullamcorper nisi ante, non euismod leo porta eget. Aliquam eget imperdiet enim, vitae tempor elit. Duis dictum turpis sed condimentum auctor.'),
(2, 'PRIVACY POLICY', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, risus id tincidunt volutpat, ligula orci sodales dui, ut mattis erat felis in justo. Cras nec laoreet augue, molestie eleifend sapien. Vivamus ullamcorper nisi ante, non euismod leo porta eget. Aliquam eget imperdiet enim, vitae tempor elit. Duis dictum turpis sed condimentum auctor.'),
(3, 'ENQUIRY DATA POLICY', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, risus id tincidunt volutpat, ligula orci sodales dui, ut mattis erat felis in justo. Cras nec laoreet augue, molestie eleifend sapien. Vivamus ullamcorper nisi ante, non euismod leo porta eget. Aliquam eget imperdiet enim, vitae tempor elit. Duis dictum turpis sed condimentum auctor.'),
(4, 'DATA POLICY', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, risus id tincidunt volutpat, ligula orci sodales dui, ut mattis erat felis in justo. Cras nec laoreet augue, molestie eleifend sapien. Vivamus ullamcorper nisi ante, non euismod leo porta eget. Aliquam eget imperdiet enim, vitae tempor elit. Duis dictum turpis sed condimentum auctor.'),
(5, 'LISTING POLICY', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, risus id tincidunt volutpat, ligula orci sodales dui, ut mattis erat felis in justo. Cras nec laoreet augue, molestie eleifend sapien. Vivamus ullamcorper nisi ante, non euismod leo porta eget. Aliquam eget imperdiet enim, vitae tempor elit. Duis dictum turpis sed condimentum auctor.'),
(6, 'ABOUT APP', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, risus id tincidunt volutpat, ligula orci sodales dui, ut mattis erat felis in justo. Cras nec laoreet augue, molestie eleifend sapien. Vivamus ullamcorper nisi ante, non euismod leo porta eget. Aliquam eget imperdiet enim, vitae tempor elit. Duis dictum turpis sed condimentum auctor.');

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `name`) VALUES
(1, 'Create'),
(4, 'Delete'),
(2, 'Read'),
(3, 'Update');

-- --------------------------------------------------------

--
-- Table structure for table `rating_feedback`
--

CREATE TABLE `rating_feedback` (
  `id` varchar(36) NOT NULL,
  `companyDetailId` varchar(255) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `rating` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `accountId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rating_feedback`
--

INSERT INTO `rating_feedback` (`id`, `companyDetailId`, `desc`, `rating`, `status`, `createdAt`, `updatedAt`, `accountId`) VALUES
('0a5940b5-edda-4c47-923b-17fdae6cbbcb', 'fe421672-f86f-4da9-8def-e7052566801e', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.', 4, 1, '2024-06-27 14:45:52.203420', '2024-06-27 14:46:29.000000', '7e14049f-2b72-45a8-b27b-28f4994cbc72'),
('10e3b54c-db2d-4196-bbb4-15f9c152bb3b', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.', 3, 1, '2024-07-04 18:52:33.225126', '2024-07-04 18:53:25.791832', '764795de-2a9b-4447-92a9-fd884e511341'),
('395099a2-bc7e-42f9-9330-c955464fa7d3', 'fe421672-f86f-4da9-8def-e7052566801e', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.', 4, 1, '2024-07-02 13:12:59.326779', '2024-07-02 13:13:19.198606', '7e14049f-2b72-45a8-b27b-28f4994cbc72'),
('51ca11d8-18f7-4ced-aff4-e305d9847717', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.', 3, 1, '2024-07-04 18:52:29.293013', '2024-07-04 18:54:36.646886', '764795de-2a9b-4447-92a9-fd884e511341'),
('83afa644-b23d-4f26-9aab-e32444f5489c', 'fe421672-f86f-4da9-8def-e7052566801e', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.', 5, 1, '2024-07-02 13:13:06.388234', '2024-07-02 13:13:21.940469', '7e14049f-2b72-45a8-b27b-28f4994cbc72'),
('83c332fd-62ad-42d2-aa65-06382ce43ddf', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.', 2, 1, '2024-07-04 18:52:28.446077', '2024-07-04 18:53:30.417134', '764795de-2a9b-4447-92a9-fd884e511341'),
('878f5bb5-9e3b-4ff1-aece-0e3661dbd69b', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.', 2, 1, '2024-07-04 18:52:21.342964', '2024-07-04 18:53:35.530420', '764795de-2a9b-4447-92a9-fd884e511341'),
('8e7a6af0-b369-4bd2-a9c2-a708b388c8d1', 'fe421672-f86f-4da9-8def-e7052566801e', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.', 5, 1, '2024-06-27 13:06:29.856348', '2024-06-27 14:43:11.000000', '7e14049f-2b72-45a8-b27b-28f4994cbc72'),
('ab8679f4-8552-412c-8526-7bcd25d5c86d', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.', 3, 1, '2024-07-04 18:52:36.032133', '2024-07-04 18:53:23.352165', '764795de-2a9b-4447-92a9-fd884e511341'),
('bacde8da-79a8-484a-adac-e9804b7093e1', 'fe421672-f86f-4da9-8def-e7052566801e', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.', 3, 1, '2024-07-02 13:13:02.795678', '2024-07-02 13:13:25.846638', '7e14049f-2b72-45a8-b27b-28f4994cbc72'),
('d58e98a3-607e-45c0-8ac4-33b3a11d8010', 'f21dfe15-7587-4374-92c6-54f2a63579ad', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.', 2, 1, '2024-07-04 18:52:27.495480', '2024-07-04 18:53:33.237509', '764795de-2a9b-4447-92a9-fd884e511341');

-- --------------------------------------------------------

--
-- Table structure for table `search_history`
--

CREATE TABLE `search_history` (
  `id` varchar(36) NOT NULL,
  `keyword` text DEFAULT NULL,
  `accountId` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `search_history`
--

INSERT INTO `search_history` (`id`, `keyword`, `accountId`, `createdAt`, `updatedAt`) VALUES
('022ff552-bb45-4327-aa11-e19445071ae4', 'mobile sale', 'a96323a9-361f-48ea-bc88-ed58705e61da', '2024-07-02 12:55:12.327155', '2024-07-02 12:55:12.327155'),
('1cb36bcb-186a-49d4-81e7-831655c07636', 'mobile repair', 'a96323a9-361f-48ea-bc88-ed58705e61da', '2024-07-03 15:37:56.183660', '2024-07-03 15:37:56.183660'),
('55f5948d-cd65-44df-a21e-c28949930874', 'mobile', 'a96323a9-361f-48ea-bc88-ed58705e61da', '2024-07-03 15:37:19.153520', '2024-07-03 15:37:19.153520'),
('ddd80080-9c3c-49d3-a5e4-cec2e3daa1d6', 'doctor good', '764795de-2a9b-4447-92a9-fd884e511341', '2024-07-04 18:30:26.938612', '2024-07-04 18:30:26.938612');

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id` varchar(36) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `user_domain` varchar(50) DEFAULT NULL,
  `admin_domain` varchar(50) DEFAULT NULL,
  `mobile_domain` varchar(150) DEFAULT NULL,
  `logo` text DEFAULT NULL,
  `logoPath` text DEFAULT NULL,
  `status` enum('ACTIVE','DEACTIVE','DELETED','SUSPENDED','PENDING') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`id`, `name`, `status`) VALUES
(3, 'JAMMU AND KASHMIR', 1),
(4, 'HIMACHAL PRADESH', 1),
(5, 'PUNJAB', 1),
(6, 'CHANDIGARH', 1),
(7, 'UTTARAKHAND', 1),
(8, 'HARYANA', 1),
(9, 'DELHI', 1),
(10, 'RAJASTHAN', 1),
(11, 'UTTAR PRADESH', 1),
(12, 'BIHAR', 1),
(13, 'SIKKIM', 1),
(14, 'ARUNACHAL PRADESH', 1),
(15, 'NAGALAND', 1),
(16, 'MANIPUR', 1),
(17, 'MIZORAM', 1),
(18, 'TRIPURA', 1),
(19, 'MEGHALAYA', 1),
(20, 'ASSAM', 1),
(21, 'WEST BENGAL', 1),
(22, 'JHARKHAND', 1),
(23, 'ODISHA', 1),
(24, 'CHATTISGARH', 1),
(25, 'MADHYA PRADESH', 1),
(26, 'GUJARAT', 1),
(27, 'MAHARASHTRA', 1),
(28, 'ANDHRA PRADESH', 1),
(29, 'KARNATAKA', 1),
(30, 'GOA', 1),
(31, 'LAKSHADWEEP', 1),
(32, 'KERALA', 1),
(33, 'TAMIL NADU', 1),
(34, 'PUDUCHERRY', 1),
(35, 'ANDAMAN AND NICOBAR ISLANDS', 1),
(36, 'TELANGANA', 1),
(37, 'LADAKH', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

CREATE TABLE `sub_category` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `imageName` text DEFAULT NULL,
  `status` enum('ACTIVE','DEACTIVE','DELETED','SUSPENDED','PENDING') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `categoryId` varchar(255) DEFAULT NULL,
  `accountId` varchar(255) DEFAULT NULL,
  `updatedId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`id`, `name`, `image`, `imageName`, `status`, `createdAt`, `updatedAt`, `categoryId`, `accountId`, `updatedId`) VALUES
('73d33839-2d03-4826-b50d-f3f9144a087f', 'Sub-Cat 2', 'http://localhost:5892/uploads\\subCategory\\3e84aa78338047b5366dcf28c792fa0d.jpg', 'uploads\\subCategory\\3e84aa78338047b5366dcf28c792fa0d.jpg', 'ACTIVE', '2024-06-25 10:42:31.146170', '2024-06-26 16:21:20.737532', '846285f0-79c5-4ad2-bb3d-054b35cd5cbc', '121e0e93-a443-45e1-9637-625455f5a797', '121e0e93-a443-45e1-9637-625455f5a797'),
('7d93f296-6e18-4909-8db0-71a91d412ed6', 'Sub-Cat 4', 'http://localhost:5892/uploads\\subCategory\\b8e7e091065a1626a7d7dad3df417b9b8.jpg', 'uploads\\subCategory\\b8e7e091065a1626a7d7dad3df417b9b8.jpg', 'ACTIVE', '2024-06-25 10:42:35.394936', '2024-06-26 16:21:27.021822', '846285f0-79c5-4ad2-bb3d-054b35cd5cbc', '121e0e93-a443-45e1-9637-625455f5a797', '121e0e93-a443-45e1-9637-625455f5a797'),
('c411d43f-8fdf-401a-af74-7eb5c23fc1d2', 'Sub-Cat 3', NULL, NULL, 'ACTIVE', '2024-06-25 10:42:33.367298', '2024-06-26 16:21:32.117318', '846285f0-79c5-4ad2-bb3d-054b35cd5cbc', '121e0e93-a443-45e1-9637-625455f5a797', '121e0e93-a443-45e1-9637-625455f5a797'),
('dc7a28a9-00c9-49e6-a286-0d7d56120c07', 'Sub-Cat 1', NULL, NULL, 'ACTIVE', '2024-06-25 10:42:27.722909', '2024-06-26 16:21:36.628579', '846285f0-79c5-4ad2-bb3d-054b35cd5cbc', '121e0e93-a443-45e1-9637-625455f5a797', '121e0e93-a443-45e1-9637-625455f5a797'),
('dc7a28a9-00c9-49e6-a286-0d7d56120c08', 'DOC Sub-Cat 3', NULL, NULL, 'ACTIVE', '2024-07-04 10:42:27.722909', '2024-07-04 15:27:30.400970', 'd2d30828-664b-41eb-b736-98af588206b6', '121e0e93-a443-45e1-9637-625455f5a797', '121e0e93-a443-45e1-9637-625455f5a797'),
('dc7a28a9-00c9-49e6-a286-0d7d56120c11', 'DOC Sub-Cat 1', NULL, NULL, 'ACTIVE', '2024-07-04 10:42:27.722909', '2024-07-04 15:27:30.400970', 'd2d30828-664b-41eb-b736-98af588206b6', '121e0e93-a443-45e1-9637-625455f5a797', '121e0e93-a443-45e1-9637-625455f5a797'),
('dc7a28a9-00c9-49e6-a286-0d7d56120c45', 'DOC Sub-Cat 2', NULL, NULL, 'ACTIVE', '2024-07-04 10:42:27.722909', '2024-07-04 15:27:30.400970', 'd2d30828-664b-41eb-b736-98af588206b6', '121e0e93-a443-45e1-9637-625455f5a797', '121e0e93-a443-45e1-9637-625455f5a797');

-- --------------------------------------------------------

--
-- Table structure for table `user_detail`
--

CREATE TABLE `user_detail` (
  `id` varchar(36) NOT NULL,
  `wpNo` varchar(50) DEFAULT NULL,
  `name` varchar(55) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `interest` varchar(200) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `profile` text DEFAULT NULL,
  `profileName` text DEFAULT NULL,
  `accountId` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_detail`
--

INSERT INTO `user_detail` (`id`, `wpNo`, `name`, `email`, `interest`, `city`, `profile`, `profileName`, `accountId`, `createdAt`, `updatedAt`) VALUES
('a96a86ef-03ea-4e58-a40c-305feb31171e', '7797707517', 'Swadhin Dhara', 'swadhin@gmail.com', 'Phone Store, Doctor', 'DURGAPUR', 'http://localhost:5892/uploads\\UserDetail\\profile\\a109e1010210c975e0dc298f6ac4ec7e5b6.jpg', 'uploads\\UserDetail\\profile\\a109e1010210c975e0dc298f6ac4ec7e5b6.jpg', '764795de-2a9b-4447-92a9-fd884e511341', '2024-07-04 17:21:44.710029', '2024-07-04 17:26:23.000000'),
('db0ce313-5887-4d07-a3ab-d29c40274612', '8017382083', 'DEMO USER', 'demo@gmail.com', 'Salon, Doctor', 'KOLKATA', 'http://localhost:5892/uploads\\UserDetail\\profile\\acced89961039524b8589be73423d05f2.png', 'uploads\\UserDetail\\profile\\acced89961039524b8589be73423d05f2.png', '7e14049f-2b72-45a8-b27b-28f4994cbc72', '2024-06-27 12:40:03.834563', '2024-07-03 17:37:28.188864');

-- --------------------------------------------------------

--
-- Table structure for table `user_permission`
--

CREATE TABLE `user_permission` (
  `id` int(11) NOT NULL,
  `accountId` varchar(255) DEFAULT NULL,
  `menuId` int(11) DEFAULT NULL,
  `permissionId` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_permission`
--

INSERT INTO `user_permission` (`id`, `accountId`, `menuId`, `permissionId`, `status`, `updatedAt`) VALUES
(1, '121e0e93-a443-45e1-9637-625455f5a797', 1, 1, 1, '2024-06-24 15:22:46.470142'),
(2, '121e0e93-a443-45e1-9637-625455f5a797', 1, 4, 1, '2024-06-24 15:22:46.470142'),
(3, '121e0e93-a443-45e1-9637-625455f5a797', 1, 2, 1, '2024-06-24 15:22:46.470142'),
(4, '121e0e93-a443-45e1-9637-625455f5a797', 1, 3, 1, '2024-06-24 15:22:46.470142'),
(5, '121e0e93-a443-45e1-9637-625455f5a797', 2, 1, 1, '2024-06-24 15:22:46.470142'),
(6, '121e0e93-a443-45e1-9637-625455f5a797', 2, 4, 1, '2024-06-24 15:22:46.470142'),
(7, '121e0e93-a443-45e1-9637-625455f5a797', 2, 2, 1, '2024-06-24 15:22:46.470142'),
(8, '121e0e93-a443-45e1-9637-625455f5a797', 2, 3, 1, '2024-06-24 15:22:46.470142'),
(9, '121e0e93-a443-45e1-9637-625455f5a797', 3, 1, 1, '2024-06-24 15:22:46.470142'),
(10, '121e0e93-a443-45e1-9637-625455f5a797', 3, 4, 1, '2024-06-24 15:22:46.470142'),
(11, '121e0e93-a443-45e1-9637-625455f5a797', 3, 2, 1, '2024-06-24 15:22:46.470142'),
(12, '121e0e93-a443-45e1-9637-625455f5a797', 3, 3, 1, '2024-06-24 15:22:46.470142'),
(13, '121e0e93-a443-45e1-9637-625455f5a797', 4, 1, 1, '2024-06-24 15:22:46.470142'),
(14, '121e0e93-a443-45e1-9637-625455f5a797', 4, 4, 1, '2024-06-24 15:22:46.470142'),
(15, '121e0e93-a443-45e1-9637-625455f5a797', 4, 2, 1, '2024-06-24 15:22:46.470142'),
(16, '121e0e93-a443-45e1-9637-625455f5a797', 4, 3, 1, '2024-06-24 15:22:46.470142'),
(17, '121e0e93-a443-45e1-9637-625455f5a797', 5, 1, 1, '2024-06-24 15:22:46.470142'),
(18, '121e0e93-a443-45e1-9637-625455f5a797', 5, 4, 1, '2024-06-24 15:22:46.470142'),
(19, '121e0e93-a443-45e1-9637-625455f5a797', 5, 2, 1, '2024-06-24 15:22:46.470142'),
(20, '121e0e93-a443-45e1-9637-625455f5a797', 5, 3, 1, '2024-06-24 15:22:46.470142'),
(21, '121e0e93-a443-45e1-9637-625455f5a797', 6, 1, 1, '2024-06-24 15:22:46.470142'),
(22, '121e0e93-a443-45e1-9637-625455f5a797', 6, 4, 1, '2024-06-24 15:22:46.470142'),
(23, '121e0e93-a443-45e1-9637-625455f5a797', 6, 2, 1, '2024-06-24 15:22:46.470142'),
(24, '121e0e93-a443-45e1-9637-625455f5a797', 6, 3, 1, '2024-06-24 15:22:46.470142'),
(25, '121e0e93-a443-45e1-9637-625455f5a797', 7, 1, 1, '2024-06-24 15:22:46.470142'),
(26, '121e0e93-a443-45e1-9637-625455f5a797', 7, 4, 1, '2024-06-24 15:22:46.470142'),
(27, '121e0e93-a443-45e1-9637-625455f5a797', 7, 2, 1, '2024-06-24 15:22:46.470142'),
(28, '121e0e93-a443-45e1-9637-625455f5a797', 7, 3, 1, '2024-06-24 15:22:46.470142'),
(29, '121e0e93-a443-45e1-9637-625455f5a797', 8, 1, 1, '2024-06-24 15:22:46.470142'),
(30, '121e0e93-a443-45e1-9637-625455f5a797', 8, 4, 1, '2024-06-24 15:22:46.470142'),
(31, '121e0e93-a443-45e1-9637-625455f5a797', 8, 2, 1, '2024-06-24 15:22:46.470142'),
(32, '121e0e93-a443-45e1-9637-625455f5a797', 8, 3, 1, '2024-06-24 15:22:46.470142'),
(33, '121e0e93-a443-45e1-9637-625455f5a797', 9, 1, 1, '2024-06-24 15:22:46.470142'),
(34, '121e0e93-a443-45e1-9637-625455f5a797', 9, 4, 1, '2024-06-24 15:22:46.470142'),
(35, '121e0e93-a443-45e1-9637-625455f5a797', 9, 2, 1, '2024-06-24 15:22:46.470142'),
(36, '121e0e93-a443-45e1-9637-625455f5a797', 9, 3, 1, '2024-06-24 15:22:46.470142'),
(37, '121e0e93-a443-45e1-9637-625455f5a797', 10, 1, 1, '2024-06-24 15:22:46.470142'),
(38, '121e0e93-a443-45e1-9637-625455f5a797', 10, 4, 1, '2024-06-24 15:22:46.470142'),
(39, '121e0e93-a443-45e1-9637-625455f5a797', 10, 2, 1, '2024-06-24 15:22:46.470142'),
(40, '121e0e93-a443-45e1-9637-625455f5a797', 10, 3, 1, '2024-06-24 15:22:46.470142'),
(41, '121e0e93-a443-45e1-9637-625455f5a797', 11, 1, 1, '2024-06-24 15:22:46.470142'),
(42, '121e0e93-a443-45e1-9637-625455f5a797', 11, 4, 1, '2024-06-24 15:22:46.470142'),
(43, '121e0e93-a443-45e1-9637-625455f5a797', 11, 2, 1, '2024-06-24 15:22:46.470142'),
(44, '121e0e93-a443-45e1-9637-625455f5a797', 11, 3, 1, '2024-06-24 15:22:46.470142'),
(45, '121e0e93-a443-45e1-9637-625455f5a797', 12, 1, 1, '2024-06-24 15:22:46.470142'),
(46, '121e0e93-a443-45e1-9637-625455f5a797', 12, 4, 1, '2024-06-24 15:22:46.470142'),
(47, '121e0e93-a443-45e1-9637-625455f5a797', 12, 2, 1, '2024-06-24 15:22:46.470142'),
(48, '121e0e93-a443-45e1-9637-625455f5a797', 12, 3, 1, '2024-06-24 15:22:46.470142'),
(49, '121e0e93-a443-45e1-9637-625455f5a797', 13, 1, 1, '2024-06-24 15:22:46.470142'),
(50, '121e0e93-a443-45e1-9637-625455f5a797', 13, 4, 1, '2024-06-24 15:22:46.470142'),
(51, '121e0e93-a443-45e1-9637-625455f5a797', 13, 2, 1, '2024-06-24 15:22:46.470142'),
(52, '121e0e93-a443-45e1-9637-625455f5a797', 13, 3, 1, '2024-06-24 15:22:46.470142'),
(53, '121e0e93-a443-45e1-9637-625455f5a797', 14, 1, 1, '2024-06-24 15:22:46.470142'),
(54, '121e0e93-a443-45e1-9637-625455f5a797', 14, 4, 1, '2024-06-24 15:22:46.470142'),
(55, '121e0e93-a443-45e1-9637-625455f5a797', 14, 2, 1, '2024-06-24 15:22:46.470142'),
(56, '121e0e93-a443-45e1-9637-625455f5a797', 14, 3, 1, '2024-06-24 15:22:46.470142'),
(57, '121e0e93-a443-45e1-9637-625455f5a797', 15, 1, 1, '2024-06-24 15:22:46.470142'),
(58, '121e0e93-a443-45e1-9637-625455f5a797', 15, 4, 1, '2024-06-24 15:22:46.470142'),
(59, '121e0e93-a443-45e1-9637-625455f5a797', 15, 2, 1, '2024-06-24 15:22:46.470142'),
(60, '121e0e93-a443-45e1-9637-625455f5a797', 15, 3, 1, '2024-06-24 15:22:46.470142'),
(61, '121e0e93-a443-45e1-9637-625455f5a797', 16, 1, 1, '2024-06-24 15:22:46.470142'),
(62, '121e0e93-a443-45e1-9637-625455f5a797', 16, 2, 1, '2024-06-24 15:22:46.470142'),
(63, '121e0e93-a443-45e1-9637-625455f5a797', 16, 3, 1, '2024-06-24 15:22:46.470142'),
(64, '121e0e93-a443-45e1-9637-625455f5a797', 16, 4, 1, '2024-06-24 15:22:46.470142');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f335d449f3c45e450239b293b06` (`cityId`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e1f603ae034d531c266b8a57413` (`categoryId`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_9dd44887bd917f9ee76aff90a02` (`accountId`);

--
-- Indexes for table `call_history`
--
ALTER TABLE `call_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1a534ab1cdd530bc0aef6086d1f` (`accountId`),
  ADD KEY `FK_365265d6a4d5978551f04007362` (`companyDetailId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e99de556ee56afe72154f3ed04a` (`stateId`);

--
-- Indexes for table `company_category`
--
ALTER TABLE `company_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_88d1020e9ff4a0abce680ab9fb6` (`accountId`),
  ADD KEY `FK_8d8defd7a0678e1c51dc3e13da0` (`categoryId`);

--
-- Indexes for table `company_detail`
--
ALTER TABLE `company_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_9ac899864ae8beea0fc3a3e903b` (`accountId`);

--
-- Indexes for table `company_image`
--
ALTER TABLE `company_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_0c28d124666087028cb5c0518a8` (`accountId`);

--
-- Indexes for table `company_keyword`
--
ALTER TABLE `company_keyword`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e739df19e76811b64057fcd7296` (`accountId`);

--
-- Indexes for table `company_schedule`
--
ALTER TABLE `company_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_099350745e53d912a39447b019c` (`companyDetailId`);

--
-- Indexes for table `company_sub_category`
--
ALTER TABLE `company_sub_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_32c163c5712e9b483e19f0b6e71` (`accountId`),
  ADD KEY `FK_03800c556020a725e59a96dd9f0` (`subCategoryId`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_subscriber`
--
ALTER TABLE `email_subscriber`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_b750051632234ae27d11acc1bb3` (`accountId`);

--
-- Indexes for table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leed`
--
ALTER TABLE `leed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_737d367a36152aae053a34f2856` (`accountId`),
  ADD KEY `FK_f0622ab6fefac6381ed5faeac41` (`companyDetailId`);

--
-- Indexes for table `login_history`
--
ALTER TABLE `login_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_0b4c5e7e15b3d2866cae5ab794c` (`accountId`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_51b63874cdce0d6898a0b2150f` (`name`),
  ADD UNIQUE KEY `IDX_f29781ef48d93c714e1c592a12` (`title`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_00abcf7b2089a5c05f0aedc5676` (`accountId`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_240853a0c3353c25fb12434ad3` (`name`);

--
-- Indexes for table `rating_feedback`
--
ALTER TABLE `rating_feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3a4b6f59bafa155b2d185c6b1c6` (`accountId`),
  ADD KEY `FK_57604aa6d1c796bf1b48be8cebb` (`companyDetailId`);

--
-- Indexes for table `search_history`
--
ALTER TABLE `search_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3834eee35687f53d713044b5e73` (`accountId`),
  ADD KEY `FK_51b8c0b349725210c4bd8b9b7a7` (`categoryId`);

--
-- Indexes for table `user_detail`
--
ALTER TABLE `user_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_540d2de9f397b81fd7ee070d631` (`accountId`);

--
-- Indexes for table `user_permission`
--
ALTER TABLE `user_permission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_344be4cbbe3c14a1b4fa111e152` (`accountId`),
  ADD KEY `FK_ecd93ebf7df98c1d09613171e97` (`menuId`),
  ADD KEY `FK_a592f2df24c9d464afd71401ff6` (`permissionId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `area`
--
ALTER TABLE `area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `login_history`
--
ALTER TABLE `login_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `user_permission`
--
ALTER TABLE `user_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `area`
--
ALTER TABLE `area`
  ADD CONSTRAINT `FK_f335d449f3c45e450239b293b06` FOREIGN KEY (`cityId`) REFERENCES `city` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `banner`
--
ALTER TABLE `banner`
  ADD CONSTRAINT `FK_e1f603ae034d531c266b8a57413` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `FK_9dd44887bd917f9ee76aff90a02` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `call_history`
--
ALTER TABLE `call_history`
  ADD CONSTRAINT `FK_1a534ab1cdd530bc0aef6086d1f` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_365265d6a4d5978551f04007362` FOREIGN KEY (`companyDetailId`) REFERENCES `company_detail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `FK_e99de556ee56afe72154f3ed04a` FOREIGN KEY (`stateId`) REFERENCES `state` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `company_category`
--
ALTER TABLE `company_category`
  ADD CONSTRAINT `FK_88d1020e9ff4a0abce680ab9fb6` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_8d8defd7a0678e1c51dc3e13da0` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `company_detail`
--
ALTER TABLE `company_detail`
  ADD CONSTRAINT `FK_9ac899864ae8beea0fc3a3e903b` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `company_image`
--
ALTER TABLE `company_image`
  ADD CONSTRAINT `FK_0c28d124666087028cb5c0518a8` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `company_keyword`
--
ALTER TABLE `company_keyword`
  ADD CONSTRAINT `FK_e739df19e76811b64057fcd7296` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `company_schedule`
--
ALTER TABLE `company_schedule`
  ADD CONSTRAINT `FK_099350745e53d912a39447b019c` FOREIGN KEY (`companyDetailId`) REFERENCES `company_detail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `company_sub_category`
--
ALTER TABLE `company_sub_category`
  ADD CONSTRAINT `FK_03800c556020a725e59a96dd9f0` FOREIGN KEY (`subCategoryId`) REFERENCES `sub_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_32c163c5712e9b483e19f0b6e71` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `faq`
--
ALTER TABLE `faq`
  ADD CONSTRAINT `FK_b750051632234ae27d11acc1bb3` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `leed`
--
ALTER TABLE `leed`
  ADD CONSTRAINT `FK_737d367a36152aae053a34f2856` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_f0622ab6fefac6381ed5faeac41` FOREIGN KEY (`companyDetailId`) REFERENCES `company_detail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `login_history`
--
ALTER TABLE `login_history`
  ADD CONSTRAINT `FK_0b4c5e7e15b3d2866cae5ab794c` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `FK_00abcf7b2089a5c05f0aedc5676` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rating_feedback`
--
ALTER TABLE `rating_feedback`
  ADD CONSTRAINT `FK_3a4b6f59bafa155b2d185c6b1c6` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_57604aa6d1c796bf1b48be8cebb` FOREIGN KEY (`companyDetailId`) REFERENCES `company_detail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD CONSTRAINT `FK_3834eee35687f53d713044b5e73` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_51b8c0b349725210c4bd8b9b7a7` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_detail`
--
ALTER TABLE `user_detail`
  ADD CONSTRAINT `FK_540d2de9f397b81fd7ee070d631` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_permission`
--
ALTER TABLE `user_permission`
  ADD CONSTRAINT `FK_344be4cbbe3c14a1b4fa111e152` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_a592f2df24c9d464afd71401ff6` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ecd93ebf7df98c1d09613171e97` FOREIGN KEY (`menuId`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
