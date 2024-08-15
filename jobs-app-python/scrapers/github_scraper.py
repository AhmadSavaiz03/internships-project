from bs4 import BeautifulSoup
import requests
import pandas as pd


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
                if idx == 0:  # Assuming the company name is always in the first column
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

        # Extract the main text content
        paragraphs = soup.find_all(['p', 'div', 'li', 'ul', 'span'])
        job_description = " ".join([para.get_text(strip=True) for para in paragraphs if para.get_text(strip=True)])

        return job_description
    except Exception as e:
        print(f"Failed to retrieve job description from {url}: {e}")
        return None

def add_job_descriptions(df):
    job_descriptions = []
    for link in df['Application/Link']:
        if link:
            job_description = extract_job_description(link)
            job_descriptions.append(job_description)
        else:
            job_descriptions.append(None)
    df['Job Description'] = job_descriptions
    return df


url = "https://github.com/SimplifyJobs/Summer2025-Internships"
raw_df = github_scrape(url)
link_list = raw_df['Application/Link'].tolist()
print(extract_job_description(link_list[0]))

# df = add_job_descriptions(raw_df)
# print(df)


# 'Company', 'Role', 'Location', 'Application/Link', 'Date Posted'