from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import requests
import config
import datetime
import pytz
from plots import make_plots
import pyodbc
import db_conn_string
import uuid

app = Flask(__name__)
CORS(app)

@app.route('/dadosRealtime', methods=['POST'])
def realtime():
    content_type = request.headers.get('Content-Type')
    if content_type != 'application/json':
        return jsonify({'error': 'Invalid Content-Type'}), 400
    
    data = request.get_json()

    city_name = data['cidade']

    # Replace with your API keys
    opencage_api_key = config.opencage_api_key
    tomorrow_api_key = config.tomorrow_api_key

    # Get latitude and longitude coordinates for city using OpenCage API
    opencage_endpoint = f"https://api.opencagedata.com/geocode/v1/json?q={city_name}&key={opencage_api_key}"
    opencage_response = requests.get(opencage_endpoint)
    opencage_data = json.loads(opencage_response.text)
    latitude = opencage_data["results"][0]["geometry"]["lat"]
    longitude = opencage_data["results"][0]["geometry"]["lng"]


    tomorrow_endpoint = "https://api.tomorrow.io/v4/weather/realtime?" \
                        "location={latitude},{longitude}" \
                        "&apikey={tomorrow_api_key}" 


    tomorrow_endpoint = tomorrow_endpoint.format(latitude=latitude,
                                                longitude=longitude,
                                                tomorrow_api_key=tomorrow_api_key)
    
    tomorrow_response = requests.get(tomorrow_endpoint)
    tomorrow_data = json.loads(tomorrow_response.text)

    # Dumps API data into .json
    with open('realtime_data.json', 'w') as f:
        json.dump(tomorrow_data, f)

    return data

@app.route("/apiRealtime", methods=['GET'])
def api_realtime():
    with open('realtime_data.json') as f:
        data = json.load(f)

    return jsonify(data)


@app.route('/dadosCafe', methods=['POST'])
def previsao_cafe():
    content_type = request.headers.get('Content-Type')
    if content_type != 'application/json':
        return jsonify({'error': 'Invalid Content-Type'}), 400
    
    data = request.get_json()

    utc = pytz.timezone('UTC') 
    utc3 = pytz.timezone('America/Sao_Paulo')  
    
    unique_id = str(uuid.uuid4())

    produto = data['produto']
    dosagem = data['dosagem']
    quantidade = data['quantidade']
    velocidade = data['velocidade']
    city_name = data['cidade']
    initial_date = data['dateEntrada']
    final_date = data['dateSaida']
    timesteps = '1h'

    # Replace with your API keys
    opencage_api_key = config.opencage_api_key
    tomorrow_api_key = config.tomorrow_api_key

    # Get the current year
    current_year = datetime.datetime.now().year

    initial_parsed_date = datetime.datetime.strptime(initial_date, '%d/%m %Hh').replace(year=current_year)
    initial_parsed_date = initial_parsed_date.astimezone(utc3)
    startTime = initial_parsed_date.strftime('%Y-%m-%dT%H:%M:%SZ')

    final_parsed_date = datetime.datetime.strptime(final_date, '%d/%m %Hh').replace(year=current_year)
    final_parsed_date = final_parsed_date.astimezone(utc3)
    endTime = final_parsed_date.strftime('%Y-%m-%dT%H:%M:%SZ')

    # Get latitude and longitude coordinates for city using OpenCage API
    opencage_endpoint = f"https://api.opencagedata.com/geocode/v1/json?q={city_name}&key={opencage_api_key}"
    opencage_response = requests.get(opencage_endpoint)
    opencage_data = json.loads(opencage_response.text)
    latitude = opencage_data["results"][0]["geometry"]["lat"]
    longitude = opencage_data["results"][0]["geometry"]["lng"]

    # Get weather data for city using Tomorrow.io API
    # You can change the timesteps parameter to any of the following: 
    # 1d, 1h
    fields = "temperature,windSpeed,humidity,precipitationProbability,rainAccumulation,evapotranspiration"
    sampling = "1h"

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

    # Dumps API data into .json
    with open('data_cafe.json', 'w') as f:
        json.dump(tomorrow_data, f)

    # Dumps Geo Data into .json
    # with open('geo_data.json', 'w') as f:
    #     json.dump(opencage_data, f)

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
    ETp = []

    for timeline in tomorrow_data["data"]["timelines"]:
        for interval in timeline["intervals"]:
            dates.append(interval["startTime"])
            temperatures.append(interval["values"]["temperature"])
            humidities.append(interval["values"]["humidity"])
            windspeeds_kmh.append(interval["values"]["windSpeed"]*3.6) # km/h
            pop.append(interval["values"]["precipitationProbability"])
            rain.append(round(interval["values"]["rainAccumulation"], 2))
            ETp.append(interval['values']['evapotranspiration'])



    # Loop over the dates, parse them and format them
    formatted_dates = []
    for date in dates:
        parsed_date = datetime.datetime.strptime(date, '%Y-%m-%dT%H:%M:%SZ').replace(tzinfo=utc)
        formatted_date = parsed_date.astimezone(utc3).strftime('%d/%m/%Y %Hh')
        formatted_dates.append(formatted_date)

    # make_plots(dates, temperatures, humidities, windspeeds_kmh, pop, rain, ETp, city_name)

    # Convert JSON data to Python dictionary
    with open('data_cafe.json', 'r') as d:
        data_db = json.load(d)

    # Extract relevant information
    timelines = data_db['data']['timelines']
    startTime = timelines[0]['intervals'][0]['startTime']
    endTime = timelines[0]['endTime']
    valores = timelines[0]['intervals']
    json_values = json.dumps(valores)
    
    # crie a string de conexão com o banco de dados
    connection_string = db_conn_string.connection_string

    # Conecte-se ao banco de dados
    conn = pyodbc.connect(connection_string)

    # Crie um cursor para executar comandos SQL
    cur = conn.cursor()

    # Insira os valores na tabela cafe
    cur.execute("INSERT INTO café (id, nome_produto, quantidade, dosagem, velocidade, cidade, dataInicio, dataFinal, valores) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (unique_id, produto, quantidade, dosagem, velocidade, city_name, initial_date, final_date, json_values))

    # Salve as mudanças no banco de dados
    conn.commit()

    # Feche a conexão com o banco de dados
    cur.close()
    conn.close()

    return data

@app.route("/apiCafe", methods=['GET'])
def api_cafe():
    with open('data_cafe.json') as f:
        data = json.load(f)

    return jsonify(data)



@app.route('/dadosGado', methods=['POST'])
def previsao_gado():
    content_type = request.headers.get('Content-Type')
    if content_type != 'application/json':
        return jsonify({'error': 'Invalid Content-Type'}), 400
    
    data = request.get_json()

    utc = pytz.timezone('UTC') 
    utc3 = pytz.timezone('America/Sao_Paulo')  

    unique_id = str(uuid.uuid4())


    nome = data['nome']
    cabeças = data['cabeças']
    piquete = data['piquete']
    obs = data['obs']
    city_name = data['cidade']
    initial_date = data['dateEntrada']
    final_date = data['dateSaida']
    timesteps = '1d'

    # Replace with your API keys
    opencage_api_key = config.opencage_api_key
    tomorrow_api_key = config.tomorrow_api_key

    # Get the current year
    current_year = datetime.datetime.now().year

    initial_parsed_date = datetime.datetime.strptime(initial_date, '%d/%m %Hh').replace(year=current_year)
    initial_parsed_date = initial_parsed_date.astimezone(utc3)
    startTime = initial_parsed_date.strftime('%Y-%m-%dT%H:%M:%SZ')

    final_parsed_date = datetime.datetime.strptime(final_date, '%d/%m %Hh').replace(year=current_year)
    final_parsed_date = final_parsed_date.astimezone(utc3)
    endTime = final_parsed_date.strftime('%Y-%m-%dT%H:%M:%SZ')

    # Get latitude and longitude coordinates for city using OpenCage API
    opencage_endpoint = f"https://api.opencagedata.com/geocode/v1/json?q={city_name}&key={opencage_api_key}"
    opencage_response = requests.get(opencage_endpoint)
    opencage_data = json.loads(opencage_response.text)
    latitude = opencage_data["results"][0]["geometry"]["lat"]
    longitude = opencage_data["results"][0]["geometry"]["lng"]

    # Get weather data for city using Tomorrow.io API
    # You can change the timesteps parameter to any of the following: 
    # 1d, 1h
    fields = "temperature,precipitationProbability,rainAccumulation"
    sampling = "1h"

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

    # Dumps API data into .json
    with open('data_gado.json', 'w') as f:
        json.dump(tomorrow_data, f)

    # Dumps Geo Data into .json
    # with open('geo_data.json', 'w') as f:
    #     json.dump(opencage_data, f)

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
    pop = []
    rain = []

    for timeline in tomorrow_data["data"]["timelines"]:
        for interval in timeline["intervals"]:
            dates.append(interval["startTime"])
            temperatures.append(interval["values"]["temperature"])
            pop.append(interval["values"]["precipitationProbability"])
            rain.append(round(interval["values"]["rainAccumulation"], 2))


    # Loop over the dates, parse them and format them
    formatted_dates = []
    for date in dates:
        parsed_date = datetime.datetime.strptime(date, '%Y-%m-%dT%H:%M:%SZ').replace(tzinfo=utc)
        formatted_date = parsed_date.astimezone(utc3).strftime('%d/%m/%Y %Hh')
        formatted_dates.append(formatted_date)

    # make_plots(dates, temperatures, pop, rain, city_name)

    # Convert JSON data to Python dictionary
    with open('data_gado.json', 'r') as d:
        data_db = json.load(d)

    # Extract relevant information
    timelines = data_db['data']['timelines']
    startTime = timelines[0]['intervals'][0]['startTime']
    endTime = timelines[0]['endTime']
    valores = timelines[0]['intervals']
    json_values = json.dumps(valores)
    
    # crie a string de conexão com o banco de dados
    connection_string = db_conn_string.connection_string

    # Conecte-se ao banco de dados
    conn = pyodbc.connect(connection_string)

    # Crie um cursor para executar comandos SQL
    cur = conn.cursor()

    # Insira os valores na tabela cafe
    cur.execute("INSERT INTO gado (id, nome, cabeças, piquete, observação, cidade, dataInicio, dataFinal, valores) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (unique_id, nome, cabeças, piquete, obs, city_name, initial_date, final_date, json_values))

    # Salve as mudanças no banco de dados
    conn.commit()

    # Feche a conexão com o banco de dados
    cur.close()
    conn.close()
    return data

@app.route("/apiGado", methods=['GET'])
def api_gado():
    with open('data_gado.json') as f:
        data = json.load(f)

    return jsonify(data)




conn_str = db_conn_string.connection_string
@app.route('/apiProdutosCafé', methods = ['GET'])
def api_produtos_cafe():
    # Cria um objeto de conexão usando a string de conexão
    conn = pyodbc.connect(conn_str)

    cursor = conn.cursor()
    cursor.execute('SELECT nome_produto FROM café')

    data = []
    for row in cursor.fetchall():
        # Extrai a coluna da linha
        value = row[0]

        # Adiciona o valor na lista
        data.append(value)
    
    # Fecha a conexão
    conn.close()

    # Retorna as informações como JSON
    return jsonify(data)

@app.route('/apiValoresCafé', methods = ['GET'])
def api_valores_cafe():
    # Cria um objeto de conexão usando a string de conexão
    conn = pyodbc.connect(conn_str)
    
    cursor = conn.cursor()
    cursor.execute('SELECT valores FROM café')

    valores_list = []
    # Itere através dos resultados do cursor
    for row in cursor:
        # Obtenha o valor da coluna 'valores' como uma string JSON
        json_string = row[0]

        # Analise a string JSON em um objeto Python
        json_data = json.loads(json_string)

        # Adicione o array de valores a lista
        valores_list.append(json_data)
    
    for valores in valores_list:
        for valor in valores:
            valor.pop('startTime')

    # Retorne a lista de arrays de valores como JSON

    # Fecha a conexão
    conn.close()

    # Retorna as informações como JSON
    return jsonify(valores_list)

@app.route('/apiProdutosGado', methods = ['GET'])
def api_produtos_gado():
    # Cria um objeto de conexão usando a string de conexão
    conn = pyodbc.connect(conn_str)

    cursor = conn.cursor()
    cursor.execute('SELECT nome FROM gado')

    data = []
    for row in cursor.fetchall():
        # Extrai a coluna da linha
        value = row[0]

        # Adiciona o valor na lista
        data.append(value)
    
    # Fecha a conexão
    conn.close()

    # Retorna as informações como JSON
    return jsonify(data)

@app.route('/apiValoresGado', methods = ['GET'])
def api_valores_gado():
    # Cria um objeto de conexão usando a string de conexão
    conn = pyodbc.connect(conn_str)
    
    cursor = conn.cursor()
    cursor.execute('SELECT valores FROM gado')

    valores_list = []
    # Itere através dos resultados do cursor
    for row in cursor:
        # Obtenha o valor da coluna 'valores' como uma string JSON
        json_string = row[0]

        # Analise a string JSON em um objeto Python
        json_data = json.loads(json_string)

        # Adicione o array de valores a lista
        valores_list.append(json_data)
    
    for valores in valores_list:
        for valor in valores:
            valor.pop('startTime')

    # Retorne a lista de arrays de valores como JSON

    # Fecha a conexão
    conn.close()

    # Retorna as informações como JSON
    return jsonify(valores_list)

if __name__ == '__main__':
    app.run()