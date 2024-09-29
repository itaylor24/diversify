import os
import zipfile
import shutil
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import json
import instagram
from flask_cors import CORS, cross_origin

# from graph_utils import ingest

# Define the upload and extract folders
UPLOAD_FOLDER = 'uploads'
EXTRACT_FOLDER = 'extracted_files'
ALLOWED_EXTENSIONS = {'zip'}

# Ensure the folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(EXTRACT_FOLDER, exist_ok=True)

# Initialize the Flask app
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['EXTRACT_FOLDER'] = EXTRACT_FOLDER
applicant_files = []

# Helper function to check if the file has a valid extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route for uploading the ZIP file
@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_file():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    # If the user does not select a file, the browser may submit an empty part without a filename
    if file.filename == '':

        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):

        filename = secure_filename(file.filename)

        # Save the uploaded file to the upload folder
        zip_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(zip_path)

        # Process the zip file (extract and handle each file)
        global applicant_files
        applicant_files += instagram.process(zip_path, app)
        print(applicant_files)
        # ingest("swagginty", chats, "instagram")

        # Delete the uploaded zip file after processing
        # os.remove(zip_path)
        return jsonify(message="POST request returned")
    else:
        return jsonify({'error': "Invalid file type (use .zip)"}), 400
    
# Route for searching for applicant
@app.route('/search', methods=['GET'])
@cross_origin()
def search_applicant(): 
    applicant_name = request.args.get('applicant_name')
    global applicant_files
    if applicant_name:
        ...
        #give back data 
        filtered_data = [tup for tup in applicant_files if tup[0] == applicant_name]
        if(len(filtered_data) == 0): 
            return "Applicant name not found", 404
        return jsonify({'name': filtered_data[0][0], 'score': 0}), 200 
    else:
        return "No applicant name provided", 400


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
