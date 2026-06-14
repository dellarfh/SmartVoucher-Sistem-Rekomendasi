from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
# Izinkan React (port 5173) mengakses Flask (port 5000)
CORS(app)

# Path disesuaikan dengan struktur folder di gambarmu
DATA_FILE = 'data/hasil_rekomendasi_promosi.csv'

# Fungsi bantuan untuk membaca data
def get_rfm_data():
    if not os.path.exists(DATA_FILE):
        print(f"Peringatan: File {DATA_FILE} tidak ditemukan!")
        return pd.DataFrame()
    return pd.read_csv(DATA_FILE)

# Fungsi bantuan untuk menentukan rekomendasi promo
def get_recommendation(klaster):
    if klaster == 2:
        return "Program Kemitraan Eksklusif B2B"
    elif klaster == 3:
        return "Akses Awal Produk & Reward Poin Ganda"
    elif klaster == 0:
        return "Voucher Gratis Ongkir + Diskon 20%"
    else:
        return "Voucher Win-Back Diskon £ 20"

@app.route('/api/customers', methods=['GET'])
def api_customers():
    df = get_rfm_data()
    if df.empty:
        return jsonify([])

    # Menerapkan logika rekomendasi jika kolom belum ada di CSV bawaan
    if 'Klaster' in df.columns and 'Rekomendasi_Promosi' not in df.columns:
        df['Rekomendasi_Promosi'] = df['Klaster'].apply(get_recommendation)
    
    # Mengubah dataframe menjadi list of dictionaries
    customers_data = df.to_dict(orient='records')
    return jsonify(customers_data)

@app.route('/api/summary', methods=['GET'])
def api_summary():
    df = get_rfm_data()
    if df.empty:
        return jsonify({
            "total_pelanggan": 0,
            "mega_vip": 0,
            "vip": 0,
            "reguler": 0,
            "pasif": 0
        })

    # Menghitung jumlah per klaster secara dinamis dari CSV
    summary_data = {
        "total_pelanggan": int(len(df)),
        "mega_vip": int(len(df[df['Klaster'] == 2])) if 'Klaster' in df.columns else 0,
        "vip": int(len(df[df['Klaster'] == 3])) if 'Klaster' in df.columns else 0,
        "reguler": int(len(df[df['Klaster'] == 0])) if 'Klaster' in df.columns else 0,
        "pasif": int(len(df[df['Klaster'] == 1])) if 'Klaster' in df.columns else 0
    }
    
    return jsonify(summary_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)