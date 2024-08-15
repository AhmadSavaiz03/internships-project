from datetime import datetime


class Subscription:
    def __init__(self, user_email, roles, regions, created_at=None, updated_at=None):
        self.user_email = user_email
        self.roles = roles
        self.regions = regions
        self.created_at = created_at or datetime.now()
        self.updated_at = updated_at or datetime.now()

    def to_tuple(self):
        return (
            self.user_email,self.roles,self.regions
        )