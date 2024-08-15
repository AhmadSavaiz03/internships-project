import psycopg2
from config import DB_NAME, DB_USER, DB_PASSWORD, DB_HOST


def get_db_connection():
    # Establishes a connection to the PostgreSQL database
    return psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST
    )
