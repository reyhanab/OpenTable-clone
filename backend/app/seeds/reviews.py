from app.models import db, Review, environment, SCHEMA


reviews = [
    {
        "user_id":1 ,
        "restaurant_id":1,
        "rating":4,
        "review":"Food is excellent. Service is great. Atmosphere is modern yet comfortable. Highly recommend!",
        "edited":False
    },
    {
        "user_id":1 ,
        "restaurant_id":2,
        "rating":4.5,
        "review":"I am very sensitive to gluten and I had so many options and a wonderful meal including dessert and bread! The rest of my family had a wonderful meal too! We will be back!",
        "edited":False
    },
    {
        "user_id":2 ,
        "restaurant_id":2,
        "rating":4.5,
        "review":"Food was fabulous as usual. The waitress was not very friendly and rushed us through the night. She seemed annoyed with us. Had very little patience. It was really noisy in the restaurant as well.",
        "edited":False
    },
    {
        "user_id":1 ,
        "restaurant_id":3,
        "rating":3.5,
        "review":"Enjoyed the dinner and service. Andrea the manager was very helpful as well. We just by chance ended up eating there twice in one weekend both dinners were great.",
        "edited":False
    },
    {
        "user_id":1,
        "restaurant_id":4,
        "rating":4.5,
        "review":"Food and service were excellent, definitely recommended",
        "edited":False
    },
     {
        "user_id":1 ,
        "restaurant_id":5,
        "rating":3.5,
        "review":"Yummy fresh scratch kitchen food!!!",
        "edited":False
    },
    {
        "user_id":1,
        "restaurant_id":6,
        "rating":4.5,
        "review":"Everything very good but noise level is soooooo loud",
        "edited":False
    },
     {
        "user_id":1,
        "restaurant_id":7,
        "rating":4.5,
        "review":"Food and service were excellent, definitely recommended",
        "edited":False
    },
     {
        "user_id":1 ,
        "restaurant_id":8,
        "rating":3.5,
        "review":"Yummy fresh scratch kitchen food!!!",
        "edited":False
    },
    {
        "user_id":1,
        "restaurant_id":1,
        "rating":4.5,
        "review":"Everything very good but noise level is soooooo loud",
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