import requests
from googletrans import Translator
import plotly.graph_objects as go
from plotly.subplots import make_subplots
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

dates = [datetime.fromisoformat(forecast['dt_txt']).strftime('%d/%m %Hh') for forecast in data['list']]

temperatures = [forecast['main']['temp'] for forecast in data['list']]

humidities = [forecast['main']['humidity'] for forecast in data['list']]

windspeeds_kmh = []
for forecast in data['list']:
    try:
        windspeed_mps = forecast['wind']['speed']
    except KeyError:
        windspeed_mps = 0
    windspeed_kmh = windspeed_mps * 3.6
    windspeeds_kmh.append(windspeed_kmh)


pop = [forecast['pop'] for forecast in data['list']]

rain = [forecast['rain']['3h'] if 'rain' in forecast else 0 for forecast in data['list']]


# Configuração de cores e estilos
colors = ['deepskyblue', 'orangered', 'chartreuse', 'crimson', 'darkviolet']
markers = ['circle', 'diamond', 'square', 'star', 'x']

# Cria os três gráficos em um subplot
fig = make_subplots(rows=5, cols=1, shared_xaxes=True, vertical_spacing=0.02)

# Plota temperatura e umidade
fig.add_trace(go.Scatter(x=dates, y=temperatures, name='Temperatura', mode='lines+markers', marker=dict(color=colors[0], symbol=markers[0])), row=1, col=1)
fig.update_yaxes(title_text='Temperatura (°C)', row=1, col=1)

fig.add_trace(go.Scatter(x=dates, y=humidities, name='Umidade', mode='lines+markers', marker=dict(color=colors[1], symbol=markers[0])), row=2, col=1)
fig.update_yaxes(title_text='Umidade (%)', row=2, col=1)

# Plota velocidade do vento
fig.add_trace(go.Scatter(x=dates, y=windspeeds_kmh, name='Velocidade do Vento (km/h)', mode='lines+markers', marker=dict(color=colors[2], symbol=markers[0])), row=3, col=1)
fig.update_yaxes(title_text='Vento (km/h)', row=3, col=1)

# Plota probabilidade de chuva e quantidade
fig.add_trace(go.Bar(x=dates, y=pop, name='Probabilidade de Chuva', marker=dict(color=colors[3])), row=4, col=1)
fig.add_trace(go.Bar(x=dates, y=rain, name='Quantidade de Chuva', marker=dict(color=colors[4])), row=5, col=1)

fig.update_yaxes(title_text='Probabilidade (%)', row=4, col=1)
fig.update_yaxes(title_text='Quantidade (mm)', row=5, col=1)

# Atualiza o layout do gráfico
fig.update_layout(title=f'Condições Climáticas em {city.title()}', xaxis_title='Data e Hora', height=1000,
font=dict(family='Arial', size=12), template='plotly_dark', legend=dict(yanchor='top', y=0.99, xanchor='left', x=0.01))

# Define o título e tamanho da figura
fig.update_layout(title='Previsão do Tempo em {}'.format(city.title()), height=1000, hovermode="x unified")

# Mostra a figura
fig.show()