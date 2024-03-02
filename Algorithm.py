import json
import Course

test_input = ('{'
              '"requested_courses": ["CPSC 1010", "CPSC 1020", "CPSC 2120"],'
              '"traditional": "True",'
              '"rate": "False",'
              '"start": "11:00",'
              '"end": "5:00",'
              '"num": "9"'
              '}')
def parse_input(input):
    req = json.loads(input)
    requested_courses = req["requested_courses"]
    traditional = bool(req["traditional"])
    rate = bool(req["rate"])
    start = req["start"]
    end = req["end"]
    num = int(req["num"])

    return requested_courses, traditional, rate, start, end, num

def get_possible_courses(input, courses):
    requested_courses, traditional, rate, start, end, credits_req = parse_input(test_input)

    possible_courses = []

    for requested_course in requested_courses:
        for course in courses:
            rc = requested_course.split(' ')

            if rc[0] == course.course_code and rc[1] == course.course_num:
                possible_courses.append(course)

    return possible_courses


def create_combos(input, courses):
    requested_courses, traditional, rate, start, end, num = parse_input(input)
    possible_courses = get_possible_courses(input, courses)

    combos = []

    for i in range(len(possible_courses[num - 2:])):
        f_course = possible_courses[i]
        for s_course in possible_courses[i:]:
            combos.append([f_course, s_course])

    for n in range(num):
        for i in range(len(possible_courses[num - n])):
            f_course = possible_courses[i]
            for s_course in combos:
                s_course.append(f_course)

    for combo in combos:
        c = combo[0]
        for i in combo[1:]:
            if c.course_code == i.course_code and c.course_num == i.course_num:
                combos.remove(combo)
            days = {'M': 0, 'T': 0, 'W': 0, 'R': 0, 'F': 0}
            for day in days.keys():
                if c.days.contains(day) and i.days.contains(day):
                    if (c.convert_start() > i.convert_end() or c.convert_end > i.convert_start) and c.convert_start < i.convert_start:
                        combos.remove(combo)
                    if (i.convert_start() > c.convert_end() or i.convert_end > c.convert_start) and i.convert_start < c.convert_start:
                        combos.remove(combo)

    return combos

def create_schedules(combos, start, end):
    schedules = []
    for combo in combos:
        s = Course.Schedule(combo, start, end)
        schedules.append(s)
def best_schedule(schedules):
    best = schedules[0]
    for s in schedules:
        if s.score < best.score:
            best = s
    return best