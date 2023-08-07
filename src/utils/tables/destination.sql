CREATE TABLE IF NOT EXISTS destination (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(500) NOT NULL,
    country VARCHAR(150) NOT NULL,
    city VARCHAR(150),
    imageUrl VARCHAR(1000)
);