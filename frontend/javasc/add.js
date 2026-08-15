


async function fetchOwnerGymId() {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('User is not authenticated. Please log in.');
        }

        const response = await fetch('http://localhost:3000/gym/my-gym', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.message || 'Failed to fetch gym.');
        }

        const gym = await response.json();
        if (!gym || !gym.id) {
            throw new Error('No gym found for this owner.');
        }

        console.log('Gym ID:', gym.id);
        console.log('Owner ID:', gym.ownerId); // Assuming `gym` contains an `ownerId` field
        return { gymId: gym.id, ownerId: gym.ownerId }; 
    } catch (error) {
        console.error('Error fetching gym ID:', error);
        alert(`Failed to fetch gym ID: ${error.message}`);
        return null;
    }
}

async function uploadImage(file) {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('User is not authenticated. Please log in.');
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:3000/gym/upload-image', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.message || 'Image upload failed.');
        }

        const result = await response.json();
        console.log('Image uploaded:', result);
        alert('Image uploaded successfully!');
    } catch (error) {
        console.error('Error uploading image:', error);
        alert(`Failed to upload image: ${error.message}`);
    }
}



// Store files for later upload (after gym creation)
let pendingImageFiles = [];

async function loadImage(input, index) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function (e) {
            const img = document.getElementById(`img${index + 1}`);
            img.src = e.target.result;
            img.style.display = 'block';
            
            // Store the file for later upload (after gym is created)
            // Don't upload immediately - wait for gym creation
            pendingImageFiles[index] = file;
        };
        reader.readAsDataURL(file);
    }
}

// Upload image file (called after gym creation)
async function uploadImageFile(file) {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('User is not authenticated. Please log in.');
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:3000/gym/upload-image', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.message || 'Image upload failed.');
        }

        const result = await response.json();
        console.log('Image uploaded:', result);
        return result;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}




function addServiceField(){
    
    const container=document.getElementById('service-container');
    const serviceField=document.createElement('div');
    serviceField.innerHTML=`
    <div>
   
    <input type="text" placeholder="Enter service title">
    </div>
    <div>
  
    <textarea row="10" placeholder="Enter service description "></textarea>
    </div>
    <button onclick="removeServiceField(this)">Remove Service</button>
   `;
   container.appendChild(serviceField);
}
function removeServiceField(button){
    button.parentNode.remove();
}

function addPricingField(){
    
    const container=document.getElementById('pricing-container')
    const pricingField=document.createElement('div');

    pricingField.innerHTML=`
           <div>
            <input type="text" placeholder="Enter plan name">
        </div>
        <div>
            <input type="text" placeholder="Enter plan price">
        </div>
        <div>
            <textarea rows="10" placeholder="Enter plan details"></textarea>
        </div>
        <button onclick="removePricingField(this)">Remove Pricing Plan</button>
    `;
    container.appendChild(pricingField)
}

function removePricingField(button){
    button.parentNode.remove()
}

function addFAQField(){
  
    const container=document.getElementById("faq-container");
    const faqField=document.createElement('div')

    faqField.innerHTML= `
         <div>
            
            <input type="text"  placeholder="Enter the question">
        </div>
        <div>
         
            <textarea name="answer" rows="10" placeholder="Enter the answer"></textarea>
        </div>
        <button onclick="removeFAQField(this)">Remove FAQ</button>
    `;
    container.appendChild(faqField)
}
function removeFAQField(button) {
    button.parentNode.remove();
}