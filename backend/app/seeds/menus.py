from app.models import db, Menu, environment, SCHEMA

menus = [
    {
        #1
        "restaurant_id":1,
        "menu_item_id":1,
        "type":"lunch"
    },
    {
        #2
        "restaurant_id":1,
        "menu_item_id":2,
        "type":"lunch"
    },
    {
        #3
        "restaurant_id":1,
        "menu_item_id":3,
        "type":"lunch"
    },
    {
        #4
        "restaurant_id":2,
        "menu_item_id":4,
        "type":"lunch"
    },
    {
        #5
        "restaurant_id":2,
        "menu_item_id":5,
        "type":"lunch"
    },
    {
        #6
        "restaurant_id":3,
        "menu_item_id":6,
        "type":"lunch"
    },
    {
        #7
        "restaurant_id":1,
        "menu_item_id":7,
        "type":"dinner"
    },
    {
        #8
        "restaurant_id":1,
        "menu_item_id":8,
        "type":"dinner"
    },
    {
        #9
        "restaurant_id":1,
        "menu_item_id":9,
        "type":"dinner"
    },
    {
        #10
        "restaurant_id":2,
        "menu_item_id":10,
        "type":"dinner"
    },
    {
        #11
        "restaurant_id":2,
        "menu_item_id":11,
        "type":"dinner"
    },
    {
        #12
        "restaurant_id":2,
        "menu_item_id":12,
        "type":"dinner"
    }
]


# Adds a demo user, you can add other users here if you want
def seed_menus():

    db.session.add_all([Menu(**menu) for menu in menus])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_menus():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menus RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM menus")

    db.session.commit()