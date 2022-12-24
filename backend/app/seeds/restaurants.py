from app.models import db, Restaurant, environment, SCHEMA

restaurants = [
    {
        #1
        "name":"Black Rock",
        "description":"Black Rock Bar & Grill, an award winning steakhouse specializing in certified angus beef steaks served on a sizzling stone. Due to our high volume and traffic, we cannot hold tables for parties like a reservation system. We have a system called Priority Seating. This system secures a table within our restaurant, however, it does not guarantee an exact seat by time. Priority is placed on your party, and if we are on a wait, your party is placed on top of the wait list as a priority. We will seat you as fast as possible, but cannot guarantee an exact time. If the restaurant is not busy, we will seat the party upon arrival.",
        "type":"Steakhouse",
        "city":"Utica",
        "address":"12515 Hall Rd, Utica, MI 48315",
        "phone_number":"(586)765-4321",
        "rating":4.5,
        "capacity":20,
        "lat":42.62791074578997,
        "lng":-83.00381527246627,
        "preview_image":"https://resizer.otstatic.com/v2/photos/wide-huge/3/49675557.png"
    },
    {
        #2
        "name":"Kona Grill",
        "description":"Welcome to Kona Grill Troy, a top restaurant and sushi bar in Detroit where you can enjoy a local paradise. Fresh, wild caught fish is used to craft award-winning sushi, while contemporary American entrees are prepared from scratch in-house. Happy hour on the beautiful, shaded patio overlooking the plaza fountain is a must. And don’t leave until you’ve tried one of the handcrafted cocktails, ice cold draft beer, or a glass of wine selected from the extensive drink menu. The restaurant’s diverse menu and contemporary ambience provide the perfect venue for special occasions like bridal showers, baby showers, birthday celebrations, business meetings, date night, or just any occasion really.",
        "type":"Contemporary American",
        "city":"Troy",
        "address":"30 E Big Beaver Road, Troy, MI 48083",
        "phone_number":"(586)987-5678",
        "rating":4.2,
        "capacity":20,
        "lat":42.561880022953204,
        "lng":-83.14689190130257,
        "preview_image":"https://resizer.otstatic.com/v2/photos/wide-huge/3/50237353.jpg"
    },
    {
        #3
        "name":"Uno Pizzeria and Grill",
        "description":"In 1943, on the corner of Ohio and Wabash in downtown Chicago, Uno Founders, Ike Sewell and Ric Riccardo, created the original and legendary Chicago Style Deep Dish Pizza. They combined authentic Italian recipes with the finest meats, spices, vegetables and cheeses and baked them in a unique and delicious deep dish crust, creating a hearty pizza like no other. Today, Uno’s Deep Dish Pizza is still made as it was then, with dough made fresh daily, hand stretched and covered with meats, hand-cut vegetables and freshly shredded mozzarella cheese. We put that same attention to detail in all our menu items, including pasta, salads, burgers, steaks and seafood and our new Love All, Feed All™ menu – which includes our 600-calorie-or-less Uno De-Lites, as well as our Gluten-Sensitive, Carb-Conscious, Vegetarian and Vegan offerings. So come by and let us help you create memories with your family and friends at Uno.",
        "type":"Pizzeria",
        "city":"Novi",
        "address":"37529 Grand River Ave, Farmington Hills, MI 48335",
        "phone_number":"(248)653-6067",
        "rating":3.9,
        "capacity":10,
        "lat":42.466699151568505,
        "lng":-83.41850145453826,
        "preview_image":"https://resizer.otstatic.com/v2/photos/wide-huge/3/47846417.png"
    },
    {
        #4
        "name":"Robusto's Cigar Bar & Bistro",
        "description":"Welcome to Robusto's Cigar Bar and Bistro. Robusto's offers its patrons a unique sanctuary where you can escape and indulge in all of life's guilty pleasures in one single place. Curated by Certified Sommelier, Harry Bahri, Robusto's offers an eclectic selection of fine cigars, rare spirits and exceptional wines to satisfy even the most discerning palate. Every effort is placed to create a progressive and innovative menu by our Executive Chef, Kevin Walters, daily.We encourage you to come in, allow us to cater to you and help find your inner Zen.",
        "type":"American",
        "city":"Sterling Heights",
        "address":"12170 Hall Rd, Sterling Heights, MI 48313",
        "phone_number":"(586)999-8488",
        "rating":4.6,
        "capacity":20,
        "lat":42.62579174581694,
        "lng":-83.00727316251715,
        "preview_image":"https://resizer.otstatic.com/v2/photos/wide-huge/1/25728878.jpg"
    },
    {
        #5
        "name":"Benihana",
        "description":"Welcome to Benihana in Troy, Michigan, where you'll find a dining experience unlike any other! Our guests are seated at communal hibachi grill tables in groups, where your personal chef will perform the ancient art of Teppanyaki. Watch as we slice and dice, preparing a meal that will dazzle your eyes as well as your taste buds. Benihana Troy is located on Big Beaver Road, between Crooks Road and Coolidge Highway near the Somerset Collection and Somerset Park Golf Course. Our parking and entrance are located in the back of the building. Join us in our bar and lounge for Happy Hour, Monday-Thursday from 5-7 p.m. and Friday from 4-7 pm. An 18% service charge is added to all guest checks for parties of eight or more. This service charge will be paid directly to the employees who provided service to you. Reservations are only available in the teppan area.",
        "type":"Japanese",
        "city":"Troy",
        "address":"1985 W. Big Beaver Road, Troy, MI 48084",
        "phone_number":"(586)965-8763",
        "rating":3.7,
        "capacity":20,
        "lat": 42.5616057486121,
        "lng": -83.17356344348369,
        "preview_image":"https://resizer.otstatic.com/v2/photos/wide-huge/2/28602660.jpg"
    },
    {
        #6
        "name":"D.PRIME Steakhouse",
        "description":"D.PRIME was crafted with a downtown vibe in mind. Featuring a modern twist on flame-grilled steaks and seafood, signature cocktails and a fresh atmosphere, this contemporary, upscale restaurant and lounge is an original take on what a Detroit steakhouse should be. Must be 21 and over to enter our casino restaurant property. Dress Code: Smart Casual. No baseball caps, beach sandals or men's tank tops.",
        "type":"Steakhouse",
        "city":"Detroit",
        "address":"1777 Third Street, Detroit, MI 48226",
        "phone_number":"(586)543-5412",
        "rating":4.7,
        "capacity":10,
        "lat": 42.333794781995195,
        "lng": -83.05917192998314,
        "preview_image":"https://resizer.otstatic.com/v2/photos/xlarge/1/23702311.jpg"
    },
    {
        #7
        "name":"Bakersfield",
        "description":"Serving up authentic, Mexican street fare, and a selection of over 100 tequilas and American whiskeys. Bakersfield is a spot where the food is simple, the service is warm and the atmosphere is alive. We do offer a heated outdoor dining experience during the winter months. These tables are located in a covered and enclosed tent with heaters spread throughout. We recommend dressing warmly if the temperatures outside are below 40 degrees.",
        "type":"Mexican",
        "city":"Detroit",
        "address":"3100 Woodward Ave, Detroit, MI 48201",
        "phone_number":"(313)974-7040",
        "rating":4.6,
        "capacity":15,
        "lat": 42.35061035430013,
        "lng": -83.05419790209463,
        "preview_image":"https://resizer.otstatic.com/v2/photos/wide-huge/1/25231446.jpg"
    },
     {
        #8
        "name":"Cooper's Hawk Winery & Restaurant",
        "description":"Cooper's Hawk Winery & Restaurant combines modern, casual dining with award-winning, handcrafted wines. Our menu features fresh contemporary-American fare infused with flavors from around the world. From appetizers to desserts, each dish on our menu is listed with a bin number to help guide you to your selection's perfect wine match. In addition to dining, Cooper's Hawk offers a full-service bar, private party spaces, and Napa-style tasting room with specialty gift store, where guests can enjoy sipping and sampling wines in a traditional winery setting. Sourcing the highest quality grapes from the best vineyards around the world has earned Cooper's Hawk a growing list of more than 200 wine awards.",
        "type":"Winery",
        "city":"Clinton Township",
        "address":"17440 Hall Rd, Ste 105, Clinton Township, MI 48038",
        "phone_number":"(586)464-9463",
        "rating":4.7,
        "capacity":15,
        "lat": 42.62624724869001,
        "lng": -82.94440606327649,
        "preview_image":"https://resizer.otstatic.com/v2/photos/wide-huge/3/30044784.jpg"
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