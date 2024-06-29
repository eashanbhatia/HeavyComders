import cv2
import pygame
import numpy as np
from pygame.locals import *
from PIL import ImageGrab
import os
import shutil
# Initialize Pygame
pygame.init()
pygame.mouse.set_cursor(pygame.SYSTEM_CURSOR_CROSSHAIR)
save_dir = 'cropped_images'


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

output_folder = 'C:/Users/Eashan/Desktop/amazonhackon/server/cropped_images'  
os.makedirs(output_folder, exist_ok=True)  


def save_cropped_image(image, contour, output_folder):
    
    x, y, w, h = cv2.boundingRect(contour)
    
    
    cropped_image = image[y:y+h, x:x+w]

    
    output_path = os.path.join(output_folder, 'cropped_image.png')

    
    cv2.imwrite(output_path, cropped_image)
    print(f"Cropped image saved as {output_path}")


screen_capture = ImageGrab.grab()
screen_capture_np = np.array(screen_capture)
screen_capture_np = cv2.cvtColor(screen_capture_np, cv2.COLOR_RGB2BGR)

image = screen_capture_np
image_height, image_width, _ = image.shape


screen = pygame.display.set_mode((image_width, image_height))


image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
image_surface = pygame.surfarray.make_surface(image_rgb.transpose(1, 0, 2))  

drawing = False
mouse_position = (0, 0)
current_contour = []


running = True
while running:
    # Display the image in the Pygame window
    screen.blit(image_surface, (0, 0))

    # Handle drawing contours
    for event in pygame.event.get():
        if event.type == QUIT:
            running = False
        elif event.type == MOUSEBUTTONDOWN:
            if event.button == 1:  # Left mouse button down
                drawing = True
                current_contour = [event.pos]  # Start a new contour
        elif event.type == MOUSEMOTION:
            if drawing:
                current_contour.append(event.pos)
        elif event.type == MOUSEBUTTONUP:
            if event.button == 1:  # Left mouse button up
                drawing = False
                current_contour.append(event.pos)
                # Save the cropped image and quit
                contour = np.array(current_contour)
                save_cropped_image(image, contour, output_folder)
                print(f"Saving cropped image based on contour: {contour}")
                running = False  # Exit the main loop

    
    if len(current_contour) > 1:
        pygame.draw.lines(screen, (0, 188, 255), False, current_contour, 2)

    mouse_position = pygame.mouse.get_pos()
    pygame.draw.circle(screen, (255, 0, 0), mouse_position, 5)

    pygame.display.flip()

pygame.quit()
