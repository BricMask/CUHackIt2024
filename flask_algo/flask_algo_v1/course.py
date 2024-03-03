from .utils import convert_time

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