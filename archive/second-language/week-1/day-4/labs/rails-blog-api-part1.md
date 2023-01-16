---
track: "Second Language"
title: "Rails Blog API"
week: 1
day: 4
type: "lab"
---


# Rails Blog API

* Make a new Rails app called `blog_app_api`
* Remember the `--api` flag. If you forget, **delete this app and start over**
* Remember the `-d postgresql`. If you forget, **delete this app and start over**
* Remember the `--skip-git`. If you forget, **delete this app and start over**
* Create the db
* Generate a migration for creating a table called **posts**.
* In the migration file, a todo table should have columns for title and content (all strings)
* Run the migration.
* Check the schema, and check the database:

`schema.rb` correct result:

```rb
ActiveRecord::Schema.define(version: 2019_05_21_175748) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.string "content"
  end

end
```
In `rails dbconsole`

`SELECT * FROM posts;`

Correct result:

![](https://i.imgur.com/EohuWRb.png)

**Now play around with Active record!** Use commands to create, find, update and destroy some blog posts
