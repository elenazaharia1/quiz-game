# Quiz-Game 2 Players

## Team-members 😎

- [Elena Zaharia](https://github.com/elenazaharia1)
- [Vaida Aurel Nicolae](https://github.com/vaidanicu)
- [Valentin Constantinescu](https://github.com/Ipadios12)

## Demo

https://elenazaharia1.github.io/quiz-game/

# TODO

- [x] make it work on phone resolution(layout)
- [x] active player
- [x] the background to the answer
- [x] change name player 1/ player 2 and text is not visible
- [x] question (remove questions if is correct)
- [] game logic(what the game doing/ how to play)
- [x] it gets stuck at question 16

Pentru @media query

Eu am pus 2 breakpoint-uri, adica 2 momente in care site-ul isi schimba layout-ul.
Nu este necesar sa faci media queries pentru fiecare ecran de dispozitiv pentru ca asta ar insemna ca majoritatea site-urilor sa aibe 10 media queries. De obicei, te uiti in devtools si vezi la ce moment se strica layout-ul si nu mai arata bine.

Eu am identificat 2 momente de genul, felul in care am gandit design-ul nu este ideal.

Aici voi explica ce am facut incepand cu marimea cea mai mica

1. @media (max-width: 30rem) {
   .panels {
   flex-direction: column;
   align-items: center;
   gap: 0;
   }

#player1-panel,
#player2-panel {
display: inline-block;
padding: 10px;
margin: 5px;

    width: 150px;
    vertical-align: top;

}
#question-container {
width: 300px;
}
h3 {
margin: 0;
}
}

max-width: 30rem => inseamna maxim 30 rem (1rem = 16px - 16x30= 480px)

La aceasta marime panelurile cu playeri se suprapun, practic aici a zis Matei ca e problema, ar fi mai ok dpdv al design-ului sa nu se suprapuna sa fie unul langa altul. Asta se poate rezolva usor prin a schimba flex direction this acest media query si eventual a face scrisul mai mic, la fel doar in acest media query.

2. max-width: 50rem => inseamna maxim 50 rem ( 16x50 = 800px)

In cealalta @media query practic am facut panelurile mai inguste si am facut ca optiunile raspuns sa fie unele peste altele.

In concluzie, Matei a avut 2 critici

a - ca panelurile sa iasa in evidenta mai mult, asta poate fi facut in CSS-ul normal nu in media queries

b - in cea mai mica media query sa nu mai fie panelurile una peste alta (max-width: 30rem)
