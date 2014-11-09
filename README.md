Webbaserat realtids 2D spel
===========================

Frågeställning
--------------
Hur går det att skapa en snabb och felfri realtidskommunikation mellan server och klienter via webbsocket med tillämpning på ett webbaserat plattformsspel?

Avgränsning
-----------
Jag ska gå igenom hur det går att, via tekniken websockets, skapar ett realtidsbaserat spel för webben mellan flera spelare och hur tekniken bakom spelet gör att det blir snabbt och stabilt. Hur fungerar servern för att hantera informationen och spara den samtidigt som spelarna inte ska uppleva en större fördröjning eller *”lagg”*?

Jag har avgränsat mig till nödvändiga punkter till mitt projekt, de som ska göras vid extra tid och de saker jag inte kommer att göra i mitt arbete.

De saker som är tvungna att ingå i projektet är en sida som ska delas ut via en server på node.js, det ska ingå en sida för att kunna koppla upp sig och fylla i uppgifter om den aktuella spelaren. Efter att uppgifter som användarnamn fyllts i ska en uppkoppling via websockets startas och informationsutbyte mellan server och klient ska äga rum. Minsta krav på den grafiska delen är ett rutnät som fyller i positionen i realtid på alla andra spelare på den aktuella spelplanen och möjligheten att identifiera dem vid användarnamn. Användaren ska via tangentbordskommandon kunna styra sin karaktär och servern ska hålla koll på de olika positionerna och namnen på spelarna. 

Vid mera tid ska en eller flera av kommande funktionerna att implementeras. En chatt för att kunna prata i realtid under spelets gång. En registrering av användare, istället för att fylla i sitt användarnamn vid varje speltillfälle så ska profiler kommas ihåg och loggas in på, detta gör att även positioner ska sparas mellan olika speltillfällen och data som inte används just nu ska sparas över en längre tid i en databas. Funktioner som olika mönster eller färger samt funktioner för rutnätet kan implementeras, som väggar eller representera en värld med olika objekt eller material.

Funktioner som inte ska implementeras är stödja touch support eller annan support än tangentbord, möjligheten att kunna köra på flera olika världar eller ett en spelar läge. Spelet kommer **INTE ATT VARA KOMPLETT** utan **ENDAST** innehålla delar av ett spel, fokus kommer att vara till den största delen på serversidan och uppkopplingen mellan klienterna. 

Metod
-----
Jag ska via mitt projekt och arbetet bakom, besvara min frågeställning med de steg och tillämpningar jag använder. Mitt arbete delas upp i tre delar, en på serversidan där hantering av uppkopplingar sköts samt olika spelares positioner, en klient del där fokus är på att kommunicera med servern och driva ett utbyte av data. Sista delen, den jag kommer lägga minst fokus på är grafiska klient delen, tolka och rita upp data som kommer till klienten. 

Jag ska använda mig av textredigeraren sublime text 3 för att skriva all kod. För att bespara massa tid kommer jag att använda mig av bibliotek som socket.io eller liknande, dessa kommer hjälpa mig att hantera websockets och http request så att jag kan lägga mer tid på spelet och informationsutbytet.
Jag kommer även att behöva läsa på kring hur websockets fungerar och läsa dokumentationen eftersom jag har haft mycket liten tidigare erfarenhet kring detta.

Tidsplan
--------
* v.43: uppstart av gymnasiearbete och skriva klart problemformulering
* v.44: påbörjar praktiskt arbete för serversidan, lägga till paket för websockets
* v.45: försätta arbetet med server, fixa server för http sida
* v.46: påbörja klientsidan, skapa uppkoppling mellan server och klient
* v.47: 
* v.48: 
* v.49:
* v.50: avsluta större delen på serversidan, lägga all fokus på klienteller buggar på servern
* v.51:
* v.52:
* v.01:
* v.02: Praktiskt arbete ska vara avslutat och börjar på att skriva rapporten
* v.03:
* v.04:
* v.05:
* v.06: Rapportskrivandet ska avslutas för att 
* v.07: Gymnasiearbetets ska avslutas både praktiska delen och rapportskrivning. 

Övrigt
------

### Hjälp och tips

Till terminalen:

    ::GA
    @doskey _ga=cd D:\Workspace\node\s-rt-mp-g
    @doskey _node=cd D:\Workspace\node

Bra länkar:

[Narrow Jombotron source](view-source:http://getbootstrap.com/examples/jumbotron-narrow/#)

[Handlebars api](https://www.npmjs.org/package/express3-handlebars)

[Socket.IO api](http://socket.io/)

[Bootsrap components / doc](http://getbootstrap.com/components/)

[Express api](http://expressjs.com/4x/api.html)