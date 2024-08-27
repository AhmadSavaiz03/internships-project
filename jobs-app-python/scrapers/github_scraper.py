from bs4 import BeautifulSoup
import requests
import pandas as pd
from models.job import Job
from database.db_operations import insert_job
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk import FreqDist
import string

def github_scrape(url):
    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.content, 'html.parser')

    container = soup.find('article', class_='markdown-body entry-content container-lg')
    table = container.find('table')

    headers = []
    for th in table.find_all('th'):
        headers.append(th.text.strip())

    rows = []
    for tr in table.find_all('tr'):
        cells = tr.find_all('td')
        if len(cells) > 0:
            row = []
            for idx, cell in enumerate(cells):
                if idx == 0:
                    company_name = cell.get_text(strip=True)
                    row.append(company_name)
                else:
                    link = cell.find('a')
                    if link:
                        row.append(link.get('href'))
                    else:
                        row.append(cell.text.strip())
            rows.append(row)

    df = pd.DataFrame(rows, columns=headers)
    return df

def extract_job_description(url):
    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'html.parser')
        paragraphs = soup.find_all(['p', 'div', 'li', 'ul', 'span'])
        job_description = " ".join([para.get_text(strip=True) for para in paragraphs if para.get_text(strip=True)])
        return job_description
    except Exception as e:
        print(f"Failed to retrieve job description from {url}: {e}")
        return None

def extract_keywords(text):
    stop_words = set(stopwords.words('english'))
    tokens = word_tokenize(text)
    tokens = [word for word in tokens if word.isalnum()]
    tokens = [word for word in tokens if word.lower() not in stop_words]
    tokens = [word for word in tokens if word.lower() not in string.punctuation]
    freq_dist = FreqDist(tokens)
    return list(freq_dist.keys())[:10]  # Return the top 10 keywords

def process_jobs_from_github(url):
    df = github_scrape(url)
    for index, row in df.iterrows():
        job_description = extract_job_description(row['Application/Link'])
        if job_description:
            keywords = extract_keywords(job_description)
            job = Job(
                title=row['Role'],
                description=job_description,
                company=row['Company'],
                location=row['Location'],
                keywords=keywords,
                date_posted=None 
            )
            insert_job(job)

url = "https://github.com/SimplifyJobs/Summer2025-Internships"
process_jobs_from_github(url)
