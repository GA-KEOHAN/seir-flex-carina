---
track: "Second Language"
title: "SQL and Bit.io"
week: 21
day: 1
type: "lecture"
---

## What is a Relational Database

A relational database tracks structured data as tables and rows. Let's unpack this.

- Structured Data - Data with a defined schema/shape

- Tables are a collection of rows (a row is like a mongo documents) with the fields being the columns.

Because of the nature of this structure it is possible to track the relationship between data in different tables, thus the term, relational database.

There are many different relational databases:

- SQLite
- Postgres
- MySQL
- MariaDB
- Many More

## SQL- Structured Query Language

Over the years relational databases developed a standard language for expressing queries called SQL. Generally, all relational databases support SQL although there is minor differences in how each of them uses SQL the vast majority of it is uniform making it easy to try different databases using the same language.

## Getting our own database

In the same way Mongo.com allowed us to have a Document database hosted for us we can use in our Apps, Bit.io can provide us an easy to use postgres database for our applications.

- Head over to bit.io
- Login with your github credentials
- create a new database called whatever you like

Once your database is created you'll be on a screen where you can enter SQL queries on the right and run them.

## SQL's Big Gotcha

SQL statements require being ended with a `;`

Most of your postgres prompts will look like this

![](https://i.imgur.com/vnBsiJo.png)

If you forget  your semi-colon, the prompt will drop to the next line and change slightly

![](https://i.imgur.com/1dAwOJT.png)

You must add a semi-colon to end your statement

![](https://i.imgur.com/L9OBfRv.png)

## SQL Syntax

Even though keywords in SQL are not case sensitive, the convention is to capitalize them.

```sql
-- correct
SELECT * FROM actors;

-- incorrect
select * from actors;
```

Notice, comments can be new line or after a line and they start with two dashes `--`

## Data types

Postgres has the following data types (most common):

1. int - whole number
1. decimal - float/decimal
1. bool - boolean
1. varchar(n) - small text
1. text - large text
1. timestamp - date

## Create a table

- Instead of collections, we have tables, which are just like a spreadsheet, or grid.  Rows are entries, and columns are properties of each row.
- Unlike MongoDB, you have to tell Postgres, you have to specify each column and what is the data type for each column.  It's very 'strict'

```sql
-- describe your tables
CREATE TABLE foo ( name varchar(20) ); -- create a table called 'foo' with one column called 'name' which is a small text column

-- see table
\dt

-- drop a table
DROP TABLE foo;

-- 'actors' table has an id column, which is just a number that increases with each addition, and columns for first_name, last_name, height (in mm), and boolean properties for sing and dance

CREATE TABLE
  actors
  ( id serial, first_name varchar(20) NOT NULL, last_name varchar(20), height int, sings BOOLEAN, dances BOOLEAN DEFAULT false);

-- describe the columns of the test sub database  
\d actors;
```

## Insert into the table

You don't have to remember the order of the columns that you created, but you do have to match the order in the insert

```sql
INSERT INTO
  actors ( height, first_name, sings, last_name, dances )
VALUES
  ( 179 , 'Caity' , false, 'Lotz', true ); -- create a row
```

You also don't have to enter all the fields (only the ones required)

```sql
INSERT INTO actors (first_name) VALUES ('Sting');
```

Let's copy paste a few more actors so we can play around with SQL some more

```sql
INSERT INTO actors (first_name, last_name, height, sings, dances) VALUES
('Melissa', 'Benoist', 173, true, false),
('Nicole', 'Maines', 170, true, true),
('Brandon', 'Routh', 189, false, false),
('Amy Louise', 'Pemberton', 160, null, null),
('Dominic', 'Purcell', null, null, null),
('Nick', 'Zano', 183, null, null),
('Maisie', 'Richardson-Sellers', null, null, null),
('Franz', 'Drameh', 180, null, null),
('Victor', 'Garbor', null, true, null),
('Tala', 'Ashe', 168, null, null),
('Arthur', 'Darvill', null, null, null),
('Jess', 'Macallan', 175, false, true),
('Matt', 'Ryan', 180, true, true),
('Adam', 'Tsekhman', null, null, null),
('Courtney', 'Ford', 165, null, null),
('Neil', 'McDonough', null, true, true),
('Ramona', 'Young', null, null, null),
('Melissa', 'McCarthy',157, true, true),
('Jenny', 'McCarthy',null, false, false);
```

## Select from table

```sql
-- select all rows from the actors table.  display only the name column
SELECT first_name FROM actors;

 -- select all rows from the actors table.  display only the all columns
SELECT * FROM actors;

-- select all rows from the actors table where the name column is set to 'Tala'
SELECT * FROM actors WHERE first_name = 'Tala';

-- select all rows from the actors table where the name column is set to 'tala' or 'Tala' or 'TALA' (case insensitive
SELECT * FROM actors WHERE first_name ILIKE 'Tala';

-- select all rows from the actors table where the name column contains 'Mel'
SELECT * FROM actors WHERE first_name LIKE '%Mel%';

-- select all rows from the actors table where the name column is set to 'Melissa' AND the email column is set to McCarthy
SELECT * FROM actors WHERE first_name = 'Melissa' AND last_name = 'McCarthy';

-- select all rows from the actors table where either the first_name column is set to 'Ramonoa' OR the email column is set to last_name is equal to 'Ford'
SELECT * FROM actors WHERE first_name = 'Ramona' OR last_name = 'Ford';

-- select all rows from the actors table where the height column is set to 180
SELECT * FROM actors WHERE height = 180;

-- select all rows from the actors table where the height column is not set to 180
SELECT * FROM actors WHERE IS NOT height = 180;

-- select all rows from the actors table where the height column is greater than 165
SELECT * FROM actors WHERE height > 165;

 -- select all rows from the actors table where the height column is less than 165
SELECT * FROM actors WHERE height < 165;

-- select all rows from the actors table where the height column is greater than or equal to 165
SELECT * FROM actors WHERE height <= 165;

-- select all rows from the actors table where the height column is less than or equal to 165
SELECT * FROM actors WHERE height >= 165;

SELECT * FROM actors WHERE height IS NULL;

-- select all rows from the actors table where the height column has no value
SELECT * FROM actors WHERE height IS NOT NULL; -- select all rows from the actors table where the height column has any value
```

## Update the table

```sql
-- update the actors table.  Set the height column to 181 for every row that has the id column set to 2
UPDATE actors SET height = 181 WHERE id = 2;
```

## Delete from table

```sql
 -- delete all rows from the actors table that have the id column set to 21
DELETE FROM actors WHERE id = 21;
```

## Alter a table

Use `SELECT * FROM actors;` to see changes (Don't foget you can use the up arrow to re-run commands)

```sql
-- add an test string column
ALTER TABLE actors ADD COLUMN test VARCHAR(20);

-- drop the test column
ALTER TABLE actors DROP COLUMN test;

-- rename a column
ALTER TABLE actors RENAME height TO height_cm;

-- add an id column that increments with each new row
ALTER TABLE actors ADD COLUMN new_id serial PRIMARY KEY;

-- rename a table
ALTER TABLE actors RENAME TO tv_actors;
```

Use `SELECT * FROM tv_actors;` to see changes

See columns and their properties

```sql
\d+ tv_actors
```

You can't undo or rollback changes to the database (in production, be sure to have backups!)

```sql
-- rename a table back
ALTER TABLE tv_actors RENAME TO actors;
```

```sql
-- change the data type of a column
ALTER TABLE actors ALTER COLUMN height_cm TYPE decimal;
```

See columns and their properties

```sql
\d+ actors
```
## Limit

```sql
-- select all rows from actors table, but show only the first column
SELECT * FROM actors LIMIT 1;

-- select all rows from actors table, but show only one row.  Skip the first row
SELECT * FROM actors LIMIT 1 OFFSET 1;
```

## Sorting

Do not rely on the order you put things into the database. If you need a specific order, you need to explicitly code it

```sql
-- select all rows from actors table, order by name alphabetically
SELECT * FROM actors ORDER BY first_name ASC;

-- select all rows from actors table, order by name reverse alphabetically
SELECT * FROM actors ORDER BY first_name DESC;

-- select all rows from actors table, order by height_cm ascending
SELECT * FROM actors ORDER BY height_cm ASC;

-- select all rows from actors table, order by height_cm descending
SELECT * FROM actors ORDER BY height_cm DESC;
```

#### Combination

You start to combine what we've learned and start to build more complex queries

```sql
SELECT first_name, last_name FROM actors ORDER BY first_name ASC LIMIT 5 OFFSET 2;
```

## Aggregation


```sql
 -- divide all rows into groups by name.  Show the SUM of the height of each group.  Also show the name of each group
SELECT SUM(height_cm), first_name FROM actors  WHERE height_cm IS NOT NULL GROUP BY first_name;

-- divide all rows into groups by whether or not they dance.  Show the AVG of the height of each group.  Also show the dance property of each group
SELECT AVG(height_cm), dances FROM actors GROUP BY dances;

-- divide all rows into groups by whether or not the actors sing.  Show the MAX of the height of each group.  Also show the dance property of each group
SELECT MIN(height_cm), sings FROM actors GROUP BY sings;

-- divide all rows into groups by name.  Show the MIN of the height of each group.  Also show the name of each group
SELECT MAX(height_cm), dances FROM actors GROUP BY dances;

-- divide all rows into groups by height.  Show how many rows have a value in the height_cm column.  Also show the name of each group
SELECT COUNT(height_cm), height_cm FROM actors GROUP BY height_cm ORDER BY height_cm ASC;

-- divide all rows into groups by name.  Show the number of rows in each group.  Also show the name of each group
SELECT COUNT(*), first_name FROM actors GROUP BY first_name;

 -- divide all rows into groups by height_cm.  List the names in each group and show the height_cm of each group
SELECT array_agg(first_name), height_cm FROM actors GROUP BY height_cm;
```

## Data Modeling

It's unusual to have just one table. Typically, there are many tables to represent data in a meaningful and useful way.

Let's image we are designing an ice cream manufacturing management system.

We can start by thinking of the logistics of making one type of ice cream. What kind of data would we need?

First, just the name of the ice cream: 'Plain'

'Plain' ice cream is made up of
- milk
- sugar
- cream

We then have to think of how much of each ingredient goes into a pint

|Milk|Sugar| Cream|
|:-:|:-:|:-:|
|480ml|143g| 240ml |

Since we're manufacturing lots of ice cream. It would be useful to also have data on how much of these ingredients we have on hand

|Milk|Sugar| Cream|
|:-:|:-:|:-:|
|500l|14000g| 20l |


We want to keep track of how many pints we've sold


|Flavor| Pints Sold |
|:-:|:-:|
|Plain | 543 |

And how many Pints we have on hand

|Flavor| Pints in Storage |
|:-:|:-:|
|Plain | 5500 |

We'd also want to keep track of how much money we're making and how much money we're spending to keep operations going...

Having separate tables is useful. But also being able to join our tables together and look at our data in order to analyze it would be really useful as well.

We might want to look at
- how many pints we have in storage vs sold to determine if we are making too much or too little

- do we want to branch out to more flavors and keep track of how much of each ingredient we have and if we have enough for each flavor?

- We might want to look at sales from one quarter to another

- Compare sales in different states/cities

If we're just a small company we can probably get away with using excel spreadsheets. But there is a tipping point where excel just isn't powerful/useful enough.

Splitting data across multiple tables often referred to as normalization.

## Our First Table

Let's make a table that holds important information about our ice cream.

Let's say we're ready to branch out to 5 more flavors (we are currently advertising for a marketing person to assist with better ice cream names)
- plain
- coffee
- strawberry
- peanut butter
- vanilla
- chocolate

What other info is useful? For now let's list how many pints we have in storage and whether or not the ice cream has nuts in it.

We also will add a `SERIAL PRIMARY KEY`, this means that each entry will get a unique key

(SERIAL is a pseudo datatype, which is 4 bytes and ranges from 1 to 2,147,283,647) and increments [more info](http://www.postgresqltutorial.com/postgresql-serial/).

Primary Key adds constraints (like checking that the number is unique and not null)

Everyone now:

```sql
CREATE TABLE ice_creams (id SERIAL PRIMARY KEY, name VARCHAR(144), pints INT, has_nuts BOOLEAN DEFAULT false);

INSERT INTO ice_creams (name, pints, has_nuts) VALUES
('Plain', 554, false),
('Blueberry', 821, false ),
('Strawberry', 932, false),
('Peanut Butter', 22, true),
('Vanilla', 404, false),
('Chocolate', 203, false);
SELECT * FROM ice_creams;
```

## Relational Data

Above we started to think about our ice cream manufacturing data.

What kind of relations do we need with our ice creams?

One ice cream has many plants it is manufactured in. Due to concerns about allergies (and simplicity) Each plant can only manufacture one ice cream

We could make new columns for our plants


|Flavor| Pints Sold | Plant 1| Plant 2| Plant 3|
|:-:|:-:|:-:|:-:|:-:|
|Plain | 18 | A  | B|  C |
|Chocolate | 120 |  M |  E| F |
|Blueberry | 674 |  G| S |  |
|Strawberry | 88 |  J | Q|   |
| Peanut Butter | 273 |  K |  |  |
|Vanilla | 5 |  H | N | P |
| Chocolate | 444 |  H | N | P |


We already have at least two problems:
-  as our business grows we're going to need more and more plants, will our columns expand infinitely? How would we keep them organized? What if one plant closes? Do we move the other plants in that row over?
- Where is each plant? How many pints can it generate every month? We can't add any info about our plants to this table in sensible organized way - especially when the plants can change



## One to Many Relationship

We can address our problems by making another table `plants` that holds information about our plants and has a `foreign key` the foreign key will be the `id` from our `ice_cream` table.

Our Angel investors gave us money to buy more plants where we haven't had a chance to figure out which ice cream we'll be making there.

Nevertheless **ONE** ice cream flavor will have **MANY** manufacting plants. Again, for simplicity of this example, each plant can only manufacture **ONE** flavor. 

When we create our new plants, they'll have a city (again for simplicity, but likely you'd want more information like the full address...), how many pints made, whether it has passed a food inspection, and the `id` of the ice cream flavor that it will be manufacturing.


```sql
CREATE TABLE plants (id SERIAL PRIMARY KEY, city VARCHAR(144), pints_made INT, passed BOOLEAN, ice_cream_id INT);

INSERT INTO plants (city, pints_made, passed, ice_cream_id) VALUES
('Stamford', 100, true, 1),
('Greenwich', 20, false, 2),
('Hartford', 200, true, 3),
('Waterbury', null, null, null),
('Darien', null, null, null),
('New London', 100, true, 2),
('Bridgeport', 150, true, 2),
('Milford', null, false, null),
('Norwalk', 40, true, 3),
('Hamden', null, true, null),
('New Britain', null, false, null),
('Trumbull', null, null, null),
('Danbury', 300, true, 3),
('New Canaan', null, true, null),
('Fairfield', 400, false, 4),
('Stratford', 250, true, 1);


SELECT * FROM plants;
```

Tough to read? try toggling the extended view by using `\x`

Don't want to scroll to the bottom? press `q`

## JOINS

Looking at our two tables separately doesn't really help us figure out what is going on. We want to be able to join our data together.

There are many ways to join data. A great way to start visualizing the different types of joins is with [Venn Diagrams](http://www.sql-join.com/sql-join-types)

![](https://i.imgur.com/iArb8UB.png)

**Caveat**: Many people don't like using Venn Diagrams to demonstrate joins as they are not totally accurate as to what is actually happening. There are other visualizations out there, but they are not as simple as the Venn Diagrams.
EXTRA: [more accurate representation of joins](https://blog.jooq.org/2016/07/05/say-no-to-venn-diagrams-when-explaining-joins/)


 Let's look at the ice cream being produced at plants

```sql
SELECT * FROM ice_creams JOIN plants ON plants.ice_cream_id = ice_creams.id;
```

(press q to quit out of the data view and get your prompt back)

Ok, let's look at all the ice creams, whether or not they are at a plant

```sql
SELECT * FROM ice_creams LEFT JOIN plants ON plants.ice_cream_id = ice_creams.id;
```

Let's see all the plants, whether or not they are producing any ice cream

```sql
SELECT * FROM ice_creams RIGHT JOIN plants ON ice_creams.id = plants.ice_cream_id;
```

Let's see ALL the things.

We'll see our once ice cream that's not being produced anywhere and we can see all of our plants that do not yet have a flavor to produce.


```sql
SELECT * FROM ice_creams FULL OUTER JOIN plants ON ice_creams.id = plants.ice_cream_id;
```

We're seeing a lot of extra info. We can just see the ice creams and cities by altering our query

```sql
SELECT name, city FROM ice_creams FULL OUTER JOIN plants ON ice_creams.id = plants.ice_cream_id;
```



Finally, let's look at every combination, with a cross join:

```sql
SELECT * FROM ice_creams CROSS JOIN plants; -- wow that's every row from one table multiplied by the row of every table!
```

We can use what we've learned this morning to handle our budding business.

We finally have a marketing person! They have decided that each flavor will be renamed to the city of where it was first manufactured.

So `Plain` will now be called `The Stamford`.
We'll give our ice cream two names. The `name` will be the primary marketing name. The `description` will be our old name.

Our Vanilla just won an award for `most provocative ice cream flavor of the year`! Let's give that one a name and get it into production and name it 'The Signature Connecticut'

Chocolate is still being tested by focus groups and is not yet ready for mass production.

```sql
ALTER TABLE ice_creams ADD COLUMN description TEXT;
-- update Plain to The Stamford
UPDATE ice_creams SET name = 'The Stamford', description = 'Plain' WHERE name = 'Plain';
-- update Blueberry to The Bridgeport
UPDATE ice_creams SET name = 'The Bridgeport', description = 'Blueberry' WHERE name = 'Blueberry';
-- update Strawberry to The Danbury
UPDATE ice_creams SET name = 'The Danbury', description = 'Strawberry ' WHERE name = 'Strawberry';
-- update Peanut butter to The Fairfield
UPDATE ice_creams SET name = 'The Fairfield', description = 'Peanut Butter' WHERE name = 'Peanut Butter';
-- update Vanilla to The Signature Connecticut
UPDATE ice_creams SET name = 'The Signature Connecticut', description = 'Vanilla' WHERE name = 'Vanilla';
```

Even though we made significant updates, our previous queries are still accurate.

```sql
SELECT city, name, description FROM ice_creams FULL OUTER JOIN plants ON ice_creams.id = plants.ice_cream_id;
```


### Average Pints & Berry Recalls

We can build out more advanced queries using what we've learned this morning.

For example, what if we wanted to know the average number of pints being made of our signature `The Danbury`?

```sql
SELECT
  AVG(pints)
FROM
  plants
INNER JOIN
  ice_creams
ON
 plants.ice_cream_id = ice_creams.id
WHERE
  name = 'The Danbury';
```

Or what if there is a recall on all berries! We need to find all the plants that are using berries!

```sql
SELECT
  city
FROM
  plants
INNER JOIN
  ice_creams
ON
 plants.ice_cream_id = ice_creams.id
WHERE description LIKE '%berry%';
```

### YOU DO

Write a query that will show all the cities that have not `passed` inspection