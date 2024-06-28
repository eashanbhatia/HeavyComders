import cv2
import numpy as np
import pyautogui
import os

# Specify the folder to save cropped images
output_folder = 'C:/Users/Eashan/Desktop/amazonhackon/server/cropped_images'  # Replace with your desired folder path
os.makedirs(output_folder, exist_ok=True)  # Create folder if it doesn't exist

# Function to save the cropped image based on the contour
def save_cropped_image(image, contour, output_folder):
    # Get the bounding rectangle of the contour
    x, y, w, h = cv2.boundingRect(contour)
    
    # Crop the image based on the bounding rectangle
    cropped_image = image[y:y+h, x:x+w]

    # Construct output path (using a unique filename)
    output_path = os.path.join(output_folder, 'cropped_image.png')

    # Save the cropped image
    cv2.imwrite(output_path, cropped_image)
    print(f"Cropped image saved as {output_path}")

# Main loop for capturing screen and drawing contours
def capture_and_draw():
    while True:
        # Capture the screen using PyAutoGUI
        screen_shot = pyautogui.screenshot()
        screen_capture_np = np.array(screen_shot)
        screen_capture_np = cv2.cvtColor(screen_capture_np, cv2.COLOR_RGB2BGR)

        image = screen_capture_np

        # Variables to manage drawing
        drawing = False
        current_contour = []

        # Draw contour on the captured image
        while True:
            # Get mouse position
            mouse_position = pyautogui.position()

            # Display the image with contours
            image_with_contours = image.copy()
            if len(current_contour) > 1:
                cv2.polylines(image_with_contours, [np.array(current_contour)], isClosed=False, color=(0, 255, 0), thickness=2)
            cv2.circle(image_with_contours, mouse_position, 5, (255, 0, 0), -1)

            # Show the image with contours
            cv2.imshow('Screen with Contours', image_with_contours)
            key = cv2.waitKey(1) & 0xFF

            # Mouse events
            if key == ord('q'):
                break
            elif key == ord('c'):
                # Clear current contour
                current_contour = []
            elif key == ord('s'):
                # Save the cropped image based on the current contour
                if len(current_contour) > 1:
                    contour = np.array(current_contour)
                    save_cropped_image(image, contour, output_folder)
                    print(f"Saving cropped image based on contour: {contour}")
                    break
            elif key == ord('d'):
                # Start or stop drawing
                drawing = not drawing

            # Handle drawing
            if drawing:
                current_mouse_pos = pyautogui.position()
                current_contour.append(current_mouse_pos)

        # Close all windows and exit
        cv2.destroyAllWindows()
        break

if __name__ == '__main__':
    capture_and_draw()
