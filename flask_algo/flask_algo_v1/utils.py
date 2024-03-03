def convert_time(time_string):
    time = 0

    if time_string[-2:] == 'PM' and time_string[:2] != '12':
        time += 1200

    time += (int(time_string[-4:-2]) / 60) * 100

    time += int(time_string.split(':')[0]) * 100

    return time