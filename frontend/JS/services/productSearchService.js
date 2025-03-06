import Quagga from 'quagga';

export const productSearchService = {

  initQuagga() {
    // Initialize Quagga for live scanning
    // Handle detected barcodes
    Quagga.onDetected(data => {
      console.log("Barcode detected:", data.codeResult.code);
    });
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner') // HTML element to display camera feed
      },
      decoder: {
        readers: ["code_128_reader"] // Add more readers if needed
      }
    }, function(err) {
      if (err) {
        console.error("QuaggaJS initialization error:", err);
        return;
      }
      Quagga.start();
    });
  },
}