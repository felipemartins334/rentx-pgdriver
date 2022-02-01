CREATE TABLE IF NOT EXISTS specifications (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);