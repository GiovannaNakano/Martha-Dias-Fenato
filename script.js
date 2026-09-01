/* ==========================================================================
   PSICÓLOGA MARTHA DIAS FENATO

   01. Header ao rolar
   02. Menu mobile
   03. Acordeões
   04. Animação de entrada
   05. Link ativo no menu

========================================================================== */


(() => {

"use strict";



/* ==========================================================================
   01. HEADER AO ROLAR
========================================================================== */


const header = document.getElementById("header");


if (header) {


    let ticking = false;



    const updateHeader = () => {


        header.classList.toggle(
            "is-scrolled",
            window.scrollY > 50
        );


        ticking = false;


    };





    window.addEventListener(
        "scroll",
        () => {


            if (!ticking) {


                window.requestAnimationFrame(updateHeader);


                ticking = true;


            }


        },
        {
            passive: true
        }
    );



    updateHeader();


}









/* ==========================================================================
   02. MENU MOBILE
========================================================================== */


const menuToggle = document.getElementById("menu-toggle");

const nav = document.getElementById("nav-principal");



if (menuToggle && nav) {


    const setMenu = (open) => {


        nav.classList.toggle(
            "is-open",
            open
        );


        menuToggle.setAttribute(
            "aria-expanded",
            String(open)
        );



        menuToggle.setAttribute(
            "aria-label",
            open
                ? "Fechar menu"
                : "Abrir menu"
        );


    };





    menuToggle.addEventListener(
        "click",
        () => {


            setMenu(
                !nav.classList.contains("is-open")
            );


        }
    );





    // Fecha ao clicar em um link

    nav.querySelectorAll("a")
        .forEach((link) => {


            link.addEventListener(
                "click",
                () => {


                    setMenu(false);


                }
            );


        });





    // Fecha ao apertar ESC

    document.addEventListener(
        "keydown",
        (event) => {


            if (event.key === "Escape") {


                setMenu(false);


            }


        }
    );


}

/* ==========================================================================
   03. ACORDEÕES
   (Como ajudo + FAQ)
========================================================================== */


const accordions = document.querySelectorAll("[data-accordion]");



const closeItem = (item) => {


    const trigger = item.querySelector(
        ".accordion__trigger"
    );


    const panel = item.querySelector(
        ".accordion__panel"
    );



    item.classList.remove(
        "is-open"
    );



    trigger.setAttribute(
        "aria-expanded",
        "false"
    );



    panel.style.maxHeight = null;


};







const openItem = (item) => {


    const trigger = item.querySelector(
        ".accordion__trigger"
    );


    const panel = item.querySelector(
        ".accordion__panel"
    );



    item.classList.add(
        "is-open"
    );



    trigger.setAttribute(
        "aria-expanded",
        "true"
    );



    panel.style.maxHeight =
        `${panel.scrollHeight}px`;


};







accordions.forEach((accordion) => {


    const items =
        accordion.querySelectorAll(
            ".accordion__item"
        );





    items.forEach((item) => {


        const trigger =
            item.querySelector(
                ".accordion__trigger"
            );



        if (!trigger) return;





        trigger.addEventListener(
            "click",
            () => {


                const isOpen =
                    item.classList.contains(
                        "is-open"
                    );



                // Fecha os outros itens

                items.forEach(closeItem);





                // Abre o clicado

                if (!isOpen) {


                    openItem(item);


                }


            }
        );



    });



});









// Recalcula altura quando a tela muda

window.addEventListener(
    "resize",
    () => {


        document
            .querySelectorAll(
                ".accordion__item.is-open"
            )
            .forEach((item) => {


                const panel =
                    item.querySelector(
                        ".accordion__panel"
                    );



                panel.style.maxHeight =
                    `${panel.scrollHeight}px`;


            });


    }
);

/* ==========================================================================
   04. ANIMAÇÃO DE ENTRADA
========================================================================== */


const revealTargets = document.querySelectorAll(
    `
    .hero__text,
    .hero__image,
    .about__image,
    .about__text,
    .process__text,
    .process__image,
    .benefit,
    .quote__box,
    .accordion__item,
    .contact__info,
    .contact__form,
    .cta__box
    `
);



if ("IntersectionObserver" in window) {


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {


                entries.forEach((entry) => {


                    if (!entry.isIntersecting)
                        return;



                    entry.target.classList.add(
                        "is-visible"
                    );



                    observer.unobserve(
                        entry.target
                    );


                });


            },
            {
                threshold: 0.15
            }
        );






    revealTargets.forEach((element) => {


        element.classList.add(
            "reveal"
        );



        revealObserver.observe(
            element
        );


    });


}


/* ==========================================================================
   CARROSSEL DO CONSULTÓRIO
========================================================================== */

const carousel = document.querySelector(".carousel");

if (carousel) {

    const track = carousel.querySelector(".carousel__track");

    const slides =
        carousel.querySelectorAll(".carousel__track img");

    const prevButton =
        carousel.querySelector(".carousel__button--prev");

    const nextButton =
        carousel.querySelector(".carousel__button--next");

    const dots =
        document.querySelectorAll(".carousel__dot");


    let currentSlide = 0;

    let carouselInterval;


    /* --------------------------------------------------
       MOSTRAR FOTO
    -------------------------------------------------- */

    function showSlide(index) {

        if (index >= slides.length) {

            currentSlide = 0;

        } else if (index < 0) {

            currentSlide = slides.length - 1;

        } else {

            currentSlide = index;

        }


        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;


        /* Atualiza as bolinhas */

        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    }


    /* --------------------------------------------------
       REINICIAR AUTOMÁTICO
    -------------------------------------------------- */

    function restartCarousel() {

        clearInterval(carouselInterval);


        carouselInterval = setInterval(() => {

            showSlide(currentSlide + 1);

        }, 5000);

    }


    /* --------------------------------------------------
       PRÓXIMA FOTO
    -------------------------------------------------- */

    if (nextButton) {

        nextButton.addEventListener("click", () => {

            showSlide(currentSlide + 1);

            restartCarousel();

        });

    }


    /* --------------------------------------------------
       FOTO ANTERIOR
    -------------------------------------------------- */

    if (prevButton) {

        prevButton.addEventListener("click", () => {

            showSlide(currentSlide - 1);

            restartCarousel();

        });

    }


    /* --------------------------------------------------
       BOLINHAS
    -------------------------------------------------- */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showSlide(index);

            restartCarousel();

        });

    });


    /* --------------------------------------------------
       INÍCIO
    -------------------------------------------------- */

    showSlide(0);

    restartCarousel();

}





/* ==========================================================================
   05. LINK ATIVO NO MENU
========================================================================== */


const sections =
    document.querySelectorAll(
        "main section[id]"
    );



const navLinks =
    document.querySelectorAll(
        ".menu a"
    );






if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
) {



    const setActiveLink = (id) => {


        navLinks.forEach((link) => {


            link.classList.toggle(
                "is-active",
                link.getAttribute("href") === `#${id}`
            );


        });


    };







    const spyObserver =
        new IntersectionObserver(
            (entries) => {


                entries.forEach((entry) => {


                    if (entry.isIntersecting) {


                        setActiveLink(
                            entry.target.id
                        );


                    }


                });


            },
            {
                rootMargin:
                    "-45% 0px -50% 0px"
            }
        );






    sections.forEach((section) => {


        spyObserver.observe(
            section
        );


    });


}



})();