from flask import Flask, jsonify, request

app = Flask(__name__)

# Example of a simple route
@app.route('/')
def home():
    return "Hello, World!"

# Example of an API endpoint returning JSON
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "Hello, World from Flask API!"}
    return jsonify(data)

# Example of an API endpoint that takes parameters
@app.route('/api/echo', methods=['POST'])
def echo():
    if request.is_json:
        req = request.get_json()
        response = {
            "message": "Received!",
            "yourData": req
        }
        return jsonify(response), 200
    else:
        return jsonify({"error": "Request must be JSON"}), 400

if __name__ == '__main__':
    app.run(debug=True)
