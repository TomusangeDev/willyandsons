-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2026 at 06:58 PM
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
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `added_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `source` varchar(255) DEFAULT NULL
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
(42, 'test7@gmail.com', '2026-03-21 08:54:53', '10.186.252.207', 'active', 'http://10.186.252.93/willySonsOnlineStore/index.html | /willySonsOnlineStore/database/subscribe.php'),
(43, 'snowtech@gmail.com', '2026-04-12 05:41:36', '127.0.0.1', 'active', 'http://127.0.0.1/onlineshop/index.html | /onlineshop/database/subscribe.php'),
(44, 'tomusange@gmail.com', '2026-04-12 05:47:30', '127.0.0.1', 'active', 'http://127.0.0.1/onlineshop/index.html | /onlineshop/database/subscribe.php'),
(45, 'tomusangedev@gmail.com', '2026-04-12 06:08:04', '192.168.144.158', 'active', 'http://192.168.144.93/onlineshop/ | /onlineshop/database/subscribe.php'),
(46, 'profelixsnow@gmail.com', '2026-04-12 06:11:47', '192.168.144.158', 'active', 'http://192.168.144.93/onlineshop/ | /onlineshop/database/subscribe.php'),
(54, 'tou@gmail.com', '2026-04-12 06:15:50', '192.168.144.158', 'active', 'http://192.168.144.93/onlineshop/ | /onlineshop/database/subscribe.php'),
(59, 'profelixnow@gmail.com', '2026-04-12 06:16:17', '192.168.144.158', 'active', 'http://192.168.144.93/onlineshop/ | /onlineshop/database/subscribe.php'),
(60, 'buyer@gmaul.com', '2026-04-12 06:20:36', '192.168.144.158', 'active', 'http://192.168.144.93/onlineshop/ | /onlineshop/database/subscribe.php'),
(63, 'source@gmail.com', '2026-04-12 06:39:45', '192.168.144.158', 'active', 'http://192.168.144.93/onlineshop/ | /onlineshop/database/subscribe.php'),
(64, 'addme@gmail.com', '2026-04-12 06:42:03', '192.168.144.158', 'active', 'http://192.168.144.93/onlineshop/ | /onlineshop/database/subscribe.php'),
(65, 'yyyy@gmail.com', '2026-04-12 07:06:03', '192.168.144.158', 'active', 'http://192.168.144.93/onlineshop/ | /onlineshop/database/subscribe.php');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(500) NOT NULL,
  `description` longtext NOT NULL,
  `category` varchar(60) NOT NULL,
  `brand` varchar(60) NOT NULL,
  `type` varchar(60) NOT NULL,
  `tag` varchar(10) NOT NULL,
  `subcategory` varchar(60) NOT NULL,
  `is_popular` enum('YES','NO','','') NOT NULL,
  `available` enum('1','0','','') NOT NULL DEFAULT '1',
  `posted_by` varchar(60) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `sold_count` int(11) NOT NULL DEFAULT 0,
  `discount` int(11) DEFAULT NULL,
  `old_price` decimal(10,0) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `description`, `category`, `brand`, `type`, `tag`, `subcategory`, `is_popular`, `available`, `posted_by`, `slug`, `sold_count`, `discount`, `old_price`, `created_at`) VALUES
(1, 'HP EliteBook X G2i', 119658.97, '/onlineshop/images/product-images/laptops/Acer311C725Chromebook\\5255-portatil-acer-chromebook-r856lt-tco-c2nk-12-intel-n100-8gb-64gb-emmc-intel-uhd-chromeos-caracteristicas.webp', 'Intel core i7, 32GB RAM, 1TB SSD', 'laptops', 'hp', 'new', 'New', 'mini_laptops', 'YES', '1', 'snow', 'hp-elitebook-xg2i-14-ng-ai', 0, NULL, NULL, '2026-04-13 00:13:55'),
(2, '71w8RXUFhEL._AC_UY218_', 169520.75, '/onlineshop/images/product-images/audio/71w8RXUFhEL._AC_UY218_.jpg', 'Wireless sound headsets', 'audio', 'JBL', 'new', 'New', 'wireless_headphones', 'YES', '1', 'emma', 'wireless-headsets', 0, 20, 20743, '2026-04-13 00:57:17'),
(3, '61Oaa+a2j8L._AC_UL320_', 11965848.71, '/onlineshop/images/product-images/cctv/Dekto/61Oaa+a2j8L._AC_UL320_.jpg', 'Best CCT camera in town', 'cctv', 'cctv', 'trending', 'Trending', 'online-camera', 'YES', '1', 'snow', 'online-cctv-camera', 0, NULL, NULL, '2026-04-13 00:57:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `country` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  `role` enum('customer','admin','','') NOT NULL DEFAULT 'customer',
  `last_login` timestamp NULL DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_expires` timestamp NULL DEFAULT NULL,
  `is_subscribed` enum('YES','NO','','') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cart_items_cart` (`cart_id`),
  ADD KEY `fk_cart_items_product` (`product_id`);

--
-- Indexes for table `email_subscriptions`
--
ALTER TABLE `email_subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `client_email` (`client_email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `email_subscriptions`
--
ALTER TABLE `email_subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `fk_carts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `fk_cart_items_cart` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cart_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
