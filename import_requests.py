import requests
import os
import logging
import sys

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

API_BASE_URL = os.getenv("API_BASE_URL_APHEX", "https://app.aphex.co/gb/v1/projects")

def get_auth_token() -> str | None:
    """Fetches Aphex auth token using client credentials."""
    url = "https://app.aphex.co/gb/v1/auth/token"
    headers = {
        "Content-Type": "application/json",
        "Accept": "*/*"
    }
    payload = {
        "clientId": "b799d03a-0aad-4e50-9d6d-ce7cf9bd0b7f",
        "clientSecret": "uqjYCKF75Q6WWvmkJqrSn9Wwvm"
    }

    logging.info(f"Requesting token from {url}")

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        data = response.json()

        token = data.get("accessToken")
        if not token:
            logging.error("No access token found in response")
            return None

        logging.info("Successfully retrieved Aphex access token")
        return token

    except requests.RequestException as e:
        logging.error(f"Failed to retrieve Aphex auth token: {e}")
        return None


def get_tasks(project_id: str, client_id: str, client_secret: str) -> list:
    """Fetches tasks for a given Aphex project."""
    base_url = f"{API_BASE_URL}/{project_id}/tasks"
    access_token = get_auth_token(client_id, client_secret)

    if not access_token:
        logging.error("Cannot fetch tasks without a valid token")
        return []

    headers = {
        "X-API-KEY": access_token,
        "Accept": "*/*"
    }

    all_tasks = []
    after = None

    try:
        while True:
            url = base_url if not after else f"{base_url}?after={after}"
            logging.info(f"Fetching: {url}")
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            data = response.json()

            tasks = data.get("results", [])
            all_tasks.extend(tasks)

            paging = data.get("paging", {})
            next_page = paging.get("next")
            if next_page and next_page.get("after"):
                after = next_page["after"]
            else:
                break

        logging.info(f"Fetched {len(all_tasks)} tasks for project {project_id}")
        return all_tasks

    except requests.RequestException as e:
        logging.error(f"Error fetching tasks for project {project_id}: {e}")
        return []


if __name__ == "__main__":
    token = get_auth_token()
    print("\n=== ACCESS TOKEN ===")
    print(token)