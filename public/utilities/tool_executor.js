//test tool to open google search in a new tab
async function openGoogle(query) {
    console.log(query);
    // Open new tab with Google search
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
    console.log(`Google search opened with query: ${query}`);

    return {
        "status": "success",
        "message": `Google search completed for ${query}`
    };
}

async function displayComponent(component_id, message, data) {
    console.log(component_id);
    console.log(message);
    console.log(data);

    const component = await fetch(`/api/components/${component_id}`);
    const componentData = await component.json();
    console.log(componentData);

    displayMessage(message, 'ai');

    if (componentData.component_name === 'button-component') {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        buttonContainer.id = 'buttonContainer'
        document.querySelector('.chat-messages').appendChild(buttonContainer);
        
        for (const item of data) {
            console.log(item.button_text);
            // Use a regular expression to replace all occurrences of [ButtonText]
            const button = componentData.component_html.replace(/\[ButtonText\]/g, item.button_text);
            console.log(button);
            buttonContainer.innerHTML += button;

        }

        return {
            "status": "success",
            "message": `Component displayed for ${component_id}. Simply ask the user to select one of the options above` 
        };
    };

    if (componentData.component_name === 'vici-button') {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        buttonContainer.id = 'buttonContainer'
        document.querySelector('.chat-messages').appendChild(buttonContainer);
        
        for (const item of data) {
            console.log(item.button_text);
            // Use a regular expression to replace all occurrences of [ButtonText]
            const button = componentData.component_html.replace(/\[ButtonText\]/g, item.button_text);
            console.log(button);
            buttonContainer.innerHTML += button;

        }

        return {
            "status": "success",
            "message": `Component displayed for ${component_id}. Simply ask the user to select one of the options above` 
        };
    }

    if (componentData.component_name === 'product-component') {
        const productContainer = document.createElement('div');
        productContainer.className = 'product-container';
        productContainer.id = 'productContainer';
        productContainer.style.display = 'flex';
        productContainer.style.flexWrap = 'wrap';
        productContainer.style.justifyContent = 'space-between';
        document.querySelector('.chat-messages').appendChild(productContainer);

        for (const item of data) {
            console.log(item.main_text);
            console.log(item.image);
            console.log(item.button_text);
            console.log(item.button_link);

            const productHTML = componentData.component_html
                .replace(/\[ProductTitle\]/g, item.main_text)
                .replace(/\[ProductImage\]/g, item.image)
                .replace(/\[ProductPrice\]/g, item.price)
                .replace(/\[ButtonText\]/g, item.button_text)
                .replace(/\[ButtonURL\]/g, item.button_link);

            const productItem = document.createElement('div');
            productItem.style.flex = '1 0 30%';
            productItem.style.boxSizing = 'border-box';
            productItem.style.marginBottom = '10px';
            productItem.innerHTML = productHTML;

            productContainer.appendChild(productItem);

        }

        return {
            "status": "success",
            "message": `Component displayed for ${component_id}. The journey is complete. Thank the user for their time and ask them to visit the website. Nothing more.` 
        };
    }

    if (componentData.component_name === 'slide') {
        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'slider-wrapper';
        sliderWrapper.id = 'sliderWrapper';
        document.querySelector('.chat-messages').appendChild(sliderWrapper);

        const slideContainer = document.createElement('div');
        slideContainer.className = 'slider-container';
        slideContainer.id = 'slideContainer';
        sliderWrapper.appendChild(slideContainer);

        const slider = document.createElement('div');
        slider.className = 'slider';
        slider.id = 'slider';
        slideContainer.appendChild(slider);

        for (const item of data) {
            console.log(item.main_text);
            console.log(item.image);
            console.log(item.description);
            console.log(item.button_text);
            console.log(item.button_link);

            const infoHTML = componentData.component_html
                .replace(/\[MainText\]/g, item.main_text)
                .replace(/\[Image\]/g, item.image)
                .replace(/\[Description\]/g, item.description)
                .replace(/\[ButtonText\]/g, item.button_text)
                .replace(/\[ButtonLink\]/g, item.button_link);

            slider.innerHTML += infoHTML;
        }

        slideContainer.innerHTML += `                    <button class="arrow prev">&#10094;</button>
                    <button class="arrow next">&#10095;</button>`

        function initializeSlider(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            const slider = container.querySelector('.slider');
            const slides = container.querySelectorAll('.slide');
            const prevButton = container.querySelector('.prev');
            const nextButton = container.querySelector('.next');
            let currentIndex = 0;

            function updateSlider() {
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
            }

            function prevSlide() {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlider();
            }

            nextButton.addEventListener('click', nextSlide);
            prevButton.addEventListener('click', prevSlide);

            // Optional: Add keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowRight') {
                    nextSlide();
                } else if (e.key === 'ArrowLeft') {
                    prevSlide();
                }
            });

            // Optional: Add touch swipe functionality
            let touchStartX = 0;
            let touchEndX = 0;

            slider.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });

            slider.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                if (touchStartX - touchEndX > 50) {
                    nextSlide();
                } else if (touchEndX - touchStartX > 50) {
                    prevSlide();
                }
            }
        }

        initializeSlider('sliderWrapper');

        return {
            "status": "success",
            "message": `Component displayed for ${component_id}. The journey is complete. Thank the user for their time. Nothing more.` 
        };

    }
}





