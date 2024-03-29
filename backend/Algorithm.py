import json
import Course

# import ratemyprofessor

test_input = (r'{"requested_courses": ["CPSC 1010", "CPSC 1011", "GEOL 1010", "CPSC 2310", "CPSC 2120"],'
              '"traditional": "True",'
              '"rate": "False",'
              '"start": "9:00AM",'
              '"end": "6:00PM",'
              '"num": "5"'
              '}')

test_courses = []

def test():
    for i in range(3):
        test_courses.append(
            Course.Course('TEST', 1000 + 10 * (i + 1), 1, 'MWF', f'{9 + i}:00AM', f'{9 + i}:45AM', 'Brice Masek', True))
    test_courses.append(Course.Course('TEST', 1000 + 10 * (4), 1, 'MWF', f'12:00PM', f'12:45PM', 'Brice Masek', True))

    test_courses.append(
        Course.Course('TEST', 1000 + 10 * (5), 1, 'MWF', f'{1}:00PM', f'{1}:45PM', 'Brice Masek', True))


def parse_input(req):
    t = type(req)
    if t is not dict:
        req = json.loads(req)
    requested_courses = req["requested_courses"]
    traditional = bool(req["traditional"])
    rate = bool(req["rate"])
    start = req["start"]
    end = req["end"]
    num = int(req["num"])

    return requested_courses, traditional, rate, start, end, num

def get_possible_courses(courses, requested_courses, traditional, rate, start, end, credits_req):
    possible_courses = []

    for requested_course in requested_courses:
        for course in courses:
            rc = requested_course.split(' ')

            if rc[0] == course.course_code and int(rc[1]) == course.course_num:
                possible_courses.append(course)

    return possible_courses


def create_combos(input, courses):
    requested_courses, traditional, rate, start, end, num = parse_input(input)
    possible_courses = get_possible_courses(courses, requested_courses, traditional, rate, start, end, num)

    combos = []

    for i in range(len(possible_courses[:-1])):
        f_course = possible_courses[i]
        for s_course in possible_courses[i + 1:]:
            combos.append([f_course, s_course])

    temp_combos = []

    for i in range(num - 2):
        for course in possible_courses:
            for combo in combos:
                passed = True
                for c in combo:
                    if c.course_code == course.course_code and c.course_num == course.course_num:
                        passed = False

                if passed:
                    new_combo = combo.copy()
                    new_combo.append(course)
                    temp_combos.append(new_combo)
        combos = temp_combos
        temp_combos = []

    # for n in range(num - 2):
    #     for i in range(len(possible_courses)):
    #         f_course = possible_courses[i]
    #         for s_course in combos:
    #             s_course.append(f_course)
    i = 0
    while i < len(combos):
        combo = combos[i]
        combo.sort(key=lambda x: x.course_num)
        combos, i = find_duplicates(combo, combos, i)

    i, k = 0, 0
    while i < len(combos) - 1:
        while k < len(combos) - 1:
            for n in range(len(combos[0])):
                    if combos[i][n] != combos[k][n] or k == n:
                        i += 1
                        k += 1
                        break
            combos.remove(combos[k])



    return combos, start, end


def find_duplicates(combo, combos, num):
    for n in range(len(combo)):
        c = combo[n]
        for k in range(len(combo)):
            i = combo[k]
            if c.course_code == i.course_code and c.course_num == i.course_num and n != k :
                combos.remove(combo)
                return combos, num
            days = {'M': 0, 'T': 0, 'W': 0, 'R': 0, 'F': 0}
            for day in days.keys():
                if day in c.days and day in i.days:
                    if (
                            c.convert_start() > i.convert_end() or c.convert_end() > i.convert_start()) and c.convert_start() < i.convert_start():
                        combos.remove(combo)
                        return combos, num
                    if (
                            i.convert_start() > c.convert_end() or i.convert_end() > c.convert_start()) and i.convert_start() < c.convert_start():
                        combos.remove(combo)
                        return combos, num
    return combos, num + 1

def create_schedules(input, courses):
    combos, start, end = create_combos(input, courses)
    schedules = []
    for combo in combos:
        s = Course.Schedule(combo, start, end)
        schedules.append(s)
    return schedules


def best_schedule(input, courses):
    schedules = create_schedules(input, courses)
    best = schedules[0]
    for s in schedules:
        if s.score < best.score:
            best = s
    return best


def get_best_schedule(input, courses):
    return best_schedule(input, courses)


def create_courses(course_json):
    courses = []
    for course in course_json:
        course_code = course["course_code"]
        course_num = int(course["course_number"])
        section_num = int(course["section"])
        instructor = course["instructor"]
        traditional = course["traditional"]

        schedule = course["schedule"]
        if len(schedule) == 0:
            continue

        schedule = schedule.split(' ')

        start = schedule[1]
        end = schedule[-1]
        days = schedule[0]

        if traditional == 'Traditional':
            traditional = True
        else:
            traditional = False

        courses.append(Course.Course(course_code, course_num, section_num, days, start, end, instructor, traditional))

    return courses

def convert_to_json(schedule):
    courses = []

    for s_course in schedule.courses:
        course = {
            'course_code': s_course.course_code,
            'course_num': s_course.course_num,
            'section_num': s_course.section_num,
            'days': s_course.days,
            'start_time': s_course.start_time,
            'end_time': s_course.end_time,
            'instructor': s_course.instructor,
            'traditional': s_course.traditional,
        }
        courses.append(course)

    schedule_json = {
        'courses': courses
    }

    return schedule_json


def run_algorithm(input, output):
    openFile = open('course_data.json')
    infile = open(input)
    out = open(output, 'w')
    courses = json.load(openFile)
    input = json.load(infile)

    courses = create_courses(courses)
    # input = parse_input(input)

    best = get_best_schedule(input, courses)

    out.write(json.dumps(convert_to_json(best)))

    return convert_to_json(best)
