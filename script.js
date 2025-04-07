document.addEventListener("DOMContentLoaded", () => {
  const foldedLetter = document.getElementById("foldedLetter");
  const backTextElement = document.querySelector(".letter-back .back-text");
  const frontUnfoldedElement = document.querySelector(".letter-front-unfolded");

  // --- Name Mapping (IDs 1 to 48) ---
  // Array is 0-indexed, so ID 1 corresponds to index 0, etc.
  const namesList = [
    /* 1 */ "جناب آقای دکتر مصطفی مهر آیین",
    /* 2 */ "جناب آقای دکتر مهدی مطهرنیا",
    /* 3 */ "جناب آقای دکتر ناصر زرافشان",
    /* 4 */ "جناب آقای دکتر محمد حسین بنی‌اسدی",
    /* 5 */ "جناب آقای مهندس محمد توسلی",
    /* 6 */ "جناب آقای مهندس ابوالفضل بازرگان",
    /* 7 */ "جناب آقای دکتر سیف‌زاده",
    /* 8 */ "جناب آقای مهندس لطف‌الله میثمی",
    /* 9 */ "جناب آقای دکتر حبیب‌الله پیمان",
    /* 10 */ "جناب آقای دکتر منوچهر کیهانی",
    /* 11 */ "جناب آقای مهندس علی‌اصغر گلسرخی",
    /* 12 */ "جناب آقای دکتر رحمان کارگشا",
    /* 13 */ "جناب آقای دکتر فریدون سحابی",
    /* 14 */ "جناب آقای دکتر هوشنگ طالع",
    /* 15 */ "جناب آقای دکتر فرهاد میثمی",
    /* 16 */ "جناب آقای دکتر محمد حسین رفیعی",
    /* 17 */ "جناب آقای مهندس محمد حسین شاه‌اویسی",
    /* 18 */ "جناب آقای محمدعلی دادخواه",
    /* 19 */ "جناب آقای ابوذر علوی",
    /* 20 */ "جناب آقای عبدالفتاح سلطانی",
    /* 21 */ "جناب آقای رویین عطوفت",
    /* 22 */ "جناب آقای مسعود بوستانی",
    /* 23 */ "جناب آقای حسین سربندی",
    /* 24 */ "جناب آقای حامد سحابی",
    /* 25 */ "جناب آقای فرشید افشار",
    /* 26 */ "جناب آقای حسین اخوان یزدی",
    /* 27 */ "جناب آقای محمود امامی",
    /* 28 */ "جناب آقای محمد محمدی اردهالی",
    /* 29 */ "جناب آقای احمد غضنفرپور",
    /* 30 */ "جناب آقای امیر طیرانی",
    /* 31 */ "جناب آقای رسول بداغی",
    /* 32 */ "جناب آقای محمد حبیبی",
    /* 33 */ "جناب آقای محمود دولت‌آبادی",
    /* 34 */ "جناب آقای احسان هوشمند",
    /* 35 */ "جناب آقای جعفر پناهی",
    /* 36 */ "جناب آقای مهدی معتمدی‌مهر",
    /* 37 */ "جناب آقای اکبر معصوم بیگی",
    /* 38 */ "جناب آقای خسرو منصوریان",
    /* 39 */ "جناب آقای یوسف مولایی",
    /* 40 */ "جناب آقای رضا شهابی",
    /* 41 */ "سرکار خانم فاطمه گوارایی",
    /* 42 */ "سرکار خانم محترم رحماني", // Check spelling/diacritics if needed
    /* 43 */ "سرکار خانم مینو مرتاضی لنگرودی",
    /* 44 */ "سرکار خانم فرزانه اسکندری",
    /* 45 */ "سرکار خانم معصومه‌ دهقان",
    /* 46 */ "سرکار خانم فیروزه صابر",
    /* 47 */ "سرکار خانم طاهره طالقانی",
    /* 48 */ "سرکار خانم نسرین ستوده", // Note: Check for non-breaking spaces if copy-pasted
    /* 49 */ "سرکار خانم پوران دخت برومند",
  ];

  let isFlipped = false;
  let isOpened = false;
  let isAnimating = false; // Prevent clicks during animation

  const flipDuration =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--flip-duration",
      ) || "0.8",
    ) * 1000;
  const unfoldDuration =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--unfold-duration",
      ) || "0.7",
    ) * 1000;

  // --- Personalization ---
  function personalizeLetter() {
    const urlParams = new URLSearchParams(window.location.search);
    const personIdStr = urlParams.get("id"); // Get ID from URL
    const personId = parseInt(personIdStr, 10);

    // Check if ID is a valid number within the range of the names list
    if (
      !isNaN(personId) &&
      personId >= 1 &&
      personId <= namesList.length &&
      backTextElement &&
      frontUnfoldedElement
    ) {
      const nameIndex = personId - 1; // Convert 1-based ID to 0-based array index
      const displayName = namesList[nameIndex]; // Get the full name from the array

      console.log(`Personalizing for ID: ${personId}, Name: ${displayName}`);

      // Update text on the back with the full name
      backTextElement.textContent = displayName;
      backTextElement.style.fontFamily = "'IranNastaliq2', sans-serif";
      backTextElement.style.fontSize = "1.64rem"; // Reduced size (2.34 * 0.7)
      backTextElement.style.lineHeight = "1.2"; // Match flap text line height
      backTextElement.style.direction = "rtl"; // Set direction to RTL for Nastaliq
      backTextElement.style.color = "#333"; // Ensure color is set

      // Update background image using the ID for the filename
      const imagePath = `assets/names/${personId}.webp`; // Use ID for image path
      console.log("Setting background image to:", imagePath);
      frontUnfoldedElement.style.backgroundImage = `url('${imagePath}')`;

      // Preload the image
      const img = new Image();
      img.src = imagePath;
    } else {
      // --- Fallback if ID is missing or invalid ---
      console.log(
        "No valid ID parameter found or elements missing. Using defaults.",
      );
      // Optionally set default text/image if no name is provided
      backTextElement.textContent = "برای شما"; // Default back text in Persian
      backTextElement.style.fontFamily = "'IranNastaliq2', sans-serif"; // Use Nastaliq for default too
      backTextElement.style.fontSize = "1.64rem"; // Reduced size
      backTextElement.style.lineHeight = "1.2";
      backTextElement.style.direction = "rtl";
      backTextElement.style.color = "#555"; // Slightly different default color?
      frontUnfoldedElement.style.backgroundImage = `url('assets/front-letter.webp')`; // Default front image
    }
  }

  // --- Functions ---
  function flipLetter() {
    if (isAnimating || isFlipped) return; // Already flipped or animating
    isAnimating = true;
    foldedLetter.classList.add("flipped");
    console.log("Flipping...");

    setTimeout(() => {
      isFlipped = true;
      isAnimating = false;
      console.log("Flip complete. Ready for next click to open.");
    }, flipDuration);
  }

  function openLetter() {
    // Should only open if flipped and not already open or animating
    if (isAnimating || !isFlipped || isOpened) return;
    isAnimating = true;
    foldedLetter.classList.add("open");
    console.log("Opening flaps...");

    // Wait for unfold animation to finish
    setTimeout(() => {
      isOpened = true;
      isAnimating = false;
      console.log("Open complete.");
      // Optional: Hide the folded front completely after opening?
      // const frontFolded = foldedLetter.querySelector('.letter-front-folded');
      // if (frontFolded) frontFolded.style.display = 'none';
    }, unfoldDuration);
  }

  function resetAnimation() {
    console.log("Resetting...");
    isAnimating = true; // Prevent clicks during reset
    foldedLetter.classList.remove("open", "flipped");
    // Reset state variables after animations could have finished
    // Use the longest duration (flip or unfold)
    setTimeout(
      () => {
        isFlipped = false;
        isOpened = false;
        isAnimating = false;
        console.log("Reset complete.");
        // Optional: Ensure folded front is visible again
        // const frontFolded = foldedLetter.querySelector('.letter-front-folded');
        // if (frontFolded) frontFolded.style.display = 'block'; // Or flex/grid if used
      },
      Math.max(flipDuration, unfoldDuration),
    );
  }

  // --- Initialization ---
  personalizeLetter(); // Call personalization logic on load

  // --- Event Listeners ---
  // Single listener on the letter itself
  foldedLetter.addEventListener("click", () => {
    if (isAnimating) return; // Ignore clicks during animation

    if (!isFlipped) {
      // State 1: Not flipped -> Flip the letter
      flipLetter();
    } else if (isFlipped && !isOpened) {
      // State 2: Flipped but not opened -> Open the letter
      openLetter();
    } else if (isOpened) {
      // State 3: Opened -> Reset the animation
      resetAnimation();
    }
  });
});
