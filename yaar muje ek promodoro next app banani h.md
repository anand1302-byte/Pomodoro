yaar muje ek promodoro next app banani hai jiske feature kuch ese hone chaiye 

main page :-

isme promodoro ka setup ho or uper header me left side logo or right side report, setting, signin button ho or uske baju me streak count ho 

header ke niche promodoro ka section banado jisme 3 tab section me timer ho promodoro, short break, or long break,

promodoro :- isme 25 min ka timer ho / isme font colour blue
short break :- isme 5 min ka timer ho / font colour red
long break :- isme 15 min ka timer ho / font colour green

uske baad todo list kardo jisme list add kare check kar sake or delete kar sake 
theme seting me add karo jisme font colour change kar sake 

reports :-

    isme ek model khule jisme 3 tab section ho 

    summery, detail, or ranking

    summery :- 
        isme Activity summery section and uske niche focus hour ka week chart ho jo user login kara hua ho to dikhe
        activity summery me 3 card ho hour focus, day accessed and day streak ho or ye sab jab user login ho tab hi dikhe 

or next app me kuch condision rakhani hai like 
- user timer without login user kar sakta hai but user todo me 3 task hi add delete kar sakta hai 4th pe vo login form me shift ho jay
- report button me bhi user login ho to report dekh sakta hai 
- UI professional or premium rakhana or ye 1 page me hi banana hai

tech stack :- 
    - next js with jsx
    - tailwind css
    - google auth 
    - anime.js
    - lucide icon 


---------------------------------------------------------------------------------------------------------------------

Build a premium Pomodoro Next.js application with the following specifications:

- Tech Stack: Next.js (JSX), Tailwind CSS, Google Auth, Anime.js (animations), Lucide Icons.

- Layout:
    - A single-page application with a modern, professional, and minimal UI design.

- Header Section:
    - Left side → Logo
    - Right side → Buttons for Reports, Settings, Sign In, and a Streak Counter.

- Pomodoro Section (below header):
    - Three tabs: Pomodoro (25 min, blue font), Short Break (5 min, red font), Long Break (15 min, green font).
    - Smooth animations for switching between timers using Anime.js.

- Todo List Section:
    - Add, check, and delete tasks.
    - Restriction: Guests can only add 3 tasks. On adding the 4th task, redirect to login form (Google Auth).

- Allow theme customization: user can change font colors in settings button.

- Reports Section:
    - Opens as a modal with three tabs: Summary, Detail, Ranking.

    - Summary Tab:
        - Activity Summary section.
        - Three cards: Focused Hours, Days Accessed, Day Streak.
        - A weekly focus hours chart (visible only for logged-in users).
        - Reports are accessible only after login.

- Login/Access Rules:
    - Timer is usable without login.
    - Todo list limited to 3 tasks unless logged in.
    - Reports are visible only after login.

- UI/UX:
    - Professional, premium, and modern one-page design.
    - Elegant animations, soft shadows, rounded corners.
    - Responsive layout with clean typography and smooth transitions.

Deliverables:
A single-page, production-ready Next.js (JSX) app styled with Tailwind, animated with Anime.js, integrated with Google Auth, and using Lucide Icons for UI."