const imageInput = document.getElementById('image-input');
const outputFormatSelect = document.getElementById('output-format');
const convertButton = document.getElementById('convert-button');
const downloadLink = document.getElementById('download-link');
const downloadContainer = document.getElementById('download-container');
const errorMessage = document.getElementById('error-message');

convertButton.addEventListener('click', handleConversion);

function handleConversion() {
  const file = imageInput.files[0];
  if (!file) {
    errorMessage.textContent = 'Please select an image.';
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const resizedImageData = convertImage(img, outputFormatSelect.value);
      if (resizedImageData) {
        downloadContainer.style.display = 'block'; // Show download link
        downloadLink.href = resizedImageData; // Set download link URL
        downloadLink.download = `${file.name.split('.')[0]}.${outputFormatSelect.value}`; // Set download filename
        errorMessage.textContent = ''; // Clear error message
      } else {
        errorMessage.textContent = 'Conversion failed. Please check the selected format.';
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function convertImage(image, outputFormat) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  try {
    return canvas.toDataURL(`image/${outputFormat}`); // Attempt conversion based on chosen format
  } catch (error) {
    console.error('Conversion error:', error);
    return null; // Return null to indicate failure
  }
}
