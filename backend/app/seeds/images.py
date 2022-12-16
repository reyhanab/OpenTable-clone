from app.models import db, Image, environment, SCHEMA


images = [
    {
        "restaurant_id":1,
        "url":"https://resizer.otstatic.com/v2/photos/xlarge/2/49679278.jpg"
    },
     {
        "restaurant_id":1,
        "url":"https://resizer.otstatic.com/v2/photos/xlarge/2/49679276.png"
    },
     {
        "restaurant_id":1,
        "url":"https://resizer.otstatic.com/v2/photos/xlarge/2/49675695.jpg"
    },
    {
        "restaurant_id":2,
        "url":"https://resizer.otstatic.com/v2/photos/xlarge/2/28109382.jpg"
    },
    {
        "restaurant_id":2,
        "url":"https://resizer.otstatic.com/v2/photos/xlarge/2/47150640.jpg"
    },
    {
        "restaurant_id":2,
        "url":"https://resizer.otstatic.com/v2/photos/xlarge/2/47150642.jpg"
    }

]


# Adds a demo user, you can add other users here if you want
def seed_images():

    db.session.add_all([Image(**image) for image in images])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")

    db.session.commit()