import requests

url = 'http://localhost:5000/previsao'
payload = {
    'city_name': 'São Paulo',
    'initial_date': '23/02 18h',
    'final_date': '24/02 18h',
    'timesteps': '1h'
}

response = requests.post(url, data=payload)
print(response.json())