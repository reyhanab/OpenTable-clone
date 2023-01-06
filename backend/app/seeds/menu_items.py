from app.models import db, Menu_item, environment, SCHEMA


menu_items = [
    {
        #1 #lunch
        "name":"Arancini",
        "description":"Italian rice balls, prosciutto, asiago and tomato sauce",
        "price":11
    },
    {
        #2 #lunch
        "name":"Calamari Fritti",
        "description":"Seasoned calamari, lemon, caper and white wine sauce",
        "price":14
    },
    {
        #3 #lunch
        "name":"Burrata Caprese",
        "description":"Burrata mozzarella, vine ripened tomatoes, torn basil, EVOO and balsamic glaze",
        "price":12
    },
    {
        #4 #lunch
        "name":"Mussels",
        "description":"Steamed with garlic, tomatoes, white wine and crostini",
        "price":13
    },
    {
        #5 #lunch
        "name":"Tenderloin Tips",
        "description":"Angus steer tenderloin, roasted mushroom, gorgonzola cheese, chop house onion and Filippa's zip sauce",
        "price":15
    },
    {
        #6 #lunch
        "name":"Sausage & Peppers",
        "description":"Sautéed banana peppers, sausage, sliced potatoes, olive oil and parsley",
        "price":13
    },
    {
        #7 #Dinner
        "name":"Tenderloin Tips",
        "description":"Angus steer tenderloin, roasted mushroom, gorgonzola cheese, chop house onion and Filippa's zip sauce",
        "price":15
    },
    {
        #8 #Dinner
        "name":"Escargot",
        "description":"Garlic, butter, parsley, wine and parmigiana",
        "price":13
    },
    {
        #9 #Dinner
        "name":"Shrimp alla Filippa's",
        "description":"Sauteed in olive oil and garlic, tomato, red pepper flakes, white wine",
        "price":15
    },
    {
        #10 #Dinner
        "name":"Cocktail de Gamberi",
        "description":"Poached colossal shrimp served with cocktail sauce and lemon",
        "price":14
    },
    {
        #11 #Dinner
        "name":"Spinach & Artichoke Dip",
        "description":"Baby spinach, cream cheese, artichokes and parmesan cheese. Served with pita chips",
        "price":12
    },
    {
        #12 #Dinner
        "name":"Stuffed Portobello",
        "description":"Roasted portobello mushroom, caramelized onion, spinach, roma tomatoes and mozzarella",
        "price":12
    }

]


# Adds a demo user, you can add other users here if you want
def seed_menu_items():

    db.session.add_all([Menu_item(**menu_item) for menu_item in menu_items])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_menu_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menu_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM menu_items")

    db.session.commit()