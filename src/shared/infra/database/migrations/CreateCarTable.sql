CREATE TABLE IF NOT EXISTS Cars(
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  daily_rate NUMERIC,
  available BOOLEAN DEFAULT TRUE,
  license_plate VARCHAR(255),
  fine_amount NUMERIC,
  brand VARCHAR(255),
  category_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),

  FOREIGN KEY (category_id) REFERENCES categories (id)
   
)