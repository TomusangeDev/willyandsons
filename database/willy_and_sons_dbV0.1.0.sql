-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2026 at 06:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `willy_and_sons_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `email_subscriptions`
--

CREATE TABLE `email_subscriptions` (
  `id` int(11) NOT NULL,
  `client_email` varchar(255) NOT NULL,
  `subscribed_at` datetime NOT NULL DEFAULT current_timestamp(),
  `location` varchar(100) DEFAULT NULL,
  `status` enum('active','unsubscribed','','') NOT NULL DEFAULT 'active',
  `source` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `email_subscriptions`
--

INSERT INTO `email_subscriptions` (`id`, `client_email`, `subscribed_at`, `location`, `status`, `source`) VALUES
(1, 'test@gmail.com', '2026-03-21 04:46:01', '::1', 'active', 'website'),
(3, 'test2@gmail.com', '2026-03-21 05:44:14', '::1', 'active', 'website'),
(38, 'test3@gmail.com', '2026-03-21 07:38:45', '::1', 'active', 'website'),
(39, 'test4@gmail.com', '2026-03-21 07:39:27', '::1', 'active', 'website'),
(40, 'test5@gmail.com', '2026-03-21 08:01:21', '::1', 'active', 'http://localhost/willySonsOnlineStore/index.html | /willySonsOnlineStore/database/subscribe.php'),
(41, 'test6@gmail.com', '2026-03-21 08:48:54', '::1', 'active', 'http://localhost/willySonsOnlineStore/index.html | /willySonsOnlineStore/database/subscribe.php'),
(42, 'test7@gmail.com', '2026-03-21 08:54:53', '10.186.252.207', 'active', 'http://10.186.252.93/willySonsOnlineStore/index.html | /willySonsOnlineStore/database/subscribe.php');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `email_subscriptions`
--
ALTER TABLE `email_subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `client_email` (`client_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `email_subscriptions`
--
ALTER TABLE `email_subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
