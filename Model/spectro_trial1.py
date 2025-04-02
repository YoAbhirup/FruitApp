import cv2
import numpy as np
import os
from datetime import datetime

# Load YOLO
net = cv2.dnn.readNet("yolov3.weights", "yolov3.cfg")

# Define all YOLO classes
ALL_CLASSES = [
    "person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat",
    "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
    "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack",
    "umbrella", "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball",
    "kite", "baseball bat", "baseball glove", "skateboard", "surfboard", "tennis racket",
    "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple",
    "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake", "chair",
    "sofa", "pottedplant", "bed", "diningtable", "toilet", "tvmonitor", "laptop", "mouse",
    "remote", "keyboard", "cell phone", "microwave", "oven", "toaster", "sink", "refrigerator",
    "book", "clock", "vase", "scissors", "teddy bear", "hair drier", "toothbrush"
]

# Define classes we're interested in
CLASSES_OF_INTEREST = ["banana", "apple", "orange", "carrot", "broccoli"]

# Initialize webcam
cap = cv2.VideoCapture(0)

def detect_fruit():
    while True:
        # Capture frame-by-frame
        ret, frame = cap.read()
        if not ret:
            break

        # Get frame dimensions
        height, width, _ = frame.shape

        # Create blob from frame
        blob = cv2.dnn.blobFromImage(frame, 1/255, (416, 416), swapRB=True, crop=False)

        # Set input to the network
        net.setInput(blob)

        # Get output layer names
        output_layers_names = net.getUnconnectedOutLayersNames()

        # Forward pass
        layerOutputs = net.forward(output_layers_names)

        # Process each output layer
        for output in layerOutputs:
            for detection in output:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]
                if confidence > 0.9 and ALL_CLASSES[class_id] in CLASSES_OF_INTEREST:
                    # Take a snapshot
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    filename = f"fruit_{ALL_CLASSES[class_id]}_{timestamp}.jpg"
                    cv2.imwrite(filename, frame)
                    print(f"Snapshot saved as {filename}")
                    return ALL_CLASSES[class_id]

        # Display the resulting frame
        cv2.imshow('Fruit Detection', frame)
        
        # Break loop when 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    return None

# Detect fruit
detected_fruit = detect_fruit()

# Release resources
cap.release()
cv2.destroyAllWindows()

# Print result
if detected_fruit:
    print(f"Detected fruit: {detected_fruit}")
else:
    print("No fruit detected with confidence above 0.9")
