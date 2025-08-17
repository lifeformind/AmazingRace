import re
from playwright.sync_api import Page, expect, sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to the frontend application
    page.goto("http://localhost:5173/")

    # The backend returns "Hello from Backend!".
    # The frontend code displays "Message from backend: {message}".
    # So we expect to find the combined string.
    expected_text = "Message from backend: Hello from Backend!"

    # Use a robust locator to find the paragraph with the message.
    # The text is inside a <p> with class "read-the-docs".
    message_paragraph = page.locator("p.read-the-docs")

    # Assert that the element is visible and contains the expected text.
    # This will wait for the fetch to complete.
    expect(message_paragraph).to_have_text(expected_text)

    # Take a screenshot to visually confirm.
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)

print("Screenshot saved to jules-scratch/verification/verification.png")
