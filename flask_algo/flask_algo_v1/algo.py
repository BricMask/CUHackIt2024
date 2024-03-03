import json
from .course import Course
from .schedule import Schedule
from .config import COURSEDATA_PATH

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
        # Further processing to generate combinations
        return combos, start, end

    @staticmethod
    def find_duplicates(combo, combos, num):
        # Logic to find duplicates and conflicting schedules
        return combos, num + 1

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
