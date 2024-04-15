const imageUrlInput = document.getElementById('imageUrl');
const downloadFormatSelect = document.getElementById('downloadFormat');
const downloadButton = document.getElementById('downloadButton');

downloadButton.addEventListener('click', async () => {
  const url = imageUrlInput.value;
  const format = downloadFormatSelect.value;

  // Check if URL is valid (optional)

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    const filename = url.split('/').pop(); // Extract filename from URL

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename.split('.')[0]}.${format}`;
    link.click();

    // Cleanup created object URL
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading image:", error);
    // Handle errors (optional - display error message to user)
  }
});
