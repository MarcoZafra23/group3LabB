from app import app
from models.db import db
from models.user_model import User
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from datetime import date

def seed_data():
    with app.app_context():
        try:
            print("Starting database seeding...")

            seed_users = [
                User(
                    fname = "Admin",
                    lname = "A.",
                    uname = "admin",
                    email = "admin@example.com",
                    pass_word = generate_password_hash("admin123"),
                    student_id="GRP301",
                    birthday=date(2005, 5, 23),
                    gender="Male",
                    phone_number="123-456-7890",
                    address="123 Admin Way"
                ),
                    User(
                    fname = "Juan",
                    lname = "Dela Cruz",
                    uname = "JuanDC",
                    email = "Juan@example.com",
                    pass_word = generate_password_hash("password123"),
                    student_id="GRP302",
                    birthday=date(2005, 12, 21),
                    gender="Male",
                    phone_number="098-765-4321",
                    address="456 Juan St."
                    )
            ]

            for user in seed_users:
                existing_user = User.query.filter_by(email=user.email).first()
                if existing_user:
                    print(f"Skipping existing user: {user.email}")
                    continue
                db.session.add(user)
                
                db.session.commit()
                print("Database seeding completed successfully.")

        except IntegrityError as e:
            db.session.rollback()
            print(f"Integrity Error during seeding: {e}")
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"SQLAlchemy Error during seeding: {e}")
        except Exception as e:
            db.session.rollback()
            print(f"Unexpected error during seeding: {e}")

        finally:
            db.session.close()
if __name__ == "__main__":
    seed_data()