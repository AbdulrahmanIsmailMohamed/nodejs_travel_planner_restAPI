CREATE TABLE IF NOT EXISTS itinerary(
    itinerary_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    destination_id UUID NOT NULL,
    date DATE NOT NULL,
    name_of_day VARCHAR(150),
    activities JSONB,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (destination_id) REFERENCES destination (destination_id)
);