import plotly.graph_objects as go
from plotly.subplots import make_subplots

def make_plots(dates, temperatures, humidities, windspeeds_kmh, pop, rain, ETp, city_name):
    # Configuração de cores e estilos
    colors = ['deepskyblue', 'orangered', 'chartreuse', 'crimson', 'yellow', 'magenta']
    markers = ['circle', 'diamond', 'square', 'star', 'x']

    # Configure subplots
    fig = make_subplots(rows=3, cols=2, subplot_titles=("Temperature (°C)", "Humidity (%)", "Wind Speed (Km/h)", "Precipitation Probability (%)", "Rain Accumulation (mm)", "ETp (mm)"))

    # Add temperature trace
    fig.add_trace(go.Scatter(x=dates, y=temperatures, mode='lines+markers', name='Temperature', marker=dict(color=colors[0], symbol=markers[0])), row=1, col=1)

    # Add humidity trace
    fig.add_trace(go.Scatter(x=dates, y=humidities, mode='lines+markers', name='Humidity', marker=dict(color=colors[1], symbol=markers[0])), row=1, col=2)

    # Add wind speed trace
    fig.add_trace(go.Scatter(x=dates, y=windspeeds_kmh, mode='lines+markers', name='Wind Speed', marker=dict(color=colors[2], symbol=markers[0])), row=2, col=1)

    # Add precipitation probability trace
    fig.add_trace(go.Scatter(x=dates, y=pop, mode='lines+markers', name='Precipitation Probability', marker=dict(color=colors[3], symbol=markers[0])), row=2, col=2)

    # Add rain accumulation trace
    fig.add_trace(go.Scatter(x=dates, y=rain, mode='lines+markers', name='Rain Accumulation', marker=dict(color=colors[4], symbol=markers[0])), row=3, col=1)

    # Add ETp
    fig.add_trace(go.Scatter(x=dates, y=ETp, mode='lines+markers', name='ETp', marker=dict(color=colors[5], symbol=markers[0])), row=3, col=2)

    # Update layout
    fig.update_layout(title=f"7-day Weather Forecast for {city_name}", height=1000, template='plotly_dark', hovermode="x unified", font=dict(family='Arial', size=12), xaxis=dict(tickangle=-45))

    # Show plot
    return fig.show()