from app.models import db, Restaurant, environment, SCHEMA, Image
from .data_conversion import convert_to_data_object, add_description_to_data_object


restaurants = convert_to_data_object()
restaurants = add_description_to_data_object(restaurants)

# Adds a demo user, you can add other users here if you want
def seed_extra_restaurants():

    for restaurant in restaurants:
        photos = restaurant['photos']
        del restaurant['photos']
        current_restaurant = Restaurant(**restaurant)
        db.session.add(current_restaurant)
        db.session.commit()

        for photo in photos:
            current_restaurant.images.append(Image(url=photo))

        db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_extra_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM restaurants")

    db.session.commit()