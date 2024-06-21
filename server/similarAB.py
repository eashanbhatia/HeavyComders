import os
import pickle
import tensorflow
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img,img_to_array
from tensorflow.keras.applications.vgg16 import preprocess_input
from scipy.spatial.distance import cosine
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
model = load_model('vgg_feature_extraction_model.h5',compile=False)

# Load the extracted features from all images
with open('vgg16_features.pkl', 'rb') as f:
    all_images_features = pickle.load(f)

# Get all image filenames in the dataset folder
all_image_names = get_image_filenames(all_images_path)
query_images_path = "try"
similar_objects_per_image = find_most_similar_images(query_images_path, model, all_images_features, all_image_names)

print(similar_objects_per_image)