import requests
from googletrans import Translator
import matplotlib.pyplot as plt
import numpy as np
import mplcyberpunk
from datetime import datetime
import config

# Define a URL da API e a chave de API
api_url = 'https://api.openweathermap.org/data/2.5/forecast'
api_key = config.open_weather_api_key

# Define a função para obter as condições climáticas de uma cidade
def get_weather(city):
    params = {'q': city, 'appid': api_key, 'units': 'metric'}
    response = requests.get(api_url, params=params)
    if response.status_code == 200:
        data = response.json()
        # Traduz a descrição do tempo para Português
        translator = Translator()
        for forecast in data['list']:
            description = forecast['weather'][0]['description']
            translated_desc = translator.translate(description, dest='pt').text
            forecast['weather'][0]['description'] = translated_desc
        return data
    else:
        return None

# Pede ao usuário para digitar o nome da cidade
city = input('Digite o nome da cidade: ')

# Obtém as previsões de 3 horas para os próximos 5 dias da cidade digitada
data = get_weather(city)
print(data['list'][0])


# Cria listas
dates = []
for forecast in data['list']:
    # Converte a data e hora do formato ISO 8601 para um objeto datetime
    dt = datetime.fromisoformat(forecast['dt_txt'])
    # Formata a data e hora de acordo com o seu gosto
    formatted_dt = dt.strftime('%d/%m %Hh')
    dates.append(formatted_dt)

temperatures = []
for forecast in data['list']:
    temperature = forecast['main']['temp']
    temperatures.append(temperature)

humidities = []
for forecast in data['list']:
    humidity = forecast['main']['humidity']
    humidities.append(humidity)

pressures = []
for forecast in data['list']:
    pressure = forecast['main']['pressure']
    pressures.append(pressure)

pop = []
rain = []
for forecast in data['list']:
    pop.append(forecast['pop'])
    try:
        rain.append(forecast['rain']['3h'])
    except KeyError:
        rain.append(0)


# Cria arrays NumPy
x = np.array(dates)
y1 = np.array(temperatures)
y2 = np.array(humidities)
y3 = np.array(pressures)
y4 = np.array(pop)
y5 = np.array(rain)

plt.style.use("cyberpunk")

# Cria figura e eixos
fig, axs = plt.subplots(5, 1, figsize=(10, 15))

# Configuraçoes de fonte, angulo, frequencia de data
for ax in axs:
    ax.set_xticks(range(0, len(x), 2))
    ax.set_xticklabels(x[::2], rotation=45, fontsize=10)

# Define cores e estilos
colors = ['deepskyblue', 'orangered', 'chartreuse', 'crimson', 'darkviolet']
markers = ['o', '^', 's', 'd', 'x']

# Plota temperatura
axs[0].plot(x, y1, color=colors[0], linewidth=1, marker=markers[0])
axs[0].set_title('Temperatura')
axs[0].set_ylabel('Temperatura (°C)')
mplcyberpunk.add_gradient_fill(axs[0], alpha_gradientglow=0.5)
# Plota umidade
axs[1].plot(x, y2, color=colors[1], linewidth=1, marker=markers[1])
axs[1].set_title('Umidade')
axs[1].set_ylabel('Umidade (%)')
mplcyberpunk.add_gradient_fill(axs[1], alpha_gradientglow=0.5)
# Plota pressão atmosférica
axs[2].plot(x, y3, color=colors[2], linewidth=1, marker=markers[2])
axs[2].set_title('Pressão Atmosférica')
axs[2].set_ylabel('Pressão (hPa)')
mplcyberpunk.add_gradient_fill(axs[2], alpha_gradientglow=0.5)
# Plota precipitação
axs[3].bar(x, y4, color=colors[3], width=0.5)
axs[3].set_title('Precipitação')
axs[3].set_ylabel('Probabilidade (%)')
mplcyberpunk.add_glow_effects(axs[3])
# Plota volume de chuva
axs[4].bar(x, y5, color=colors[4], width=0.5)
axs[4].set_title('Volume de Precipitação')
axs[4].set_ylabel('Quantidade (mm)')
mplcyberpunk.add_glow_effects(axs[4])

# Ajusta espaçamento entre os subplots
plt.subplots_adjust(hspace=1, top=0.95, bottom=0.08)

# Exibe o plot
plt.show()
