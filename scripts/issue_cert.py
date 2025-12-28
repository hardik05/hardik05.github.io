import json
import uuid
import datetime
import sys
import os

DB_PATH = "certificates/db.json"

def load_db():
    if not os.path.exists(DB_PATH):
        return []
    with open(DB_PATH, "r") as f:
        return json.load(f)

def save_db(data):
    with open(DB_PATH, "w") as f:
        json.dump(data, f, indent=4)

def issue_certificate():
    print("--- Issue New Certificate ---")
    name = input("Student Name: ").strip()
    if not name:
        print("Name cannot be empty.")
        return

    course = "Practical Fuzzing Masterclass"
    
    today = datetime.date.today().strftime("%Y-%m-%d")
    date_str = input(f"Issue Date ({today}): ").strip() or today
    
    # Generate ID: PF-YEAR-00X
    db = load_db()
    year = date_str.split("-")[0]
    count = len([c for c in db if c["id"].startswith(f"PF-{year}")]) + 1
    cert_id = f"PF-{year}-{count:03d}"
    
    # Create Record
    record = {
        "id": cert_id,
        "name": name,
        "course": course,
        "date": date_str,
        "hash": str(uuid.uuid4()) # Internal tracking
    }
    
    db.append(record)
    save_db(db)
    
    print("\n[+] Certificate Issued Successfully!")
    print(f"ID: {cert_id}")
    print(f"URL: https://fuzzing.in/verify.html?id={cert_id}")
    print("\nDon't forget to git add, commit, and push!")

if __name__ == "__main__":
    issue_certificate()

