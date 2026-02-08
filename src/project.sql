-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2026 at 09:52 AM
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
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `booked_seats`
--

CREATE TABLE `booked_seats` (
  `id` int(11) NOT NULL,
  `booking_id` varchar(20) NOT NULL,
  `seat_number` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` varchar(20) NOT NULL,
  `bus_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `booking_date` date NOT NULL,
  `status` varchar(20) NOT NULL,
  `passenger_name` varchar(100) NOT NULL,
  `contact_number` varchar(15) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `buses`
--

CREATE TABLE `buses` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `min_price` decimal(10,2) NOT NULL,
  `max_price` decimal(10,2) NOT NULL,
  `total_seats` int(11) NOT NULL,
  `seats_available` int(11) NOT NULL DEFAULT 0,
  `rating` decimal(3,1) DEFAULT 0.0,
  `company` varchar(100) NOT NULL,
  `bus_number` varchar(20) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

--
-- Dumping data for table `buses`
--

INSERT INTO `buses` (`id`, `name`, `type`, `min_price`, `max_price`, `total_seats`, `seats_available`, `rating`, `company`, `bus_number`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Sajilo Deluxe', 'Luxury Sofa', 1500.00, 4500.00, 30, 25, 4.5, 'Sajilo Safar', 'BA 1 PA 1234', 'Premium luxury bus with sofa seats, serving all major routes', '2026-02-08 06:16:58', '2026-02-08 06:16:58'),
(2, 'Pokhara Express', 'VIP AC', 1200.00, 1800.00, 35, 10, 4.2, 'Greenline Tours', 'GA 2 KHA 5678', 'Express service between Kathmandu and Pokhara', '2026-02-08 06:16:58', '2026-02-08 06:16:58'),
(3, 'Chitwan Safari', 'Tourist Bus', 1100.00, 1600.00, 40, 30, 4.0, 'Jungle Tours', 'CH 3 PA 9012', 'Wildlife-themed tourist bus for Chitwan routes', '2026-02-08 06:16:58', '2026-02-08 06:16:58'),
(4, 'Night Rider', 'Sleeper', 2200.00, 6500.00, 30, 15, 4.7, 'Eastern Express', 'KK 4 BA 3456', 'Overnight sleeper bus for long-distance routes', '2026-02-08 06:16:58', '2026-02-08 06:16:58'),
(5, 'Buddha Express', 'Deluxe', 1800.00, 3200.00, 32, 20, 4.3, 'Buddha Travels', 'LU 5 PA 7890', 'Premium deluxe bus serving all Lumbini and general routes', '2026-02-08 06:16:58', '2026-02-08 06:16:58'),
(6, 'Mountain View', 'Semi-Deluxe', 1300.00, 1800.00, 36, 28, 4.1, 'Mountain Express', 'PK 6 KHA 2345', 'Economical semi-deluxe for Pokhara routes', '2026-02-08 06:16:58', '2026-02-08 06:16:58'),
(7, 'East-West Special', 'AC Deluxe', 2000.00, 5500.00, 35, 12, 4.4, 'Eastern Express', 'KO 1 KHA 8899', 'Special AC deluxe for East-West corridor routes', '2026-02-08 06:16:58', '2026-02-08 06:16:58'),
(8, 'Wildlife Express', 'Tourist AC', 1100.00, 1600.00, 30, 15, 4.2, 'Jungle Tours', 'NA 4 KHA 1122', 'AC tourist bus specializing in wildlife destination routes', '2026-02-08 06:16:58', '2026-02-08 06:16:58'),
(9, 'Peace Travel', 'Luxury Sofa', 1900.00, 3500.00, 28, 20, 4.6, 'Buddha Travels', 'LU 2 KHA 3344', 'Luxury sofa bus with premium amenities for all routes', '2026-02-08 06:16:58', '2026-02-08 06:16:58'),
(10, 'Kathmandu Express', 'Super Deluxe', 1850.00, 4500.00, 32, 25, 4.5, 'Sajilo Safar', 'BA 5 KHA 5566', 'Super deluxe bus serving all routes to Kathmandu', '2026-02-08 06:16:58', '2026-02-08 06:16:58');

-- --------------------------------------------------------

--
-- Table structure for table `bus_amenities`
--

CREATE TABLE `bus_amenities` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus_amenities`
--

INSERT INTO `bus_amenities` (`id`, `name`, `description`) VALUES
(1, 'wifi', 'Free WiFi available'),
(2, 'ac', 'Air conditioning'),
(3, 'toilet', 'Onboard toilet'),
(4, 'charging', 'Seat charging ports'),
(5, 'water bottle', 'Complimentary water bottle'),
(6, 'dinner stop', 'Scheduled dinner stop'),
(7, 'blanket', 'Complimentary blanket');

-- --------------------------------------------------------

--
-- Table structure for table `bus_has_amenities`
--

CREATE TABLE `bus_has_amenities` (
  `bus_id` int(11) NOT NULL,
  `amenity_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus_has_amenities`
--

INSERT INTO `bus_has_amenities` (`bus_id`, `amenity_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 2),
(2, 3),
(2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `bus_route_pricing`
--

CREATE TABLE `bus_route_pricing` (
  `id` int(11) NOT NULL,
  `bus_id` int(11) NOT NULL,
  `route_id` int(11) NOT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bus_rules`
--

CREATE TABLE `bus_rules` (
  `id` int(11) NOT NULL,
  `bus_id` int(11) NOT NULL,
  `rule_key` varchar(50) NOT NULL,
  `rule_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`rule_value`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus_rules`
--

INSERT INTO `bus_rules` (`id`, `bus_id`, `rule_key`, `rule_value`) VALUES
(1, 2, 'allowedDestinations', '[\"Pokhara\"]'),
(2, 3, 'allowedDestinations', '[\"Chitwan\"]'),
(3, 4, 'allowedTypes', '[\"overnight\"]');

-- --------------------------------------------------------

--
-- Table structure for table `bus_seat_configuration`
--

CREATE TABLE `bus_seat_configuration` (
  `id` int(11) NOT NULL,
  `bus_id` int(11) NOT NULL,
  `seat_type` varchar(20) NOT NULL,
  `seat_numbers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`seat_numbers`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bus_seat_configuration`
--

INSERT INTO `bus_seat_configuration` (`id`, `bus_id`, `seat_type`, `seat_numbers`) VALUES
(1, 1, 'premium', '[1, 2]'),
(2, 1, 'sofa', '[3, 4, 5, 6, 7, 8, 9, 10]'),
(3, 1, 'window', '[1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29]'),
(4, 1, 'aisle', '[2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30]'),
(5, 2, 'premium', '[1, 2]'),
(6, 2, 'window', '[1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29, 32, 33]'),
(7, 2, 'aisle', '[2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35]');

-- --------------------------------------------------------

--
-- Table structure for table `bus_service_areas`
--

CREATE TABLE `bus_service_areas` (
  `id` int(11) NOT NULL,
  `bus_id` int(11) NOT NULL,
  `service_area` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `region` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `region`, `is_active`) VALUES
(1, 'Kathmandu', 'Hilly', 1),
(2, 'Pokhara', 'Hilly', 1),
(3, 'Chitwan', 'Terai', 1),
(4, 'Kakarvitta', 'Terai', 1),
(5, 'Lumbini', 'Terai', 1),
(6, 'Janakpur', 'Terai', 1),
(7, 'Biratnagar', 'Terai', 1),
(8, 'Butwal', 'Terai', 1);

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `id` int(11) NOT NULL,
  `from_city_id` int(11) NOT NULL,
  `to_city_id` int(11) NOT NULL,
  `distance_km` decimal(6,2) DEFAULT NULL,
  `travel_time_hours` decimal(4,1) DEFAULT NULL,
  `route_type` varchar(20) DEFAULT NULL,
  `direction` varchar(50) DEFAULT NULL,
  `region` varchar(50) DEFAULT NULL,
  `is_popular` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`id`, `from_city_id`, `to_city_id`, `distance_km`, `travel_time_hours`, `route_type`, `direction`, `region`, `is_popular`, `is_active`) VALUES
(1, 1, 2, NULL, NULL, 'standard', 'Center-West', 'Hilly', 1, 1),
(2, 1, 3, NULL, NULL, 'standard', 'Center-South', 'Terai', 1, 1),
(3, 1, 4, NULL, NULL, 'overnight', 'East-West', 'Terai', 0, 1),
(4, 2, 1, NULL, NULL, 'standard', 'West-Center', 'Hilly', 1, 1),
(5, 3, 1, NULL, NULL, 'standard', 'South-Center', 'Hilly', 0, 1),
(6, 4, 1, NULL, NULL, 'overnight', 'East-West', 'Hilly', 0, 1),
(7, 1, 5, NULL, NULL, 'standard', 'Center-South', 'Terai', 1, 1),
(8, 5, 1, NULL, NULL, 'standard', 'South-Center', 'Hilly', 0, 1),
(9, 1, 6, NULL, NULL, 'standard', 'Center-South', 'Terai', 0, 1),
(10, 6, 1, NULL, NULL, 'standard', 'South-Center', 'Hilly', 0, 1),
(11, 2, 3, NULL, NULL, 'standard', 'West-South', 'Terai', 1, 1),
(12, 3, 2, NULL, NULL, 'standard', 'South-West', 'Hilly', 0, 1),
(13, 1, 7, NULL, NULL, 'overnight', 'East-West', 'Terai', 0, 1),
(14, 7, 1, NULL, NULL, 'overnight', 'East-West', 'Hilly', 0, 1),
(15, 1, 8, NULL, NULL, 'standard', 'Center-West', 'Terai', 0, 1),
(16, 8, 1, NULL, NULL, 'standard', 'West-Center', 'Hilly', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `is_verified` tinyint(1) DEFAULT 0,
  `is_admin` tinyint(1) DEFAULT 0,
  `role` varchar(20) DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `is_active`, `is_verified`, `is_admin`, `role`, `created_at`, `updated_at`, `last_login`) VALUES
('', 'Pujan Joshi', 'pujanjoci2@gmail.com', '$2y$10$kDRv.7xPaDAb6Fjo7NWtJ.qmLllD.OAWzBBQkj6FE8Ni4ML7hUaUS', '9860928584', 1, 0, 1, 'admin', '2026-02-08 02:25:47', '2026-02-08 08:16:22', NULL),
('user_6988499a061fd6.16809931', 'Test', 'test@test.com', '$2y$10$iId59CbVPuDezZMM644eMOxo1PW.qfIDQc/Sn75aHTd/N3rRLJOuq', '9800000000', 1, 0, 0, 'user', '2026-02-08 03:45:18', '2026-02-08 03:45:18', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booked_seats`
--
ALTER TABLE `booked_seats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_booking_seat` (`booking_id`,`seat_number`),
  ADD KEY `idx_booking_id` (`booking_id`),
  ADD KEY `idx_seat_number` (`seat_number`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_bus_id` (`bus_id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_booking_date` (`booking_date`);

--
-- Indexes for table `buses`
--
ALTER TABLE `buses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bus_number` (`bus_number`),
  ADD KEY `idx_company` (`company`),
  ADD KEY `idx_type` (`type`),
  ADD KEY `idx_rating` (`rating`),
  ADD KEY `idx_seats_available` (`seats_available`);

--
-- Indexes for table `bus_amenities`
--
ALTER TABLE `bus_amenities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `bus_has_amenities`
--
ALTER TABLE `bus_has_amenities`
  ADD PRIMARY KEY (`bus_id`,`amenity_id`),
  ADD KEY `amenity_id` (`amenity_id`);

--
-- Indexes for table `bus_route_pricing`
--
ALTER TABLE `bus_route_pricing`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_bus_route` (`bus_id`,`route_id`),
  ADD KEY `idx_bus_id` (`bus_id`),
  ADD KEY `idx_route_id` (`route_id`);

--
-- Indexes for table `bus_rules`
--
ALTER TABLE `bus_rules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_bus_id` (`bus_id`),
  ADD KEY `idx_rule_key` (`rule_key`);

--
-- Indexes for table `bus_seat_configuration`
--
ALTER TABLE `bus_seat_configuration`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_bus_seat_type` (`bus_id`,`seat_type`),
  ADD KEY `idx_bus_id` (`bus_id`),
  ADD KEY `idx_seat_type` (`seat_type`);

--
-- Indexes for table `bus_service_areas`
--
ALTER TABLE `bus_service_areas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_bus_id` (`bus_id`),
  ADD KEY `idx_service_area` (`service_area`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `idx_region` (`region`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_route_pair` (`from_city_id`,`to_city_id`),
  ADD KEY `idx_from_city` (`from_city_id`),
  ADD KEY `idx_to_city` (`to_city_id`),
  ADD KEY `idx_route_type` (`route_type`),
  ADD KEY `idx_is_popular` (`is_popular`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_phone` (`phone`),
  ADD KEY `idx_is_active` (`is_active`),
  ADD KEY `idx_is_admin` (`is_admin`),
  ADD KEY `idx_role` (`role`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booked_seats`
--
ALTER TABLE `booked_seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `buses`
--
ALTER TABLE `buses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bus_amenities`
--
ALTER TABLE `bus_amenities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `bus_route_pricing`
--
ALTER TABLE `bus_route_pricing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bus_rules`
--
ALTER TABLE `bus_rules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bus_seat_configuration`
--
ALTER TABLE `bus_seat_configuration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `bus_service_areas`
--
ALTER TABLE `bus_service_areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booked_seats`
--
ALTER TABLE `booked_seats`
  ADD CONSTRAINT `booked_seats_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bus_has_amenities`
--
ALTER TABLE `bus_has_amenities`
  ADD CONSTRAINT `bus_has_amenities_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bus_has_amenities_ibfk_2` FOREIGN KEY (`amenity_id`) REFERENCES `bus_amenities` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bus_route_pricing`
--
ALTER TABLE `bus_route_pricing`
  ADD CONSTRAINT `bus_route_pricing_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bus_route_pricing_ibfk_2` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bus_rules`
--
ALTER TABLE `bus_rules`
  ADD CONSTRAINT `bus_rules_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bus_seat_configuration`
--
ALTER TABLE `bus_seat_configuration`
  ADD CONSTRAINT `bus_seat_configuration_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bus_service_areas`
--
ALTER TABLE `bus_service_areas`
  ADD CONSTRAINT `bus_service_areas_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `routes`
--
ALTER TABLE `routes`
  ADD CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`from_city_id`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `routes_ibfk_2` FOREIGN KEY (`to_city_id`) REFERENCES `cities` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
