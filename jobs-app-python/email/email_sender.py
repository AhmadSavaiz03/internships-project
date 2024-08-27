import yagmail
from database.db_operations import get_new_jobs, get_subscriptions
from config import EMAIL_USER, EMAIL_PASSWORD
import datetime
import logging

logging.basicConfig(filename='email_sender.log', level=logging.INFO, format='%(asctime)s %(message)s')

def send_emails():
    try:
        yag = yagmail.SMTP(EMAIL_USER, EMAIL_PASSWORD)
        last_check_time = datetime.datetime.now() - datetime.timedelta(hours=12)
        new_jobs = get_new_jobs(last_check_time)

        subscriptions = get_subscriptions()
        for subscription in subscriptions:
            user_email = subscription.user_email
            roles = subscription.roles
            regions = subscription.regions

            matching_jobs = [
                job for job in new_jobs
                if any(role in job.keywords for role in roles) and job.location in regions
            ]

            if matching_jobs:
                contents = "New job postings matching your subscriptions:\n\n"
                for job in matching_jobs:
                    contents += f"Title: {job.title}\nDescription: {job.description}\nCompany: {job.company}\nLocation: {job.location}\nKeywords: {', '.join(job.keywords)}\nDate Posted: {job.date_posted}\n\n"
                yag.send(
                    to=user_email,
                    subject="New Job Postings",
                    contents=contents
                )
                logging.info(f"Sent email to {user_email}")

    except Exception as e:
        logging.error(f"Error sending emails: {e}")

if __name__ == "__main__":
    send_emails()
