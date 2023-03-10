---
track: "Second Language"
title: "Intro to Relational Databases and SQL"
week: 1
day: 1
type: "lecture"
---

# Intro to Relational Databases and SQL


# Prerequisites

- A working **[PostgreSQL](https://www.postgresql.org/)** installation.

**To Install on Mac**
- `brew doctor`
- `brew update`
- In your command-line run the command: `brew install postgresql`
- On Macs you can run `brew services list` to see if PostgreSQL is running.
- `brew services start postgresql`
- You will most likely get an error here
- `createdb [your username]` Your username needs to be the username that appears in the error above. It needs to be exactly the same.


## Objectives

By the end of this, developers should be able to:

- Create a database table
- Insert a row or rows into a database table
- Retrieve a row or rows from a database table
- Modify a database table after creation
- Update a row or rows in a database table
- Delete a row or rows from a database table


## Introduction

Why are we talking about SQL?

Most applications need a [data store](https://en.wikipedia.org/wiki/Data_store) to persist important information. A relational database is the most common datastore for a web application. SQL is the language of relational databases.

At it's simplest, a relational database is a mechanism to store and retrieve data in a tabular form.

Spreadsheets are a good analogy. Individual sheets as tables and the whole spreadsheet as a database. See **[this link](https://docs.google.com/spreadsheets/d/1cxuXsPMNvpXHGPlyN9aPl_nebbnDlQGieZXVBrrm1PU/edit?usp=sharing)** for an example.

Why is this important?

Database tables are a good place to store key/value pairs, as long as the values are simple types (e.g. string, number). The keys are the column names and the values are stored in each row. Column names and their corresponding data in each row maps well to simple JSON objects. A group of rows from one table maps well to a JSON array.

What about more complicated data?

Database tables can reference other tables which allows arbitrary nesting of groups of simple types. This is something we'll be looking at more closely later.

### Relational Database Management System ([RDBMS](http://en.wikipedia.org/wiki/Relational_database_management_system))

A **[Database Server](http://upload.wikimedia.org/wikipedia/commons/5/57/RDBMS_structure.png)** is a set of processes and files that manage the databases that store the tables. 

Sticking with our previous analogy a database server would map to Google Sheets.

### Verb Equivalence

**[CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete)**
_(create, read, update and delete)_, SQL, HTTP, and Rails Controller action.

| CRUD   | SQL    | HTTP   | action     |
|:-------|:-------|:-------|:-----------|
| Create | INSERT | POST   | create     |
| Read   | SELECT | GET    | index/show |
| Update | UPDATE | PATCH  | update     |
| Delete | DELETE | DELETE | destroy    |

## PostgreSQL

We'll be using **[PostgreSQL](https://www.postgresql.org/)**, a popular open source database server, which should already be installed on your computer.

_On Macs_ you can run `brew services list` to see if PostgreSQL is running.

- If the server isn't running, `status` not `started`, please start it using
  `brew services start postgresql`.

_On Linux_ `service --status-all | grep postgresql` to check if it's running.
(it will return [ + ] if it's running and [ - ] if it's not.

- To start it if it's not running, do `sudo service postgresql start`.

**When should I use SQL or NoSQL**
[SQL vs NoSQL](https://medium.com/@jon.perera/sql-vs-nosql-a-beginners-guide-f80991f76a4b)



## SQL's Big Gotcha

SQL statements require being ended with a `;`

Most of your postgres prompts will look like this

<img src="https://i.imgur.com/vnBsiJo.png" alt="sql" width="100"/>


If you forget  your semi-colon, the prompt will drop to the next line and change slightly

<img src="https://i.imgur.com/1dAwOJT.png" alt="sql" width="400"/>


You must add a semi-colon to end your statement

<img src="https://i.imgur.com/L9OBfRv.png" alt="sql" width="100"/>


## SQL Syntax

Even though keywords in SQL are not case sensitive, the convention is to capitalize them.

```sql
-- correct
SELECT * FROM actors;

-- incorrect
select * from actors;
```

Notice, comments can be new line or after a line and they start with two dashes `--`

## Create a Database

Like MongoDB, Postgres has "sub-databases":

```SQL
-- create the sub database foo
CREATE DATABASE foo;

-- drop it
DROP DATABASE foo;

-- get started with our code along
CREATE DATABASE test_db;

-- connect to the test_db sub database
\connect test_db;

-- OR (does the same thing as connect, just shorthand)
\c test_db;
```

## Data types

Postgres has the following data types (most common):

1. `int` - whole number
1. `decimal` - float/decimal
1. `bool` - boolean
1. `varchar(n)` - small text
1. `text` - large text
1. `timestamp` - date


#### Extra
[Hello, I'm Mr. Null. My Name Makes Me Invisible to Computers](https://www.wired.com/2015/11/null/)

## Create a table

- Instead of collections, we have tables, which are just like a spreadsheet, or grid.  Rows are entries, and columns are properties of each row.
- Unlike MongoDB, you have to tell Postgres to specify each column and what is the data type for each column.  It's very 'strict'

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

-- select all rows from the actors table where the name column is set to 'Tala'. You will need to use only single quotes.
SELECT * FROM actors WHERE first_name = 'Tala';

-- select all rows from the actors table where the name column is set to 'tala' or 'Tala' or 'TALA' (case insensitive. 
SELECT * FROM actors WHERE first_name ILIKE 'Tala';

-- select all rows from the actors table where the name column contains 'Mel'. The % in this statment is a wildcard character used to represent a zero or more characters. [Wildcard Characters](https://www.w3schools.com/sql/sql_wildcards.asp)
SELECT * FROM actors WHERE first_name LIKE '%Mel%';

-- select all rows from the actors table where the name column is set to 'Melissa' AND the email column is set to McCarthy
SELECT * FROM actors WHERE first_name = 'Melissa' AND last_name = 'McCarthy';

-- select all rows from the actors table where either the first_name column is set to 'Ramonoa' OR the email column is set to last_name is equal to 'Ford'
SELECT * FROM actors WHERE first_name = 'Ramona' OR last_name = 'Ford';

-- select all rows from the actors table where the height column is set to 180
SELECT * FROM actors WHERE height = 180;

-- select all rows from the actors table where the height column is not set to 180
SELECT * FROM actors WHERE height != 180;

-- select all rows from the actors table where the height column is greater than 165
SELECT * FROM actors WHERE height > 165;

 -- select all rows from the actors table where the height column is less than 165
SELECT * FROM actors WHERE height < 165;

-- select all rows from the actors table where the height column is greater than or equal to 165
SELECT * FROM actors WHERE height <= 165;

-- select all rows from the actors table where the height column is less than or equal to 165
SELECT * FROM actors WHERE height >= 165;

-- select all rows from the actors table where the height column has no value
SELECT * FROM actors WHERE height IS NULL;

-- select all rows from the actors table where the height column has any value
SELECT * FROM actors WHERE height IS NOT NULL; 
```

## Update the table

```sql
-- update the actors table.  Set the height column to 181 for every row that has the id column set to 2
UPDATE actors SET height = 181 WHERE id = 2;
```

## Delete from table

```sql
 -- delete all rows from the actors table that have the id column set to 19
DELETE FROM actors WHERE id = 19;
```


<hr>

## Additional Resources
- [SQL Tutorial](https://www.dofactory.com/sql/tutorial)
- [Select Star SQL](https://selectstarsql.com/)

#### Extra
- It is [ACID-compliant](https://en.wikipedia.org/wiki/ACID_(computer_science)) and [transactional](https://en.wikipedia.org/wiki/Transaction_processing)


