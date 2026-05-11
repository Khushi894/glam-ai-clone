from flask import Flask, render_template, request, send_file
import requests
import os

app = Flask(__name__)

API_KEY = "9BJuLV7dX2ohGkJrcfZJtBaH"

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "output"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload_image():

    if "image" not in request.files:
        return {"error": "No image"}

    image = request.files["image"]

    input_path = os.path.join(
        UPLOAD_FOLDER,
        image.filename
    )

    image.save(input_path)

    output_path = os.path.join(
        OUTPUT_FOLDER,
        "output.png"
    )

    with open(input_path, "rb") as img_file:

        response = requests.post(
            "https://api.remove.bg/v1.0/removebg",
            files={
                "image_file": img_file
            },
            data={
                "size": "auto"
            },
            headers={
                "X-Api-Key": API_KEY
            }
        )

    if response.status_code == 200:

        with open(output_path, "wb") as out:
            out.write(response.content)

        return send_file(
            output_path,
            as_attachment=False
        )

    return {"error": "Failed"}

import os
@app.route("/cartoon", methods=["POST"])
def cartoon_filter():

    file = request.files["image"]

    filepath = os.path.join("uploads", file.filename)

    file.save(filepath)

    img = cv2.imread(filepath)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    gray = cv2.medianBlur(gray, 5)

    edges = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_MEAN_C,
        cv2.THRESH_BINARY,
        9,
        9
    )

    color = cv2.bilateralFilter(img, 9, 250, 250)

    cartoon = cv2.bitwise_and(color, color, mask=edges)

    output_path = os.path.join(
        "output",
        "cartoon_" + file.filename
    )

    cv2.imwrite(output_path, cartoon)

    return send_file(output_path, mimetype="image/png")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)