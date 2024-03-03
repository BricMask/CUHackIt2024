from .utils import convert_time

class Schedule:
    def __init__(self, courses, start_time, end_time):
        self.courses = courses
        self.s_start_time = start_time
        self.s_end_time = end_time
        self.score = self.calculate_score()
        self.credits = 0


    def calculate_score(self):
        days = {'M' : 0, 'T': 0, 'W' : 0, 'R' : 0, 'F' : 0}
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

                for i in range(len(times[2:])):
                    days[day] += times[i] - times[i - 1]
        score = 0
        for day in days.keys():
            score += days[day]
        # for course in self.courses:
        #     school = ratemyprofessor.get_school_by_name("Clemson University")
        #     rating =  ratemyprofessor.get_professor_by_school_and_name(school, course.instructor[-1:]).rating
        #
        #     if rating:
        #         rating = abs(rating - 5)
        #     else:
        #         rating = 2
        #
        #     score += 50 * rating

        return abs(score)
