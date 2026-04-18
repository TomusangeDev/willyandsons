-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2026 at 12:41 PM
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

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(2, 1, '2026-04-16 20:25:59', '2026-04-16 20:25:59');

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
  `tag` varchar(10) DEFAULT NULL,
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
(5, 'HP EliteBook X G2i 14 NG AI', 19965848.71, '/onlineshop/uploads/1776377000_HP_EliteBook_X_G2i_14_NG_AI.jpg', 'Intel Core Ultra X7 358H (up to 4.8GHz Max Turbo frequency, 18 MB L3 cache, 16 cores, 16 threads)[6,7]. 32GB LPDDR5x-9600 MT/s (onboard). 1 TB PCIe Gen5NVMe M.2 SSD', 'laptops', 'hp', 'new', 'New', 'business-laptops', 'NO', '1', 'Admin', 'hp-elitebook-x-g2i-14-ng-ai', 0, 0, NULL, '2026-04-17 01:03:20'),
(6, 'DC9Lplus2P surveillance', 487226.39, '/onlineshop/uploads/1776377243_DC9Lplus2P_surveillance.jpg', 'DEKCO Wireless Security Chambers for Foreign Affairs, Solar Energy Feed, Panoramic PTZ, Automatic Movement Tracking, True 2K, Night Vision to Color, Focus, Conversation of 2', 'cctv', 'western-digital', 'new', 'New', 'security-cameras', 'NO', '1', 'Admin', 'dc9lplus2p-surveillance', 0, 0, NULL, '2026-04-17 01:07:23'),
(7, 'Samsung Galaxy A16 4G LTE', 502904.36, '/onlineshop/uploads/1776377343_Samsung_Galaxy_A16_4G_LTE.jpg', '128 GB - 4 GB International model SM-A165F/DS unlocked factory, 6.7,\" double SIM, 50 MP triple camera (case package), black', 'phones', 'samsung', 'new', 'New', 'smartphones', 'NO', '1', 'Admin', 'samsung-galaxy-a16-4g-lte', 0, 0, NULL, '2026-04-17 01:09:03'),
(8, 'Hisense Smart TV', 1299999.67, '/onlineshop/uploads/1776377461_Hisense_Smart_TV.jpg', '40-inch H4 LED series with Alexa (40H4F, 2020 model), Compatible with Alexa - Add voice control by combining with an Alexa device', 'tv', 'lg', 'new', 'New', 'smart-tv', 'NO', '1', 'Admin', 'hisense-smart-tv', 0, 0, NULL, '2026-04-17 01:11:01'),
(9, 'Dell Pro 2026 desktop', 2994880.98, '/onlineshop/uploads/1776377600_Dell_Pro_2026_desktop.jpg', '16 GB DDR5 RAM, 512GB PCIe SSD, Copilot AI, 14th generation i3-14100 processor, WiFi 6, Bluetooth, DisplayPort', 'desktops', 'dell', 'new', 'New', 'gaming-laptops', 'NO', '1', 'Admin', 'dell-pro-2026-desktop', 0, 0, NULL, '2026-04-17 01:13:20'),
(10, 'Wireless In-Ear Headphones', 169520.75, '/onlineshop/uploads/1776377788_Wireless_In_Ear_Headphones.jpg', 'IP54 and IPX2 Water Resistance, Powerful Bass and 32 Hour Battery Life in Black, Sensitivity: 100 dB, Brand Name: JBL, Colour: Black ', 'audio', 'jbl', 'new', 'New', 'headphones', 'NO', '1', 'Admin', 'wireless-in-ear-headphones', 0, 0, NULL, '2026-04-17 01:16:28'),
(11, 'Wireless Gaming-Headset', 397132.05, '/onlineshop/uploads/1776378297_Wireless_Gaming_Headset.avif', 'Corsair HS80 RGB Wireless Multi-platform Gaming-Headset PC, Mac, PS5, PS4 Carbon', 'audio', 'corsair', 'trending', 'Trending', 'wireless-earbuds', 'NO', '1', 'Admin', 'wireless-gaming-headset', 0, 0, NULL, '2026-04-17 01:24:57'),
(12, 'Samsung 870 EVO SATA III SSD 1TB', 937050.24, '/onlineshop/uploads/1776378417_Samsung_870_EVO_SATA_III_SSD_1TB.jpg', 'Internal solid state unit, PC or laptop memory update and storage for IT professionals, creators, everyday users, MZ-77E1T0B', 'storage', 'samsung', 'trending', 'Trending', 'ssd', 'NO', '1', 'Admin', 'samsung-870-evo-sata-iii-ssd-1tb', 0, 0, NULL, '2026-04-17 01:26:57'),
(13, 'Bluetooth Speaker', 514399.00, '/onlineshop/uploads/1776378522_Bluetooth_Speaker.jpg', 'Global Star Bluetooth Speaker Home Speaker GS-V65 5.1 Home Multispeaker System (1YR WRTY)', 'audio', 'sony', 'trending', 'Trending', 'wireless-earbuds', 'NO', '1', 'Admin', 'bluetooth-speaker', 0, 0, NULL, '2026-04-17 01:28:42'),
(14, 'Nacon Gaming Revolution X Unlimited', 95499.00, '/onlineshop/uploads/1776378611_Nacon_Gaming_Revolution_X_Unlimited.avif', 'PC, Xbox One S, Xbox One X, Xbox Series S, Xbox Series X', 'gaming', 'anker', 'trending', 'Trending', 'cables', 'NO', '1', 'Admin', 'nacon-gaming-revolution-x-unlimited', 0, 0, NULL, '2026-04-17 01:30:11'),
(15, 'HyperX Alloy Rise 75', 99459.99, '/onlineshop/uploads/1776378874_HyperX_Alloy_Rise_75.jpeg', 'Black, Mechanical, PCB Type:Hotswap, PlateType: Polycarbonate, PlateMountingStyle: Gasket Mount, Lifespan(Keystrokes): 80 million, Backlight: RGB(16,777,216 colors), Gamemode: YES, MediaControl: YES, CableLength: 5.6 ft, ActuationPoint: 1.8 mm', 'desktops', 'dell', 'discounted', '50% OFF', 'gaming-laptops', 'NO', '1', 'Admin', 'hyperx-alloy-rise-75', 0, 50, 198920, '2026-04-17 01:34:34'),
(16, 'Dell XPS 13 9365 Snapdragon Edition', 13456789.99, '/onlineshop/uploads/1776379202_Dell_XPS_13_9365_Snapdragon_Edition.jpg', 'Snapdragon X Elite processor, 32GB RAM, 1TB SSD, 13.4-inch 3K OLED touchscreen, ultra-thin & light design, exceptional battery life up to 27 hours', 'desktops', 'dell', 'discounted', '30% OFF', 'gaming-laptops', 'NO', '1', 'Admin', 'dell-xps-13-9365-snapdragon-edition', 0, 30, 19223986, '2026-04-17 01:40:02'),
(17, 'Google Pixel Watch 4', 567890.45, '/onlineshop/uploads/1776379312_Google_Pixel_Watch_4.jpg', 'Advanced health & fitness tracking with Fitbit, Google AI features, bright AMOLED display, up to 36-hour battery, ECG & blood oxygen monitoring, durable aluminum case.', 'power', 'anker', 'discounted', '50% OFF', 'smartphones', 'NO', '1', 'Admin', 'google-pixel-watch-4', 0, 50, 1135781, '2026-04-17 01:41:52'),
(18, 'HyperX Origins 2 65', 234567.80, '/onlineshop/uploads/1776379420_HyperX_Origins_2_65.png', 'Hot-swappable switches, 8K polling rate, customizable actuation, RGB lighting, compact 65% layout, removable inner PCB for custom housing, premium aluminum build.', 'desktops', 'dell', 'discounted', '50% OFF', 'headphones', 'NO', '1', 'Admin', 'hyperx-origins-2-65', 0, 50, 469136, '2026-04-17 01:43:40'),
(22, 'Lenovo ThinkPad X1', 1199990.00, '/onlineshop/uploads/1776382515_Lenovo_ThinkPad_X1.png', 'Intel-CoreTM Ultra 7 (series 2), 32G LPDDR5x 8533MT/s welded, double channel, GPU Intel ArcTM Xe2 with 60 TOPS SSD PCIe Gen5 of 2 TB (2280), Windows 11 Pro', 'laptops', 'lenovo', 'business', '', 'business-laptops', 'NO', '1', 'Admin', 'lenovo-thinkpad-x1', 0, 0, NULL, '2026-04-17 02:35:15'),
(23, 'Dell Pro 27 Plus Monitor', 1299999.99, '/onlineshop/uploads/1776420813_Dell_Pro_27_Plus_Monitor.png', 'A 27-inch QHD IPS display with a 2K camera, dual microphones, and built-in speakers for seamless collaboration', 'desktops', 'dell', 'office', '', 'business-laptops', 'NO', '1', 'Admin', 'dell-pro-27-plus-monitor', 0, 0, NULL, '2026-04-17 13:13:33'),
(24, 'Dell Pro Office Bundle', 844213.33, '/onlineshop/uploads/1776421426_Dell_Pro_Office_Bundle.jpg', 'A productivity-enhancing bundle featuring a wireless keyboard, mouse, 2K webcam, and AI noise-canceling headset', 'desktops', 'hp', 'office', '', 'cables', 'NO', '1', 'Admin', 'dell-pro-office-bundle', 0, 0, NULL, '2026-04-17 13:23:46'),
(25, 'Canon PIXMA TR8620a Wireless', 562796.38, '/onlineshop/uploads/1776421548_Canon_PIXMA_TR8620a_Wireless.jpg', 'A compact all-in-one printer with wireless connectivity, 5-ink system, and 4.3\" touchscreen.', 'office', 'hp', 'office', '', 'premium-laptops', 'NO', '1', 'Admin', 'canon-pixma-tr8620a-wireless', 0, 0, NULL, '2026-04-17 13:25:48'),
(26, 'HP EliteBook 8 G1iN 14 Notebook', 6200000.00, '/onlineshop/uploads/1776421784_HP_EliteBook_8_G1iN_14_Notebook.webp', 'Windows 11 ProIntel® Core™ Ultra 5 226V (up to 4.5 GHz with Intel® Turbo Boost Technology, 8 MB L3 cache, 8 cores, 8 threads)16 GB memory;512 GB SSD storage14\" diagonal', 'laptops', 'hp', 'business', '', 'business-laptops', 'NO', '1', 'Admin', 'hp-elitebook-8-g1in-14-notebook', 0, 0, NULL, '2026-04-17 13:29:44'),
(27, 'Galaxy Tab S11 Ultra', 5699740.99, '/onlineshop/uploads/1776421878_Galaxy_Tab_S11_Ultra.jpeg', 'Size (Main screen): 14.6\" (369.9mm), CPU speed: 3.73GHz, 3.3GHz, 2.4GHz, 256 GB Storage, Resolution: 13.0 MP 8.0 MP, Weight (g): 692 ', 'phones', 'samsung', 'business', '', 'tablets', 'NO', '1', 'Admin', 'galaxy-tab-s11-ultra', 0, 0, NULL, '2026-04-17 13:31:18'),
(28, 'Latitude 3140 Laptop', 1575897.40, '/onlineshop/uploads/1776421984_Latitude_3140_Laptop.jpg', 'An 11-inch durable 2-in-1 Chromebook with over 10 hours of battery life for versatile learning.', 'laptops', 'dell', 'student', '', 'premium-laptops', 'NO', '1', 'Admin', 'latitude-3140-laptop', 0, 0, NULL, '2026-04-17 13:33:04'),
(29, 'Wenger PegasusCarrying Case', 412707.34, '/onlineshop/uploads/1776422081_Wenger_PegasusCarrying_Case.jpg', 'A blue and black backpack featuring padded laptop compartment, essentials organizer, and shock-absorbing shoulder straps.', 'laptops', 'dell', 'student', '', 'premium-laptops', 'NO', '1', 'Admin', 'wenger-pegasuscarrying-case', 0, 0, NULL, '2026-04-17 13:34:41'),
(30, 'Dell EcoLoop Backpack', 112529.26, '/onlineshop/uploads/1776422192_Dell_EcoLoop_Backpack.jpg', 'A sustainably crafted backpack with recycled materials, 360º foam cushioning, and water-resistant fabric.', 'laptops', 'dell', 'student', '', 'premium-laptops', 'NO', '1', 'Admin', 'dell-ecoloop-backpack', 0, 0, NULL, '2026-04-17 13:36:32'),
(31, 'Acer 11.6\" Chromebook', 1872360.77, '/onlineshop/uploads/1776422270_Acer_11_6__Chromebook.webp', '11.6\" Display, MediaTek MT8, With a fully functional USB-C port and Wi-Fi 7 with Bluetooth 5.3, connect to multiple devices at the same time while also making full use of the integrated 720p HDR webcam for crystal clear video calls in Google Hangouts', 'laptops', 'acer', 'student', '', 'premium-laptops', 'NO', '1', 'Admin', 'acer-116-chromebook', 0, 0, NULL, '2026-04-17 13:37:50'),
(32, 'Apple iPad Air 8 (2026)', 8894567.45, '/onlineshop/uploads/1776422349_Apple_iPad_Air_8__2026_.jpg', 'M5 chip with 10-core GPU, 13-inch Liquid Retina display, 256GB base storage, ultra-thin and lightweight, Apple Pencil Pro 2 support, ideal for creatives and students.', 'phones', 'samsung', 'student', '', 'tablets', 'NO', '1', 'Admin', 'apple-ipad-air-8-2026', 0, 0, NULL, '2026-04-17 13:39:09');

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
  `password` varchar(255) NOT NULL,
  `role` enum('customer','admin','','') NOT NULL DEFAULT 'customer',
  `last_login` timestamp NULL DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_expires` timestamp NULL DEFAULT NULL,
  `is_subscribed` enum('YES','NO','','') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `country`, `password`, `role`, `last_login`, `reset_token`, `reset_expires`, `is_subscribed`, `created_at`) VALUES
(1, 'tomusangedev', 'tomusangedev@gmail.com', '0763561388', 'Uganda', '$2y$10$mqvJF3A5dLLRzHamPo0Mduou7z56DYgEhLYbx8y7.Vymj8EJBCfz6', 'admin', NULL, NULL, NULL, 'YES', '2026-04-16 23:25:59');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
