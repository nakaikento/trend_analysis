#app.py
from flask import Flask, request, render_template
from flask_cors import CORS
import mysql.connector
import urllib
from urllib.parse import urlparse
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
from io import BytesIO
import pandas as pd
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# DB接続
url = urlparse('mysql://nakai:55seisho@localhost:3306/agri_trend_searcher')
conn = mysql.connector.connect(host=url.hostname,
                               port=url.port,
                               user=url.username,
                               password=url.password,
                               database=url.path[1:],
                               )
# 接続確認
flag = conn.is_connected()
if flag:
    print("接続しました!")
# カーソル取得
cur = conn.cursor(buffered=True)
# 接続解除
cur.close()
conn.close()

fig, ax = plt.subplots(1,1)
ax.plot(df["Open"])

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/plot/btc")
def plot_btc():

    # Obtain query parameters
    start = datetime.strptime(request.args.get("start", default="2017-12-1", type=str), "%Y-%m-%d")
    end = datetime.strptime(request.args.get("end", default="2017-12-31", type=str), "%Y-%m-%d")

    if start > end:
        start, end = end, start
    if (start + timedelta(days=7)) > end:
        end = start + timedelta(days=7)

    png_out = BytesIO()
    matplotlib.style.use('ggplot')

    ax.set_xlim([start, end])
    ax.set_ylabel("USD/BTC")

    plt.xticks(rotation=60)

    plt.savefig(png_out, format="png", bbox_inches="tight")
    img_data = urllib.parse.quote(png_out.getvalue())

    return "data:image/png:base64," + img_data

if __name__ == "__main__":
    app.run(debug=True, port=5000)
