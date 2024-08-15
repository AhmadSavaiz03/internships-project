from datetime import datetime


class Job:
    def __init__(self, title, description, company, location, keywords, date_posted, created_at=None, updated_at=None):
        self.title = title
        self.description = description
        self.company = company
        self.location = location
        self.keywords = keywords
        self.date_posted = date_posted
        self.created_at = created_at or datetime.now()
        self.updated_at = updated_at or datetime.now()

    def to_tuple(self):
        return (
            self.title,
            self.description,
            self.company,
            self.location,
            self.keywords,
            self.date_posted,
            self.created_at,
            self.updated_at
        )
