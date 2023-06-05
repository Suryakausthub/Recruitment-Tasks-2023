// Function to identify flower using the API
function identifyFlower(imageUrl) {
     // Make an API request to identify the flower
     // Replace 'YOUR_API_KEY' with your actual API key
     const apiKey = 'Flower';
     const apiUrl = `https://plant.id/api/v2`;
     const requestPayload = {
       requests: [
         {
           image: {
             source: {
               imageUri: imageUrl,
             },
           },
           features: [
             {
               type: 'LABEL_DETECTION',
               maxResults: 5,
             },
           ],
         },
       ],
     };
   
     fetch(apiUrl, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(requestPayload),
     })
       .then(response => response.json())
       .then(data => {
         // Process the API response and display the results
         const labels = data.responses[0].labelAnnotations;
         const flowerNames = labels.map(label => label.description);
   
         const identifiedFlower = flowers.find(flower => flowerNames.includes(flower.name));
         if (identifiedFlower) {
           displayFlowerDetails(flowers.indexOf(identifiedFlower));
         } else {
           alert('Flower not recognized.');
         }
       })
       .catch(error => {
         console.error('Error:', error);
         alert('An error occurred while identifying the flower.');
       });
   }
   
   // Function to handle image selection and identification
   function handleImageUpload(event) {
     const file = event.target.files[0];
     const reader = new FileReader();
     
     reader.onload = () => {
       const imageSrc = reader.result;
       identifyFlower(imageSrc);
     };
     
     reader.readAsDataURL(file);
   }
   
   // Update the HTML structure to include the file input element
   <body>
     <header>
       <h1>Flower Identification</h1>
     </header>
     
     <main>
       <input type="file" accept="image/*" id="image-upload">
       
       <section id="gallery">
         <!-- Flower images will be dynamically added here -->
       </section>
       
       <section id="details" class="hidden">
         <h2>Flower Details</h2>
         <div id="flower-image"></div>
         <div id="flower-info"></div>
       </section>
     </main>
   </body>
   
   {/* /Add an event listener to the file input element */}
   const imageUpload = document.getElementById('image-upload');
   imageUpload.addEventListener('change', handleImageUpload);
   