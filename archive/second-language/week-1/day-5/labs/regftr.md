---
track: "Second Language"
title: "Regftr"
week: 1
day: 5
type: "lab"
---

# Regftr

![](https://rlv.zcache.com.au/reduce_reuse_regift_funny_christmas_6_cm_round_badge-r9911a7f1e4874b11853faf94371908ec_k94rf_307.jpg?rlvnet=1)

An unfortunate occurrence is happening with increasing frequency. Friendships and trust are being torn asunder. The social fabric of many co-workers, friends and even families is fraying and tumbling into chaos. Too many times, gifts are regifted to the original gift-giver!

You think to yourself, there has to be a way to help! To make things better... with an app!

## Deliverables
- A Rails API App that can can do full CRUD on a single model (using POSTMAN for CREATE READ UPDATE DELETE): gifts
- A gift should have

  - a name/description
  - an estimated value
  - the event for which it was gifted
  - the name of the person who gave the item
  
  
### HFM Stretch! Test Your Understanding
- Create a custom route `/random` that chooses a gift at random and shows that gift's data and/or show page (many ways to do this) - make a button with React to see your gift!

## Set Up

Use your own data or this sample data (make sure this structure of data works!)

remember to run `rails db:create` and then go to postgres (or use Postman)

```SQL
CREATE TABLE gifts (id SERIAL, description TEXT, value MONEY, event TEXT, gift_giver VARCHAR(255));
INSERT INTO gifts (description, value, event, gift_giver) VALUES ('Office Space DVD', 4.19, 'Birthday', 'Random Coworker');
INSERT INTO gifts (description, value, event, gift_giver) VALUES ('Potpourri', 4.99, 'Christmas', 'Aunt Tilda');
INSERT INTO gifts (description, value, event, gift_giver) VALUES ('Scented Peach Candle', 9.99, 'Christmas', 'Mom');
INSERT INTO gifts (description, value, event, gift_giver) VALUES ('Vintage Snuggie', 13.79, 'Name Day', 'Weird Neighbor');
```


## Hungry for More for Regiftr
- Create a custom route `/random` that chooses a gift at random and shows that gift's data and/or show page (many ways to do this) - make a button with React to see your gift!
 - Add a second model for users and relate gifts to users.

## Hungry for More: Meta Rails App
Be the rep master!

- Make a new rails app that will help you make sense of rails: Putting things in your own words, however fuzzy, can help you put all the pieces together
- Make a single model that has at least:
  - title/name (file name? gem name?)
  - type ( folder, gem, file, other)
  - A description of what it is/what it does, links to references
  - your current understanding rating 1 - 5

### Rep Master Feeling Famished? H4M for Meta Rails
- Add another model conventions
- what are the rules of rails? When does something need to be singlular? capital? plural? camelcase? When is it single quotes? Double quotes?
The model should have at least
  - convention
  - further description
