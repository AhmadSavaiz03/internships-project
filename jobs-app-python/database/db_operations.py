import logging
from database.db_config import get_db_connection
from models.job import Job
from models.subscription import Subscription


logging.basicConfig(filename='db_operations.log', level=logging.INFO, format='%(asctime)s %(message)s')


def insert_job(job):
    """Inserts a job into the jobs table."""
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO jobs (title, description, company, location, keywords, date_posted, created_at, updated_at) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
        """, job.to_tuple())
        job_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        logging.info(f"Inserted job with ID: {job_id}")
        return job_id
    except Exception as e:
        logging.error(f"Error inserting job: {e}")
        if conn:
            conn.rollback()
        raise
    finally:
        if conn:
            conn.close()


def get_new_jobs(last_check_time):
    """Fetches new jobs added or updated since the last check time."""
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT id, title, description, company, location, keywords, date_posted 
            FROM jobs 
            WHERE created_at > %s OR updated_at > %s;
        """, (last_check_time, last_check_time))
        rows = cur.fetchall()
        cur.close()
        new_jobs = [Job(*row[1:]) for row in rows]  # Exclude 'id' from the tuple
        return new_jobs
    except Exception as e:
        logging.error(f"Error fetching new jobs: {e}")
        raise
    finally:
        if conn:
            conn.close()


def get_subscriptions():
    """Fetches all subscriptions with their roles and regions."""
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT s.user_email, array_agg(DISTINCT sr.role), array_agg(DISTINCT sr2.region)
            FROM subscriptions s
            LEFT JOIN subscription_roles sr ON s.id = sr.subscription_id
            LEFT JOIN subscription_regions sr2 ON s.id = sr2.subscription_id
            GROUP BY s.user_email;
        """)
        rows = cur.fetchall()
        cur.close()
        subscriptions = [Subscription(row[0], row[1], row[2]) for row in rows]
        return subscriptions
    except Exception as e:
        logging.error(f"Error fetching subscriptions: {e}")
        raise
    finally:
        if conn:
            conn.close()
