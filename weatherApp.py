import requests
import json
import config
import datetime
from plots import make_plots

# Replace with your API keys
opencage_api_key = config.opencage_api_key
tomorrow_api_key = config.tomorrow_api_key

# Input city name
city_name = input("Insira o nome de uma cidade: ")
timesteps = input("Defina o período que quer ver, 1d ou 1h: ")

# Get the current year
current_year = datetime.datetime.now().year

inital_date = input("Data e hora inicial (Ex: 22/02 9h): ")
inital_parsed_date = datetime.datetime.strptime(inital_date, '%d/%m %Hh').replace(year=current_year)
startTime = inital_parsed_date.strftime('%Y-%m-%dT%H:%M:%SZ')

final_date = input("Data e hora final (Ex: 22/02 11h): ")
final_parsed_date = datetime.datetime.strptime(final_date, '%d/%m %Hh').replace(year=current_year)
endTime = final_parsed_date.strftime('%Y-%m-%dT%H:%M:%SZ')

# Get latitude and longitude coordinates for city using OpenCage API
opencage_endpoint = f"https://api.opencagedata.com/geocode/v1/json?q={city_name}&key={opencage_api_key}"
opencage_response = requests.get(opencage_endpoint)
opencage_data = json.loads(opencage_response.text)
latitude = opencage_data["results"][0]["geometry"]["lat"]
longitude = opencage_data["results"][0]["geometry"]["lng"]

# print(latitude)
# print(longitude)

# Get weather data for city using Tomorrow.io API
# You can change the timesteps parameter to any of the following: 
# 1d, 1h
fields = "temperature,windSpeed,humidity,precipitationProbability,precipitationIntensity,precipitationType,rainAccumulation,pressureSurfaceLevel,evapotranspiration"
sampling = "1h"
# timesteps = "1d"

tomorrow_endpoint = "https://api.tomorrow.io/v4/timelines?" \
                    "location={latitude},{longitude}" \
                    "&fields={fields}" \
                    "&sampling={sampling}" \
                    "&timesteps={timesteps}" \
                    "&apikey={tomorrow_api_key}" \
                    "&startTime={startTime}" \
                    "&endTime={endTime}"

tomorrow_endpoint = tomorrow_endpoint.format(latitude=latitude,
                                             longitude=longitude,
                                             fields=fields,
                                             sampling=sampling,
                                             timesteps=timesteps,
                                             tomorrow_api_key=tomorrow_api_key,
                                             startTime = startTime,
                                             endTime = endTime)

tomorrow_response = requests.get(tomorrow_endpoint)
tomorrow_data = json.loads(tomorrow_response.text)

with open('templates/data.json', 'w') as f:
    json.dump(tomorrow_data, f)

with open('geo_data.json', 'w') as f:
    json.dump(opencage_data, f)

# Get all available data fields from response
data_fields = []
for timeline in tomorrow_data["data"]["timelines"]:
    for interval in timeline["intervals"]:
        for key in interval["values"].keys():
            if key not in data_fields:
                data_fields.append(key)

# Print all available data fields
# print("Available data fields:")
# for field in data_fields:
#     print(field)

# Extract weather data from response
weather_data = {}
for field in data_fields:
    try:
        weather_data[field] = tomorrow_data["data"]["timelines"][0]["intervals"][0]["values"][field]
    except KeyError:
        weather_data[field] = None

# Extract dates and data for each field from response
dates = []
temperatures = []
humidities = []
windspeeds_kmh = []
pop = []
rain = []
patm = []
ETp = []

for timeline in tomorrow_data["data"]["timelines"]:
    for interval in timeline["intervals"]:
        dates.append(interval["startTime"])
        temperatures.append(interval["values"]["temperature"])
        humidities.append(interval["values"]["humidity"])
        windspeeds_kmh.append(interval["values"]["windSpeed"]*3.6) # km/h
        pop.append(interval["values"]["precipitationProbability"])
        rain.append(round(interval["values"]["rainAccumulation"], 2))
        patm.append(interval["values"]["pressureSurfaceLevel"])
        ETp.append(interval['values']['evapotranspiration'])

# Loop over the dates, parse them and format them
formatted_dates = []
for date in dates:
    parsed_date = datetime.datetime.strptime(date, '%Y-%m-%dT%H:%M:%SZ')
    formatted_date = parsed_date.strftime('%d/%m/%Y %Hh')
    formatted_dates.append(formatted_date)

def show_values():
    for i in range(len(dates)):
        if timesteps == '1d':
            metric = 'd'
        if timesteps == '1h':
            metric = 'h'

        print(f'''
        Data: {formatted_dates[i]}
        Temperatura: {temperatures[i]} °C
        Umidade: {humidities[i]} %
        Velocidade do vento: {windspeeds_kmh[i]:.2f} km/h
        Evapotranspiração: {ETp[i]} mm/{metric}
        Possibilidade de precipitação: {pop[i]:.2f}%    
        ''')
show_values()

fig = make_plots(dates, temperatures, humidities, windspeeds_kmh, pop, rain, ETp, city_name)


