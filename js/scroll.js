document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } 
        });
    });

    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show2");
            } 
        });
    });
    
    document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));
    document.querySelectorAll(".blurs").forEach((el) => observer.observe(el));

    document.querySelectorAll(".containerR").forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
});
    
    document.querySelectorAll(".headerNav").forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
});

 document.querySelectorAll(".mainH1").forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
});
 document.querySelectorAll(".mainArticle").forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
});
document.querySelectorAll(".mainFigure").forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
});

// Obter e observar todos os elementos da classe containerC

    
});