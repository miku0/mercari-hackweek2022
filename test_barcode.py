import cv2
import winsound
from pyzbar.pyzbar import decode
import time

cap = cv2.VideoCapture(0)
font = cv2.FONT_HERSHEY_SIMPLEX
barcodes = []
def ReadBarcode():
    while cap.isOpened():
        time.sleep(1)
        ret, frame = cap.read()
        time.sleep(1)
        if ret:
            decoded_frame = decode(frame)
            if decoded_frame:
                for barcode in decoded_frame:
                    barcodeData = barcode.data.decode('utf-8')
                    barcodes.append(barcodeData)
                    #winsound.Beep(2000, 50)
                    font_color = (0, 0, 255)
                    x, y, w, h = barcode.rect
                    cv2.rectangle(frame, (x, y), (x + w, y + h), font_color, 2)
                    #frame = cv2.putText(frame, barcodeData, (x, y - 10), font, .5, font_color, 2, cv2.LINE_AA)

        cv2.imshow('BARCODE READER', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cap.release()
    number = 0
    for i in range(len(barcodes)):
        if int(barcodes[i])>number:
            number = int(barcodes[i])
    return number


if __name__ == "__main__":
    print(ReadBarcode())