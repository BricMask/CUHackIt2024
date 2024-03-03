from pymongo import MongoClient
from dateutil import parser
import argparse
import Algorithm
import certifi

expiry_date = '2024-03-13T00:00:00.000Z'
expiry = parser.parse(expiry_date)

def get_database():

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://jruane:l7SvaGiuY4ruhIsN@cluster0.cho2can.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['optimal_schedule']


# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":
    # Get the database
    dbname = get_database()
    collection_name = dbname["user_1_schedule"]


    parser = argparse.ArgumentParser()
    parser.add_argument("input", help="input file")
    parser.add_argument("output", help="output file")
    args = parser.parse_args()

    best = Algorithm.run_algorithm(args.input, args.output)

    collection_name.insert_one(best)