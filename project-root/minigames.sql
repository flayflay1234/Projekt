-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Maj 25, 2025 at 09:41 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `minigames`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cps_scores`
--

CREATE TABLE `cps_scores` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `score` float NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cps_scores`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `multiplication_scores`
--

CREATE TABLE `multiplication_scores` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `score` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `multiplication_scores`
--


-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `number_guess_scores`
--

CREATE TABLE `number_guess_scores` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `score` int(11) NOT NULL,
  `difficulty` varchar(10) NOT NULL DEFAULT 'easy'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `number_guess_scores`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `reaction_scores`
--

CREATE TABLE `reaction_scores` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `score` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reaction_scores`
--

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `cps_scores`
--
ALTER TABLE `cps_scores`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `multiplication_scores`
--
ALTER TABLE `multiplication_scores`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `number_guess_scores`
--
ALTER TABLE `number_guess_scores`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `reaction_scores`
--
ALTER TABLE `reaction_scores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cps_scores`
--
ALTER TABLE `cps_scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `multiplication_scores`
--
ALTER TABLE `multiplication_scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `number_guess_scores`
--
ALTER TABLE `number_guess_scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `reaction_scores`
--
ALTER TABLE `reaction_scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
