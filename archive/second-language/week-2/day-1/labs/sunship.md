---
track: "Second Language"
title: "Sunship.io"
week: 2
day: 1
type: "lab"
---


# Sunship.io

<br>
<br>
<br>


## Where the sun is free, the fun is rented, and the memories are forever

<br>
<br>
<br>


![](https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/USRC_Salmon_P_Chase_-_LoC_4a25817u.jpg/440px-USRC_Salmon_P_Chase_-_LoC_4a25817u.jpg)

<br>
<br>
<br>


### Rails API Planning Lab

<br>
<br>
<br>

##### DATA-MODELING AND DESIGNING AN API

In this course, we stay indoors, we don't interact with the outside world much, and we jump into stuff without much planning.

Let's try to change one of those things today!

We'll create an ERD (Entity Relationship Diagram).

This activity is recommended to be done in pairs.

Here is an example
![](https://www.researchgate.net/profile/Waheed_Iqbal/publication/283635381/figure/fig1/AS:294185682518019@1447150740787/EERD-of-Telemedicine-Web-Service.png)

[source](https://www.researchgate.net/figure/EERD-of-Telemedicine-Web-Service_fig1_283635381)

Each table is represented as a rectangle, there a multiple lines connecting the tables, which represent relationships

Here is a really nice key (but note, there are a lot of different flavors to these symbols)
![](https://cacoo.com/wp-app/uploads/2018/05/ER-notation-1.png)

[source](https://cacoo.com/blog/er-diagrams-vs-eer-diagrams-whats-the-difference/)

You can draw one:
- on paper
- on a whiteboard
- with an app

Recommended whiteboard app: [WebWhiteboard.com](https://www.webwhiteboard.com)

Considerations:

[resource](https://www.lucidchart.com/pages/enhanced-entity-relationship-diagram#discovery__top)

Is your data
- Stable? Will it support business needs?
- Has breadth? Can all the data be stored in an organized way?
- Is the model as simple as possible?
- Can it be reorganized (relatively) easily?
- Can both creators and users understand what is going on?


### The Business
#### Outdoor Equipment Rentals

We want to create the api for an outdoor rental business

Let's think about some the data we may need just to get you started.

As you build out your ERD, you may want to add, remove and change what is here, depending on how you end up visualizing this business

- customers
  - name
  - address
  - membership (trial, single, family, corporate discount)

- store locations
  - address
  - staff
  - equipment on hand

- staff info
  - you've got this!

-  rental
    - staffer who made the transaction
    - customer
    - inventory
    - rental start
    - rental end

- equipment
  - type (water, winter etc.)
  - store location
  - is rented?
  - condition (new, excellent, fair - maybe a photo for insurance purposes?)
  - level of insurance required to rent
  - recommended additional equipment (ie if kayak, then life vest, oars, first aid kit, roof rack....)
  - cost to rent
  - how many people to use it (single, pair, group...)
  - experience level (novice, expert)
  - cost to replace
  - brand


[inspiration/resource](https://www.visual-paradigm.com/guide/data-modeling/what-is-entity-relationship-diagram/)


Finally, find another person/group to share your ERD and talk through each of your versions. Note any things you may have missed or could have done differently.
