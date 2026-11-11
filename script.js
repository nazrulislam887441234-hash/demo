/* ==========================================================================
   CENTRAL CONFIGURATION SYSTEM
   ========================================================================== */

// WEBSITE BRANDING
const PAGE_LOGO_LINK = "https://i.ibb.co.com/HThdSd2n/pm-1792905066426-cmp.jpg";
const FACEBOOK_PAGE_NAME = "Japan Saree Collection";
const FACEBOOK_PAGE_LOGO_LINK = "https://i.ibb.co.com/HThdSd2n/pm-1792905066426-cmp.jpg";

// PRODUCT INFORMATION
const PRODUCT_NAME = "জাপানের সেরা শাড়ি এখন বাংলাদেশে। প্রিমিয়াম জানদানি শাড়ি।";
const PRODUCT_PRICE = 1999;
const PRODUCT_OLD_PRICE = 2399;
const PRODUCT_DESCRIPTIONS = `প্রিমিয়াম জাপানি সুতায় তৈরি এক্সক্লুসিভ ও আকর্ষণীয় জামদানি শাড়ি!

রুচিশীলতা, আভিজাত্য ও ঐতিহ্যের এক অপূর্ব সমন্বয়ে তৈরি আমাদের এই এক্সক্লুসিভ জামদানি শাড়ি। প্রিমিয়াম মানের জাপানি সুতা ব্যবহার করে অত্যন্ত যত্নসহকারে প্রস্তুত করা হয়েছে শাড়িটি, যা আপনাকে দেবে এক অনন্য সৌন্দর্য ও মার্জিত ফ্যাশনের অনুভূতি।

শাড়িটির আকর্ষণীয় ডিজাইন, সূক্ষ্ম কারুকাজ এবং নিখুঁত ফিনিশিং প্রতিটি অংশকে করে তুলেছে আরও বেশি দৃষ্টিনন্দন ও অভিজাত। যারা পোশাকে আভিজাত্য, সৌন্দর্য এবং রুচিশীলতার ছোঁয়া পছন্দ করেন, তাদের জন্য এটি হতে পারে দারুণ একটি পছন্দ।

যেসব বিশেষ মুহূর্তে পরতে পারবেন:

- বিয়ে ও বউভাতের অনুষ্ঠানে।
- যেকোনো পার্টি ও সামাজিক অনুষ্ঠানে।
- ঈদ, পূজা ও বিভিন্ন উৎসবে।
- জন্মদিন ও বিশেষ আয়োজনে।
- প্রিয়জনকে বিশেষ উপহার দেওয়ার জন্য।

শুধু একটি শাড়ি নয়, বরং আপনার ব্যক্তিত্ব ও রুচিশীলতাকে আরও সুন্দরভাবে ফুটিয়ে তোলার একটি চমৎকার আয়োজন।

নিজের জন্য কিংবা প্রিয়জনের জন্য বেছে নিন এই এক্সক্লুসিভ জামদানি শাড়ি। ঐতিহ্যবাহী সৌন্দর্যে হয়ে উঠুন আরও আকর্ষণীয় ও মার্জিত।`;

// MULTIPLE PRODUCT IMAGES
const PRODUCT_IMAGE_LINK = [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80"
];

// BACKGROUND REMOVED PRODUCT IMAGE
const BACKGROUND_REMOVE_PRODUCT_IMAGW = "https://i.ibb.co.com/gb1z4Mx7/41027-Photoroom.png";

// CONTACT
const WHATSAPP_NUMBER = "8801727003670";
const PHONE_NUMBER = "01727003670";

// BACKEND
const WORKER_LINK = "";

// FIREBASE CONFIGURATION
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDaUdMSomHBqc8nr7fYqlOBS3qFq2oQCl8",
  authDomain: "landing-page-67d8d.firebaseapp.com",
  projectId: "landing-page-67d8d",
  storageBucket: "landing-page-67d8d.firebasestorage.app",
  messagingSenderId: "626014039530",
  appId: "1:626014039530:web:c77971a179e04fcefbd693",
  measurementId: "G-FTNTB59K7F"
};
// FIREBASE COLLECTION
const ORDER_COLLECTION = "orders";

// WEBSITE SETTINGS
const CURRENCY = "৳";
const DELIVERY_INSIDE_DHAKA = 70;
const DELIVERY_OUTSIDE_DHAKA = 130;

/* ==========================================================================
   STATE MANAGEMENT & FIREBASE INIT
   ========================================================================== */

let currentQuantity = 1;
let selectedImageIndex = 0;
let isFirebaseActive = false;
let db = null;
let serverTimestampFunc = null;
let addDocFunc = null;
let collectionFunc = null;

// Check Firebase Readiness (Mode Identification)
const isFirebaseConfigured = () => {
    return Boolean(FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId && FIREBASE_CONFIG.apiKey.trim() !== "");
};

// Async Initialization of Firebase Modular SDK
async function initBackend() {
    if (isFirebaseConfigured() && !WORKER_LINK) {
        try {
            const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
            const { getFirestore, collection, addDoc, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
            
            const app = initializeApp(FIREBASE_CONFIG);
            db = getFirestore(app);
            collectionFunc = collection;
            addDocFunc = addDoc;
            serverTimestampFunc = serverTimestamp;
            isFirebaseActive = true;
            console.log("Firebase Modular SDK initialized successfully.");
        } catch (err) {
            console.warn("Firebase initialization failed, falling back to DEMO Mode:", err);
            isFirebaseActive = false;
        }
    } else {
        isFirebaseActive = false;
        console.log("Running in DEMO MODE or Cloudflare Worker Mode.");
    }
}

/* ==========================================================================
   DYNAMIC UI RENDERING
   ========================================================================== */

document.addEventListener("DOMContentLoaded", async () => {
    await initBackend();
    renderBrandingAndMeta();
    renderProductInfo();
    renderGalleryAndVariants();
    calculateAndRenderSummary();
    setupEventListeners();
});

// 1. Render Branding, Logo, and SEO
function renderBrandingAndMeta() {
    document.getElementById("seo-title").innerText = PRODUCT_NAME;
    document.getElementById("seo-description").setAttribute("content", PRODUCT_DESCRIPTIONS.substring(0, 150));
    document.getElementById("og-title").setAttribute("content", PRODUCT_NAME);
    document.getElementById("og-description").setAttribute("content", PRODUCT_DESCRIPTIONS.substring(0, 150));
    document.getElementById("og-image").setAttribute("content", PRODUCT_IMAGE_LINK[0] || "");

    // Navbar & Logos
    document.getElementById("nav-logo").src = PAGE_LOGO_LINK;
    document.getElementById("nav-brand-name").innerText = FACEBOOK_PAGE_NAME;
    document.getElementById("footer-logo").src = PAGE_LOGO_LINK;
    document.getElementById("footer-brand-name").innerText = FACEBOOK_PAGE_NAME;
    document.getElementById("footer-year").innerText = new Date().getFullYear();

    // Contact Links
    document.getElementById("nav-phone-btn").href = `tel:${PHONE_NUMBER}`;
    document.getElementById("footer-phone").innerText = PHONE_NUMBER;
    document.getElementById("footer-whatsapp").innerText = WHATSAPP_NUMBER;
    document.getElementById("floating-call").href = `tel:${PHONE_NUMBER}`;

    // WhatsApp Message Generation
    const waMsg = encodeURIComponent(`আমি এই পণ্যটা কিনতে চাই: ${PRODUCT_NAME}`);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;
    document.getElementById("whatsapp-hero-btn").href = waUrl;
    document.getElementById("floating-whatsapp").href = waUrl;
}

// 2. Render Product Information & Auto Discounts
function renderProductInfo() {
    document.getElementById("product-title").innerText = PRODUCT_NAME;
    document.getElementById("current-price").innerText = `${CURRENCY} ${PRODUCT_PRICE.toLocaleString('bn-BD')}`;
    document.getElementById("old-price").innerText = `${CURRENCY} ${PRODUCT_OLD_PRICE.toLocaleString('bn-BD')}`;
    document.getElementById("sticky-price").innerText = `${CURRENCY} ${PRODUCT_PRICE.toLocaleString('bn-BD')}`;

    // Discount Calculation
    const discountAmount = PRODUCT_OLD_PRICE - PRODUCT_PRICE;
    const discountPercentage = Math.round((discountAmount / PRODUCT_OLD_PRICE) * 100);

    if (discountAmount > 0) {
        document.getElementById("discount-badge").innerText = `${discountPercentage}% ছাড়`;
        document.getElementById("discount-save").innerText = `সাশ্রয় ${CURRENCY} ${discountAmount.toLocaleString('bn-BD')}`;
    } else {
        document.getElementById("discount-badge").style.display = "none";
        document.getElementById("discount-save").style.display = "none";
    }

    document.getElementById("product-description").innerText = PRODUCT_DESCRIPTIONS;

    // Background Removed Image Animation Fallback
    const bgImgElement = document.getElementById("floating-bg-img");
    if (BACKGROUND_REMOVE_PRODUCT_IMAGW && BACKGROUND_REMOVE_PRODUCT_IMAGW.trim() !== "") {
        bgImgElement.src = BACKGROUND_REMOVE_PRODUCT_IMAGW;
    } else {
        bgImgElement.src = PRODUCT_IMAGE_LINK[0] || "";
    }
}

// 3. Render Image Gallery & Form Variants
function renderGalleryAndVariants() {
    const mainImg = document.getElementById("main-product-img");
    const thumbContainer = document.getElementById("thumbnail-list");
    const variantContainer = document.getElementById("variant-selector");

    thumbContainer.innerHTML = "";
    variantContainer.innerHTML = "";

    if (PRODUCT_IMAGE_LINK.length > 0) {
        mainImg.src = PRODUCT_IMAGE_LINK[0];

        PRODUCT_IMAGE_LINK.forEach((imgUrl, idx) => {
            // Render Gallery Thumbnails
            const thumb = document.createElement("img");
            thumb.src = imgUrl;
            thumb.classList.add("thumb-item");
            if (idx === 0) thumb.classList.add("active");
            thumb.addEventListener("click", () => switchMainImage(idx));
            thumbContainer.appendChild(thumb);

            // Render Form Variant Image Picker
            const variantDiv = document.createElement("div");
            variantDiv.classList.add("variant-option");
            if (idx === 0) variantDiv.classList.add("selected");
            variantDiv.innerHTML = `<img src="${imgUrl}" alt="Variant ${idx + 1}">`;
            variantDiv.addEventListener("click", () => selectVariantImage(idx));
            variantContainer.appendChild(variantDiv);
        });
    }
}

function switchMainImage(index) {
    selectedImageIndex = index;
    document.getElementById("main-product-img").src = PRODUCT_IMAGE_LINK[index];
    const thumbs = document.querySelectorAll(".thumb-item");
    thumbs.forEach((t, i) => t.classList.toggle("active", i === index));
    selectVariantImage(index);
}

function selectVariantImage(index) {
    selectedImageIndex = index;
    const variants = document.querySelectorAll(".variant-option");
    variants.forEach((v, i) => v.classList.toggle("selected", i === index));
    document.getElementById("main-product-img").src = PRODUCT_IMAGE_LINK[index];
}

// 4. Calculate Summary Amounts
function calculateAndRenderSummary() {
    const deliveryArea = document.querySelector('input[name="delivery_area"]:checked').value;
    const deliveryCharge = deliveryArea === "inside" ? DELIVERY_INSIDE_DHAKA : DELIVERY_OUTSIDE_DHAKA;

    const subtotal = PRODUCT_PRICE * currentQuantity;
    const grandTotal = subtotal + deliveryCharge;

    document.getElementById("price-inside").innerText = `${CURRENCY} ${DELIVERY_INSIDE_DHAKA}`;
    document.getElementById("price-outside").innerText = `${CURRENCY} ${DELIVERY_OUTSIDE_DHAKA}`;

    document.getElementById("sum-prod-name").innerText = `${PRODUCT_NAME.substring(0, 30)}...`;
    document.getElementById("sum-prod-calc").innerText = `${CURRENCY} ${PRODUCT_PRICE} x ${currentQuantity} = ${CURRENCY} ${subtotal}`;
    document.getElementById("sum-delivery").innerText = `${CURRENCY} ${deliveryCharge}`;
    document.getElementById("sum-total").innerText = `${CURRENCY} ${grandTotal}`;
}

/* ==========================================================================
   EVENT LISTENERS & INTERACTION
   ========================================================================== */

function setupEventListeners() {
    // Quantity Controls
    document.getElementById("qty-plus").addEventListener("click", () => {
        currentQuantity++;
        document.getElementById("qty-val").innerText = currentQuantity;
        calculateAndRenderSummary();
    });

    document.getElementById("qty-minus").addEventListener("click", () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            document.getElementById("qty-val").innerText = currentQuantity;
            calculateAndRenderSummary();
        }
    });

    // Delivery Radio Change
    document.querySelectorAll('input[name="delivery_area"]').forEach(radio => {
        radio.addEventListener("change", calculateAndRenderSummary);
    });

    // Image Zoom Modal
    document.getElementById("zoom-trigger").addEventListener("click", () => {
        const modal = document.getElementById("lightbox-modal");
        document.getElementById("lightbox-img").src = PRODUCT_IMAGE_LINK[selectedImageIndex];
        modal.classList.add("show");
    });

    document.getElementById("close-lightbox").addEventListener("click", () => {
        document.getElementById("lightbox-modal").classList.remove("show");
    });

    // Modal Close Button
    document.getElementById("modal-close-btn").addEventListener("click", () => {
        document.getElementById("confirmation-modal").classList.remove("show");
    });

    // Back to Top Button visibility
    window.addEventListener("scroll", () => {
        const topBtn = document.getElementById("back-to-top");
        if (window.scrollY > 300) {
            topBtn.style.display = "flex";
        } else {
            topBtn.style.display = "none";
        }
    });

    document.getElementById("back-to-top").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Form Submission
    document.getElementById("checkout-form").addEventListener("submit", handleOrderSubmit);
}

/* ==========================================================================
   FORM VALIDATION & SUBMISSION HANDLER
   ========================================================================== */

function validateFormInputs(data) {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll(".error-msg").forEach(e => e.innerText = "");
    document.querySelectorAll(".form-control").forEach(e => e.classList.remove("invalid"));

    if (!data.name.trim()) {
        showFieldError("cust-name", "err-name", "আপনার নাম দেওয়া আবশ্যক");
        isValid = false;
    }

    // Bangladeshi Mobile Validation: 11 digits starting with 01
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(data.phone.trim())) {
        showFieldError("cust-phone", "err-phone", "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)");
        isValid = false;
    }

    if (!data.vibag.trim()) {
        showFieldError("cust-vibag", "err-vibag", "বিভাগের নাম লিখুন");
        isValid = false;
    }

    if (!data.jela.trim()) {
        showFieldError("cust-jela", "err-jela", "জেলার নাম লিখুন");
        isValid = false;
    }

    if (!data.upojela.trim()) {
        showFieldError("cust-upojela", "err-upojela", "উপজেলা/থানার পূর্ণাঙ্গ ঠিকানা দিন");
        isValid = false;
    }

    return isValid;
}

function showFieldError(inputId, errorId, message) {
    document.getElementById(inputId).classList.add("invalid");
    document.getElementById(errorId).innerText = message;
}

async function handleOrderSubmit(e) {
    e.preventDefault();

    const deliveryArea = document.querySelector('input[name="delivery_area"]:checked').value;
    const deliveryCharge = deliveryArea === "inside" ? DELIVERY_INSIDE_DHAKA : DELIVERY_OUTSIDE_DHAKA;
    const totalAmount = (PRODUCT_PRICE * currentQuantity) + deliveryCharge;
    const selectedProductImg = PRODUCT_IMAGE_LINK[selectedImageIndex] || "";

    const formData = {
        name: document.getElementById("cust-name").value,
        phone: document.getElementById("cust-phone").value,
        vibag: document.getElementById("cust-vibag").value,
        jela: document.getElementById("cust-jela").value,
        upojela: document.getElementById("cust-upojela").value,
        note: document.getElementById("cust-note").value,
        productName: PRODUCT_NAME,
        productPrice: PRODUCT_PRICE,
        productImage: selectedProductImg,
        quantity: currentQuantity,
        deliveryCharge: deliveryCharge,
        totalAmount: totalAmount
    };

    if (!validateFormInputs(formData)) {
        showToast("অনুগ্রহ করে ফর্মের ভুলগুলো সংশোধন করুন।");
        return;
    }

    setSubmitLoadingState(true);

    // MODE A: DEMO MODE or WORKER INTERACTION / REAL FIREBASE
    try {
        if (WORKER_LINK && WORKER_LINK.trim() !== "") {
            // Cloudflare Worker API Path
            const response = await fetch(WORKER_LINK, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const result = await response.json();

            if (response.ok && result.success) {
                showOrderConfirmationModal(true, formData, "WORKER");
                resetCheckoutForm();
            } else {
                throw new Error(result.message || "সার্ভার থেকে অর্ডার সম্পন্ন করা যায়নি।");
            }

        } else if (isFirebaseActive && db) {
            // MODE B: REAL FIREBASE MODE
            const payload = {
                ...formData,
                createdAt: serverTimestampFunc()
            };

            await addDocFunc(collectionFunc(db, ORDER_COLLECTION), payload);
            showOrderConfirmationModal(true, formData, "FIREBASE");
            resetCheckoutForm();

        } else {
            // MODE A: DEMO MODE FALLBACK
            setTimeout(() => {
                showOrderConfirmationModal(true, formData, "DEMO");
                resetCheckoutForm();
            }, 1000);
        }

    } catch (err) {
        console.error("Order submission failure:", err);
        showOrderConfirmationModal(false, formData, err.message);
    } finally {
        setSubmitLoadingState(false);
    }
}

function setSubmitLoadingState(isLoading) {
    const btn = document.getElementById("submit-order-btn");
    const text = document.getElementById("btn-text");
    const spinner = document.getElementById("btn-spinner");

    if (isLoading) {
        btn.disabled = true;
        text.classList.add("hidden");
        spinner.classList.remove("hidden");
    } else {
        btn.disabled = false;
        text.classList.remove("hidden");
        spinner.classList.add("hidden");
    }
}

function resetCheckoutForm() {
    document.getElementById("checkout-form").reset();
    currentQuantity = 1;
    document.getElementById("qty-val").innerText = "1";
    calculateAndRenderSummary();
}

/* ==========================================================================
   CONFIRMATION MODAL & TOAST NOTIFICATIONS
   ========================================================================== */

function showOrderConfirmationModal(isSuccess, data, modeType = "") {
    const modal = document.getElementById("confirmation-modal");
    const icon = document.getElementById("modal-status-icon");
    const title = document.getElementById("modal-title");
    const body = document.getElementById("modal-body-content");

    if (isSuccess) {
        icon.className = "status-icon success";
        icon.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
        
        if (modeType === "DEMO") {
            title.innerText = "অর্ডার রিকোয়েস্ট গৃহীত (ডেমো মোড)";
            body.innerHTML = `
                <p style="color: red; font-weight: bold; margin-bottom: 8px;">[ডেমো নোটিশ] Demo Order সফল হয়েছে। এটি বাস্তব অর্ডার নয় এবং Firebase-এ সংরক্ষিত হয়নি।</p>
                <hr style="margin: 8px 0;">
                <p><strong>পণ্যের নাম:</strong> ${data.productName}</p>
                <p><strong>গ্রাহকের নাম:</strong> ${data.name}</p>
                <p><strong>মোবাইল:</strong> ${data.phone}</p>
                <p><strong>মোট পরিমাণ:</strong> ${CURRENCY} ${data.totalAmount}</p>
            `;
        } else {
            title.innerText = "আপনার অর্ডারটি সফলভাবে কনফার্ম হয়েছে!";
            body.innerHTML = `
                <p>ধন্যবাদ <strong>${data.name}</strong>, আমরা আপনার অর্ডারটি পেয়েছি। খুব শীঘ্রই আমাদের প্রতিনিধি কল করে কনফার্ম করবেন।</p>
                <hr style="margin: 8px 0;">
                <p><strong>পণ্যের নাম:</strong> ${data.productName}</p>
                <p><strong>মোবাইল:</strong> ${data.phone}</p>
                <p><strong>ঠিকানা:</strong> ${data.upojela}, ${data.jela}, ${data.vibag}</p>
                <p><strong>সর্বমোট মূল্য:</strong> ${CURRENCY} ${data.totalAmount} (ক্যাশ অন ডেলিভারি)</p>
            `;
        }
    } else {
        icon.className = "status-icon error";
        icon.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
        title.innerText = "অর্ডার ব্যর্থ হয়েছে!";
        body.innerHTML = `
            <p>দুঃখিত, আপনার অর্ডারটি জমা করা সম্ভব হয়নি।</p>
            <p><small>কারণ: ${modeType || "নেটওয়ার্ক ত্রুটি অথবা ফায়ারবেস কনফিগারেশন অনুপস্থিত।"}</small></p>
            <p>অনুগ্রহ করে পুনরায় চেষ্টা করুন অথবা সরাসরি আমাদের ফোন/হোয়াটসঅ্যাপে যোগাযোগ করুন।</p>
        `;
    }

    modal.classList.add("show");
}

function showToast(message) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3500);
}
