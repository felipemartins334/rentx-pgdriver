CREATE TABLE IF NOT EXISTS specifications_cars(
  id UUID PRIMARY KEY,
  car_id UUID,
  specification_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),

  FOREIGN KEY(car_id) REFERENCES cars(id) ON DELETE CASCADE,
  FOREIGN KEY(specification_id) REFERENCES specifications(id) ON DELETE SET NULL

)