-- Вставка 25 случайных данных в таблицу coordinates
DO $$
    DECLARE
        i INT;
    BEGIN
        FOR i IN 1..25 LOOP
                INSERT INTO public.coordinates (x, y)
                VALUES (
                           random() * 180 - 90,        -- случайное значение для широты
                           (random() * (650 - 100) + 100)::integer  -- случайное значение для долготы в пределах от -650 до 650
                       );
            END LOOP;
    END $$;

-- Вставка 25 случайных данных в таблицу house с id от 1 до 25
DO $$
    DECLARE
        i INT;
    BEGIN
        FOR i IN 1..25 LOOP
                INSERT INTO public.house (name, year, number_of_flats_on_floor)
                VALUES (
                           'House ' || i,
                           (random() * (2024 - 1900) + 1900)::bigint,
                           (random() * 10 + 1)::integer
                       );
            END LOOP;
    END $$;

-- Вставка 25 случайных данных в таблицу flat с учетом перечисления furnish
DO $$
    DECLARE
        i INT;
        house_id INT;
        coordinates_id INT;
        furnish_value VARCHAR(50);
    BEGIN
        FOR i IN 1..25 LOOP
                -- house_id и coordinates_id равны i, так как записи добавляются с id от 1 до 25
                house_id := i;
                coordinates_id := i;

                -- Генерация случайного значения для furnish, выбираем одно из значений enum
                CASE
                    WHEN random() < 0.33 THEN furnish_value := 'DESIGNER';
                    WHEN random() < 0.66 THEN furnish_value := 'NONE';
                    ELSE furnish_value := 'FINE';
                    END CASE;

                INSERT INTO public.flat (
                    name, coordinates_id, creation_date, area, number_of_rooms,
                    time_to_metro, time_to_metro_walk, central_heating, furnish, house_id, price
                )
                VALUES (
                           'Flat ' || i,
                           coordinates_id,
                           CURRENT_TIMESTAMP,
                           (random() * 100 + 20)::bigint,  -- случайная площадь от 20 до 120 кв.м
                           (random() * 5 + 1)::integer,    -- случайное количество комнат от 1 до 5
                           (random() * 60 + 5)::bigint,   -- случайное время до метро транспортом от 5 до 65 минут
                           (random() * 30 + 5)::integer,  -- случайное время до метро пешком от 5 до 35 минут
                           (random() > 0.5),              -- случайное значение для central_heating (true или false)
                           furnish_value,                 -- используем сгенерированное значение для furnish
                           house_id,
                           (random() * 50000 + 10000)::integer  -- случайная цена от 10,000 до 60,000
                       );
            END LOOP;
    END $$;