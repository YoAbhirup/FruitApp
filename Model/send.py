import cv2
import numpy as np
import websocket
import time

# Load YOLO
net = cv2.dnn.readNet("yolov3.weights", "yolov3.cfg")

# Define classes we're interested in
CLASSES_OF_INTEREST = ["bicycle", "car", "motorbike", "bus", "truck"]

# Initialize webcam
cap = cv2.VideoCapture(0)

def detect_vehicle():
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        height, width, _ = frame.shape
        blob = cv2.dnn.blobFromImage(frame, 1/255, (416, 416), swapRB=True, crop=False)
        net.setInput(blob)
        output_layers_names = net.getUnconnectedOutLayersNames()
        layerOutputs = net.forward(output_layers_names)

        for output in layerOutputs:
            for detection in output:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]
                if confidence > 0.9 and CLASSES_OF_INTEREST[class_id] in CLASSES_OF_INTEREST:
                    return CLASSES_OF_INTEREST[class_id]

        cv2.imshow('Vehicle Detection', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    return None

HOST = "192.168.110.118"
PORT = 8080

def send_data():
    try:
        print(f"Attempting to connect to WebSocket server at ws://{HOST}:{PORT}")
        ws = websocket.create_connection(f"ws://{HOST}:{PORT}")
        print(f"Connected to WebSocket server at ws://{HOST}:{PORT}")

        while True:
            vehicle = detect_vehicle()
            if vehicle:
                ws.send(vehicle)
                print(f"Sent message: {vehicle}")

                try:
                    response = ws.recv()
                    print(f"Server response: {response}")
                except Exception as recv_error:
                    print(f"Error receiving response: {recv_error}")
            
            time.sleep(1)

    except Exception as e:
        print(f"Error: {e}")
    finally:
        cap.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    send_data()
