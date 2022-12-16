from app.models import db, Review, environment, SCHEMA


reviews = [
    {
        "user_id":1 ,
        "restaurant_id":1,
        "rating":4,
        "review":"Good restaurant",
        "edited":False
    },
    {
        "user_id":1 ,
        "restaurant_id":2,
        "rating":4.5,
        "review":"Great restaurant",
        "edited":False
    },
    {
        "user_id":2 ,
        "restaurant_id":2,
        "rating":4.5,
        "review":"Nice restaurant",
        "edited":False
    }

]


# Adds a demo user, you can add other users here if you want
def seed_reviews():

    db.session.add_all([Review(**review) for review in reviews])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()