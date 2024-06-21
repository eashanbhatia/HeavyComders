from flask import Flask, request, jsonify
from ultralytics import YOLO
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import cv2
import os
import numpy as np
import requests
from io import BytesIO
import shutil
import pickle
import tensorflow

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img,img_to_array
from tensorflow.keras.applications.vgg16 import preprocess_input
from scipy.spatial.distance import cosine
app = Flask(__name__)
# MONGO_URI = ''
# client = MongoClient(MONGO_URI)
# db = client['']
# collection = db['']
CORS(app, support_credentials=True)
# Initialize YOLO model outside of the route
yolo_model = YOLO('best.pt')
model = YOLO('best.pt')
# dirr = 'C:/Users/Eashan/Desktop/amazonhackon/server/output'  
# yolo_model = YOLO('best.pt', save_dir=save_dir)


def load_image_from_url(url):
            # Send a GET request to the URL
            response = requests.get(url)
            # Raise an exception if there's an error
            response.raise_for_status()
            
            # Read the image data from the response
            image_data = response.content
            # Convert the image data to a numpy array
            image_array = np.asarray(bytearray(image_data), dtype=np.uint8)
            # Decode the numpy array to an image
            image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
            
            return image

        # URL of the image
        # url = 'https://example.com/path/to/your/image.jpg'

        # Load the image
        
# def query_images(image_names):
#     queries = [{"image_name": image_name} for image_name in image_names]
#     results_products = []
            
#     for query in queries:
#         resultnew = collection.find_one(query)
#         if resultnew:
#             results_products.append(resultnew)
#     return jsonify(results_products)



@app.route('/api/detectImage', methods=['POST'])
@cross_origin(supports_credentials=True)
def detect_image():
    # try:
    #     data = request.get_json()
    #     image_url = data['imageUrl']
        
    #     # Perform object detection using YOLO model
    #     results = yolo_model(image_url, conf=0.3, save_crop=True)
    #     print("Resultss:",results)
        
    #     results_object = results[0]  # Assuming there's only one object in the list
    #     save_dir_value = results_object.save_dir
    #     print(save_dir_value)



    #     # Process results if needed
    #     # detected_objects = results.pandas().xyxy[0].to_dict(orient='records')
        
    #     return jsonify({'result': 'Donee'})
    
    # except Exception as e:
    #     return jsonify({'error': str(e)})

    try:
        data = request.get_json()
        image_url = data['imageUrl']
        img = load_image_from_url(image_url)
        
        

        

        
        # Define path to the image file and the folder to save crops
        source = img
        save_dir = 'cropped_images'

        # Ensure the save directory exists
        os.makedirs(save_dir, exist_ok=True)

        for filename in os.listdir(save_dir):
            file_path = os.path.join(save_dir, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print(f"Failed to delete {file_path}. Reason: {e}")

        # Load the image
        # img = image_url
        # Run inference on the source
        results = model.predict(source)

        # Iterate over detections
        for i, det in enumerate(results[0].boxes.xyxy):
            x1, y1, x2, y2 = map(int, det[:4])
            crop_img = img[y1:y2, x1:x2]

            # Save cropped image
            crop_path = os.path.join(save_dir, f"crop_{i}.jpeg")
            cv2.imwrite(crop_path, crop_img)
            print(f"Cropped image saved to {crop_path}")

        print("Cropping and saving completed!")

        def get_one_image_features(img_path,model):
            image=load_img(img_path,target_size=(224,224))
            image=img_to_array(image)
            image=image.reshape((1,image.shape[0],image.shape[1],image.shape[2]))
            image=preprocess_input(image)
            features=model.predict(image)
            return features.flatten()
        def calculate_similarity(query_features, all_features):
            similarities = []
            for idx, features in enumerate(all_features):
                similarity = 1 - cosine(query_features, features)
                similarities.append((similarity, idx))
            similarities.sort(reverse=True)  # Sort in descending order of similarity
            return similarities

        def find_most_similar_images(query_folder_path, model, all_images_features, all_image_names):
            most_similar_images = []
            
            # Iterate through each image in the query folder
            for query_image_name in os.listdir(query_folder_path):
                query_image_path = os.path.join(query_folder_path, query_image_name)
                
                # Load and preprocess the query image
                query_image_features = get_one_image_features(query_image_path, model)
                
                # Calculate similarities with all images
                similarities = calculate_similarity(query_image_features, all_images_features)
                
                # Get the most similar image (top-1)
                most_similar_image_name = all_image_names[similarities[0][1]]
                most_similar_images.append(most_similar_image_name)
            
            return most_similar_images
        def get_image_filenames(folder_path):
            return [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
        all_images_path = "dataset2"

        # Load the VGG16 model
        model_sim = load_model('vgg_feature_extraction_model.h5',compile=False)

        # Load the extracted features from all images
        with open('vgg16_features.pkl', 'rb') as f:
            all_images_features = pickle.load(f)

        # Get all image filenames in the dataset folder
        all_image_names = get_image_filenames(all_images_path)
        query_images_path = "C:/Users/Eashan/Desktop/amazonhackon/server/cropped_images"
        similar_objects_per_image = find_most_similar_images(query_images_path, model_sim, all_images_features, all_image_names)

        print(similar_objects_per_image)

        image_names = similar_objects_per_image
        # final_products = query_images(image_names)
        products = []
        def query_images():
            queries = [{"image_name": image_name} for image_name in image_names]
            
            for query in queries:
                result = collection.find_one(query)
                if result:
                    products.append(result)
            print("Resultsssss:",products)
            # return jsonify(results)
        
        # return final_products
        return jsonify({'result': image_names})
    
    except Exception as e:
        return jsonify({'error': str(e)})

image_names = ['shoe_1.jpg', 'lamp_9.jpg', 'lamp_41.jpg', 'bookshelf_8.jpg']
@app.route('/query_images', methods=['GET'])
@cross_origin(supports_credentials=True)
def query_images():
    # Create the query to find all documents where 'image_name' is in the image_names list
    query = {"image_name": {"$in": image_names}}
    
    # Execute the query
    resultssssss = collection.find(query)
    
    # Convert the results to a list of dictionaries
    result_list = [result for result in resultssssss]
    
    # Return the results as a JSON response
    return jsonify(result_list)

if __name__ == '__main__':
    app.run(debug=True)
