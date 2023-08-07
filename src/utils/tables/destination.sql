CREATE TABLE IF NOT EXISTS destination (
    destination_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(500) NOT NULL,
    country VARCHAR(150) NOT NULL,
    city VARCHAR(150),
    image_url VARCHAR(1000),
    user_id UUID,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);