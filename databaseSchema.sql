-- SQL Database Schema for NugenCoinExchange Project

-- Users Table: Stores user information including their email and payment status
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Status VARCHAR(10) NOT NULL DEFAULT 'UNPAID',
    CHECK (Status IN ('UNPAID', 'PAID'))
);

-- Transactions Table: Stores details of each exchange transaction
CREATE TABLE Transactions (
    TransactionID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    NugenCoinsExchanged DECIMAL(18, 8) NOT NULL,
    EthereumReceived DECIMAL(18, 8) NOT NULL,
    TransactionTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- EthereumPrices Table: Stores the historical and current prices of Ethereum for reference
CREATE TABLE EthereumPrices (
    PriceID INT IDENTITY(1,1) PRIMARY KEY,
    PriceInUSD DECIMAL(18, 2) NULL,
    RecordedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ensure the database is secure by implementing encryption for sensitive information
-- Note: Actual encryption methods and practices should be implemented in the application logic
