from flask import Flask, request, jsonify
from flask_algo_v1.algo import Algorithm

app = Flask(__name__)

@app.route('/api', methods=['POST'])
def process_request():
    # Parse the JSON payload
    data = request.get_json()

    # Validate the JSON payload
    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    # Ensure all required fields are in the input
    required_fields = ["requested_courses", "traditional", "rate", "start", "end", "num"]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": "Missing required fields", "missing": missing_fields}), 400

    # Initialize the Algorithm with the input JSON data
    algorithm = Algorithm(data)

    # Process the input using the Algorithm and get the result
    result = algorithm()

    # Return the result as a JSON response
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
