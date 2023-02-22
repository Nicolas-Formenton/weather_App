import requests
import json
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import config
import datetime

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

# # Configuração de cores e estilos
# colors = ['deepskyblue', 'orangered', 'chartreuse', 'crimson', 'yellow', 'magenta']
# markers = ['circle', 'diamond', 'square', 'star', 'x']

# # Configure subplots
# fig = make_subplots(rows=3, cols=2, subplot_titles=("Temperature (°C)", "Humidity (%)", "Wind Speed (Km/h)", "Precipitation Probability (%)", "Rain Accumulation (mm)", "ETp (mm)"))

# # Add temperature trace
# fig.add_trace(go.Scatter(x=dates, y=temperatures, mode='lines+markers', name='Temperature', marker=dict(color=colors[0], symbol=markers[0])), row=1, col=1)

# # Add humidity trace
# fig.add_trace(go.Scatter(x=dates, y=humidities, mode='lines+markers', name='Humidity', marker=dict(color=colors[1], symbol=markers[0])), row=1, col=2)

# # Add wind speed trace
# fig.add_trace(go.Scatter(x=dates, y=windspeeds_kmh, mode='lines+markers', name='Wind Speed', marker=dict(color=colors[2], symbol=markers[0])), row=2, col=1)

# # Add precipitation probability trace
# fig.add_trace(go.Scatter(x=dates, y=pop, mode='lines+markers', name='Precipitation Probability', marker=dict(color=colors[3], symbol=markers[0])), row=2, col=2)

# # Add rain accumulation trace
# fig.add_trace(go.Scatter(x=dates, y=rain, mode='lines+markers', name='Rain Accumulation', marker=dict(color=colors[4], symbol=markers[0])), row=3, col=1)

# # Add ETp
# fig.add_trace(go.Scatter(x=dates, y=ETp, mode='lines+markers', name='ETp', marker=dict(color=colors[5], symbol=markers[0])), row=3, col=2)

# # Update layout
# fig.update_layout(title=f"7-day Weather Forecast for {city_name}", height=1000, template='plotly_dark', hovermode="x unified", font=dict(family='Arial', size=12), xaxis=dict(tickangle=-45))

# # Show plot
# fig.show()

