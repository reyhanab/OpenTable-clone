from app.models import db, Saved, environment, SCHEMA


saved = [
    {
        "user_id":1 ,
        "restaurant_id":1,
    },
    {
        "user_id":1 ,
        "restaurant_id":2,
    },
    {
        "user_id":2 ,
        "restaurant_id":2,
    }

]


# Adds a demo user, you can add other users here if you want
def seed_saved():

    db.session.add_all([Saved(**item) for item in saved])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_saved():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.saved RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM saved")

    db.session.commit()