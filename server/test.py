from pymongo import MongoClient

# MongoDB Atlas connection
client = MongoClient("mongodb+srv://@mycluster.1kwwdcb.mongodb.net/?retryWrites=true&w=majority")
db = client.test
collection = db.hoproducts

# List of image names
image_names = ['shoe_1.jpg', 'lamp_9.jpg', 'lamp_41.jpg', 'bookshelf_8.jpg']

# Create the query to find all documents where 'image_name' is in the image_names list
query = {"image_name": {"$in": image_names}}

# Execute the query
results = collection.find(query)

# Convert the results to a list of dictionaries
result_list = [result for result in results]

# Print the results
print(result_list)
