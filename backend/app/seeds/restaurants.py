from app.models import db, Restaurant, environment, SCHEMA

restaurants = [
    {
        "name":"Black Rock",
        "description":"Black Rock Bar & Grill, an award winning steakhouse specializing in certified angus beef steaks served on a sizzling stone. Due to our high volume and traffic, we cannot hold tables for parties like a reservation system. We have a system called Priority Seating. This system secures a table within our restaurant, however, it does not guarantee an exact seat by time. Priority is placed on your party, and if we are on a wait, your party is placed on top of the wait list as a priority. We will seat you as fast as possible, but cannot guarantee an exact time. If the restaurant is not busy, we will seat the party upon arrival.",
        "type":"Steakhouse",
        "city":"Utica",
        "address":"12515 Hall Rd, Utica, MI 48315",
        "phone_number":"5867654321",
        "rating":4.5,
        "capacity":20,
        "lat":42.62791074578997,
        "lng":-83.00381527246627,
        "preview_image":"https://resizer.otstatic.com/v2/photos/wide-huge/3/49675557.png"
    },
    {
        "name":"Kona Grill",
        "description":"Welcome to Kona Grill Troy, a top restaurant and sushi bar in Detroit where you can enjoy a local paradise. Fresh, wild caught fish is used to craft award-winning sushi, while contemporary American entrees are prepared from scratch in-house. Happy hour on the beautiful, shaded patio overlooking the plaza fountain is a must. And don’t leave until you’ve tried one of the handcrafted cocktails, ice cold draft beer, or a glass of wine selected from the extensive drink menu. The restaurant’s diverse menu and contemporary ambience provide the perfect venue for special occasions like bridal showers, baby showers, birthday celebrations, business meetings, date night, or just any occasion really.",
        "type":"Contemporary American",
        "city":"Troy",
        "address":"30 E Big Beaver Road, Troy, MI 48083",
        "phone_number":"5869875678",
        "rating":4.2,
        "capacity":20,
        "lat":42.561880022953204,
        "lng":-83.14689190130257,
        "preview_image":"https://resizer.otstatic.com/v2/photos/wide-huge/3/50237353.jpg"
    }
]


# Adds a demo user, you can add other users here if you want
def seed_restaurants():

    db.session.add_all([Restaurant(**restaurant) for restaurant in restaurants])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM restaurants")

    db.session.commit()