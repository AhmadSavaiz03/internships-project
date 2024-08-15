from selenium import webdriver
from bs4 import BeautifulSoup
# from selenium.webdriver.chrome.service import Service

# service = Service("path to chrome driver")


def get_driver(website):
    # Options to make browsing easier
    options = webdriver.ChromeOptions()
    options.add_argument("disable-infobars")
    options.add_argument("start-maximized")
    options.add_argument("disable-dev-shm-usage")
    options.add_argument("no-sandbox")
    options.add_argument("disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])

    driver = webdriver.Chrome(options)
    driver.get(website)
    return driver


def scrape():
    driver = get_driver("http://automated.pythonanywhere.com")
    element = driver.find_element(by="xpath", value="/html/body/div[1]/div/h1[1]")
    return element.text





if __name__ == "__main__":
    print(scrape())