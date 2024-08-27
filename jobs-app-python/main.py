from scrapers.github_scraper import process_jobs_from_github
from scrapers.scraper1 import scrape as scrape_source1
from email.email_sender import send_emails

def run_initial_population():
    """Run the initial population of the jobs database using all available scrapers."""
    print("Starting initial database population...")
    github_url = "https://github.com/SimplifyJobs/Summer2025-Internships"
    process_jobs_from_github(github_url)
    scrape_source1()
    print("Initial population completed.")

def run_daily_updates():
    """Run daily updates to scrape new jobs and send out email notifications."""
    print("Starting daily update...")
    github_url = "https://github.com/SimplifyJobs/Summer2025-Internships"
    process_jobs_from_github(github_url)
    scrape_source1()
    send_emails()
    print("Daily update completed.")

if __name__ == "__main__":
    # Choose the action: either initial population or daily updates
    action = input("Enter 'initial' to run the initial population or 'daily' to run daily updates: ").strip().lower()

    if action == 'initial':
        run_initial_population()
    elif action == 'daily':
        run_daily_updates()
    else:
        print("Invalid option. Please enter 'initial' or 'daily'.")
