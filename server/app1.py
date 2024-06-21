from flask import Flask, request, jsonify
from ultralytics import YOLO
from flask_cors import CORS, cross_origin
import cv2
import os
import numpy as np
import requests
from io import BytesIO


# Initialize YOLO model outside of the route
yolo_model = YOLO('best.pt')
model = YOLO('best.pt')
# dirr = 'C:/Users/Eashan/Desktop/amazonhackon/server/output'  # Replace with your desired directory path
# yolo_model = YOLO('best.pt', save_dir=save_dir)


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


        # data = request.get_json()
image_url = 'http://res.cloudinary.com/dldlqv8js/image/upload/v1718904060/cwnbqoeaicz97gu9pfw2.png'

        

        # def load_image_from_url(url):
        #     # Send a GET request to the URL
        #     response = requests.get(url)
        #     # Raise an exception if there's an error
        #     response.raise_for_status()
            
        #     # Read the image data from the response
        #     image_data = response.content
        #     # Convert the image data to a numpy array
        #     image_array = np.asarray(bytearray(image_data), dtype=np.uint8)
        #     # Decode the numpy array to an image
        #     image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
            
        #     return image

        # # URL of the image
        # url = 'https://example.com/path/to/your/image.jpg'

        # # Load the image
        # image = load_image_from_url(url)

        
        # Define path to the image file and the folder to save crops
source = image_url
save_dir = 'cropped_images'

        # Ensure the save directory exists
os.makedirs(save_dir, exist_ok=True)

        # Load the image
img = image_url
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
        

