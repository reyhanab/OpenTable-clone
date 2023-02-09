from flask.cli import AppGroup
from .users import seed_users, undo_users
from .reservations import seed_reservations, undo_reservations
from .restaurants import seed_restaurants, undo_restaurants
from .reviews import seed_reviews, undo_reviews
from .menu_items import seed_menu_items, undo_menu_items
from .menus import seed_menus, undo_menus
from .images import seed_images, undo_images
from .saved import seed_saved, undo_saved
from .extra_restaurants import seed_extra_restaurants, undo_extra_restaurants
from app.models.db import db, environment, SCHEMA




from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.commit()
        undo_users()
    seed_users()
    # seed_restaurants()
    seed_extra_restaurants()
    seed_reservations()
    seed_menu_items()
    seed_menus()
    # seed_reviews()
    # seed_images()
    seed_saved()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_saved()
    # undo_images()
    # undo_reviews()
    undo_menus()
    undo_menu_items()
    undo_reservations()
    undo_extra_restaurants()
    # undo_restaurants()
    undo_users()
    # Add other undo functions here