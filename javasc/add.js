function loadImage(input,index){
    const file=input.files[0]
    if (file){
        const reader=new FileReader()
        reader.onload=function(e){
            const img=document.getElementById(`img${index+1}`);
            img.src=e.target.result;
            img.style.display='block'
        }
        reader.readAsDataURL(file)
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
  
    <textarea row="3" placeholder="Enter service description "></textarea>
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
            <textarea rows="3" placeholder="Enter plan details"></textarea>
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
         
            <textarea name="answer" rows="3" placeholder="Enter the answer"></textarea>
        </div>
        <button onclick="removeFAQField(this)">Remove FAQ</button>
    `;
    container.appendChild(faqField)
}
function removeFAQField(button) {
    button.parentNode.remove();
}
