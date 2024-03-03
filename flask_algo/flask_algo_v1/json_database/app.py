import json
from flask import Flask, request, jsonify
from flask_cors import CORS

# Constants (adjust the path as necessary)
COURSEDATA_PATH = "course_data.json"

# Utility function
def convert_time(time_string):
    time = 0
    if time_string[-2:] == 'PM' and time_string[:2] != '12':
        time += 1200
    time += (int(time_string[-4:-2]) / 60) * 100
    time += int(time_string.split(':')[0]) * 100
    return time

class Course:
    def __init__(self, course_code, course_num, section_num, days, start, end, instructor, traditional):
        self.course_code = course_code
        self.course_num = course_num
        self.section_num = section_num
        self.days = days
        self.start = start
        self.end = end
        self.instructor = instructor
        self.traditional = traditional

    def convert_start(self):
        return convert_time(self.start)

    def convert_end(self):
        return convert_time(self.end)

class Schedule:
    def __init__(self, courses, start_time, end_time):
        self.courses = courses
        self.s_start_time = start_time
        self.s_end_time = end_time
        self.score = self.calculate_score()
        self.credits = 0

    def calculate_score(self):
        days = {'M': 0, 'T': 0, 'W': 0, 'R': 0, 'F': 0}
        days_courses = {'M': [], 'T': [], 'W': [], 'R': [], 'F': []}
        for course in self.courses:
            for day in days.keys():
                if day in course.days:
                    days_courses[day].append(course.convert_start())
                    days_courses[day].append(course.convert_end())
        for day in days.keys():
            days_courses[day] = sorted(days_courses[day])
            times = days_courses[day]
            if times:
                start = convert_time(self.s_start_time) - times[0]
                if start > 0:
                    days[day] += start
                end = times[-1] - convert_time(self.s_end_time)
                if end > 0:
                    days[day] += end
                for i in range(1, len(times), 2):
                    days[day] += times[i+1] - times[i] if i+1 < len(times) else 0
        score = sum(days.values())
        return abs(score)

class Algorithm:
    def __init__(self, input_data):
        self.input_data = input_data

    def __call__(self): 
        with open(COURSEDATA_PATH) as openFile:
            courses_data = json.load(openFile)
        courses = self.create_courses(courses_data)
        best = self.get_best_schedule(self.input_data, courses)
        return json.dumps(self.convert_to_json(best))

    @staticmethod
    def parse_input(req):
        if not isinstance(req, dict):
            req = json.loads(req)
        return (req["requested_courses"], bool(req["traditional"]), bool(req["rate"]),
                req["start"], req["end"], int(req["num"]))

    @staticmethod
    def get_possible_courses(courses, requested_courses, *args):
        possible_courses = [course for requested_course in requested_courses
                            for course in courses if requested_course.split(' ')[:2] == [course.course_code, str(course.course_num)]]
        return possible_courses

    @staticmethod
    def create_combos(input_data, courses):
        requested_courses, traditional, rate, start, end, num = Algorithm.parse_input(input_data)
        possible_courses = Algorithm.get_possible_courses(courses, requested_courses, traditional, rate, start, end, num)
        combos = [[f_course, s_course] for i, f_course in enumerate(possible_courses[:-1]) for s_course in possible_courses[i + 1:]]
        return combos, start, end

    def create_schedules(self, input_data, courses):
        combos, start, end = self.create_combos(input_data, courses)
        return [Schedule(combo, start, end) for combo in combos]

    def best_schedule(self, input_data, courses):
        schedules = self.create_schedules(input_data, courses)
        return min(schedules, key=lambda s: s.score)

    def get_best_schedule(self, input_data, courses):
        return self.best_schedule(input_data, courses)

    @staticmethod
    def create_courses(course_json):
        return [Course(course["course_code"], int(course["course_number"]), int(course["section"]),
                       course["schedule"].split(' ')[0], course["schedule"].split(' ')[1], course["schedule"].split(' ')[-1],
                       course["instructor"], course["traditional"] == 'Traditional')
                for course in course_json if course["schedule"]]

    @staticmethod
    def convert_to_json(schedule):
        courses = [{"course_code": c.course_code, "course_num": c.course_num, "section_num": c.section_num,
                    "days": c.days, "start_time": c.start, "end_time": c.end, "instructor": c.instructor,
                    "traditional": c.traditional} for c in schedule.courses]
        return {'courses': courses}

app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])
def process_request():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400
    required_fields = ["requested_courses", "traditional", "rate", "start", "end", "num"]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": "Missing required fields", "missing": missing_fields}), 400
    algorithm = Algorithm(data)
    result = algorithm()
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
