CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  password VARCHAR(255),
  email VARCHAR(255),
  driver_license VARCHAR(255),
  admin BOOLEAN DEFAULT FALSE,
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()

)