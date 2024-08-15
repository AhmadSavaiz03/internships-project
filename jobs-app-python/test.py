import database.db_operations as db


subs = db.get_subscriptions()
for sub in subs:
    print(sub.to_tuple())