var data = [
"[BHM]  33.57   86.75  Birmingham,AL",
"[HSV]  34.65   86.77  Huntsville,AL",
"[MOB]  30.68   88.25  Mobile,AL",
"[MGM]  32.30   86.40  Montgomery,AL",
"[FAI]  64.82  147.87  Fairbanks,AK",
"[JNU]  58.37  134.58  Juneau,AK",
"[FLG]  35.13  111.67  Flagstaff,AZ",
"[PHX]  33.43  112.02  Phoenix,AZ",
"[SDL]  33.62  111.92  Scottsdale,AZ",
"[TUS]  32.12  110.93  Tucson,AZ",
"[LIT]  35.22   92.38  Little Rock,AR",
"[BUR]  34.20  118.37  Burbank,CA",
"[LAX]  33.93  118.40  Los Angeles,CA",
"[APC]  38.22  122.28  Napa,CA",
"[SAC]  38.52  121.50  Sacramento,CA",
"[SMF]  38.70  121.60  Sacramento,CA",
"[MYF]  32.82  117.13  San Diego,CA",
"[51Q]  37.75  122.68  San Francisco,CA",
"[ASE]  39.22  106.87  Aspen,CO",
"[DEN]  39.75  104.87  Denver,CO",
"[BDR]  41.17   73.13  Bridgeport,CT",
"[HFD]  41.73   72.65  Hartford,CT",
"[30N]  41.22   72.67  New Haven,CT",
"[ILG]  39.67   75.60  Wilmington,DE",
"[DCA]  38.85   77.04  Washington/Natl,DC",
"[DAB]  29.18   81.05  Daytona Bch,FL",
"[CRG]  30.33   81.52  Jacksonville,FL",
"[EYW]  24.55   81.75  Key West,FL",
"[MIA]  25.82   80.28  Miami Intl,FL",
"[MCO]  28.43   81.32  Orlando,FL",
"[NPA]  30.35   87.32  Pensacola,FL",
"[PNS]  30.47   87.20  Pensacola,FL",
"[AHN]  33.95   83.32  Athens,GA",
"[ATL]  33.65   84.42  Atlanta,GA",
"[CSG]  32.52   84.93  Columbus,GA",
"[HNL]  21.35  157.93  Honolulu Int,HI",
"[JHM]  20.97  156.83  Maui,HI",
"[BOI]  43.57  116.22  Boise,ID",
"[CHI]  41.90   87.65  Chicago,IL",
"[IND]  39.73   86.27  Indianapolis,IN",
"[CID]  41.88   91.70  Cedar Rapids,IA",
"[DSM]  41.53   93.65  Des Moines,IA",
"[ICT]  37.65   97.43  Wichita,KS",
"[BWG]  36.97   86.43  Bowling Gren,KY",
"[LEX]  38.05   85.00  Lexington,KY",
"[LOU]  38.23   85.67  Louisville,KY",
"[BTR]  30.53   91.15  Baton Rouge,LA",
"[NEW]  30.03   90.03  New Orleans,LA",
"[NHZ]  43.88   69.93  Brunswick,ME",
"[PWM]  43.65   70.32  Portland,ME",
"[BAL]  39.18   76.67  Baltimore,MD",
"[BOS]  42.37   71.03  Boston,MA",
"[ARB]  42.22   83.75  Ann Arbor,MI",
"[DET]  42.42   83.02  Detroit,MI",
"[LAN]  42.77   84.60  Lansing,MI",
"[GPZ]  47.22   93.52  Grand Rapids,MN",
"[MIC]  45.07   93.38  Minneapolis,MN",
"[STC]  45.55   94.07  St Cloud,MN",
"[JAN]  32.32   90.08  Jackson,MS",
"[UOX]  34.39   89.54  Oxford,MS",
"[TUP]  34.27   88.77  Tupelo,MS",
"[MCI]  39.32   94.72  Kansas City,MO",
"[STL]  38.75   90.37  St Louis,MO",
"[HLN]  46.60  112.00  Helena,MT",
"[OLU]  41.45   97.35  Columbus,NE",
"[LAS]  36.08  115.17  Las Vegas,NV",
"[CON]  43.20   71.50  Concord,NH",
"[ACY]  39.45   74.57  Atlantic Cty,NJ",
"[TTN]  40.28   74.82  Trenton,NJ",
"[ABQ]  35.05  106.60  Albuquerque,NM",
"[ROW]  33.30  104.53  Roswell,NM",
"[SAF]  35.62  106.08  Santa Fe,NM",
"[ALB]  42.75   73.80  Albany,NY",
"[BUF]  42.93   78.73  Buffalo,NY",
"[NYC]  40.77   73.98  New York,NY",
"[ROC]  43.12   77.67  Rochester,NY",
"[AVL]  35.43   82.55  Asheville,NC",
"[CLT]  35.22   80.93  Charlotte,NC",
"[FAR]  46.90   96.80  Fargo,ND",
"[LUK]  39.10   84.43  Cincinnati,OH",
"[CLE]  41.42   81.87  Cleveland,OH",
"[CMH]  40.00   82.88  Columbus,OH",
"[OKC]  35.40   97.60  Oklahoma Cty,OK",
"[TUL]  36.20   95.90  Tulsa,OK",
"[EUG]  44.12  123.22  Eugene,OR",
"[PDX]  45.60  122.60  Portland,OR",
"[ABE]  40.65   75.43  Allentown,PA",
"[HAR]  40.37   77.42  Harrisburg,PA",
"[PIT]  40.50   80.22  Pittsburgh,PA",
"[PVD]  41.73   71.43  Providence,RI",
"[CHS]  32.90   80.03  Charleston,SC",
"[CAE]  33.95   81.12  Columbia,SC",
"[GMU]  34.85   82.35  Greenville,SC",
"[HON]  44.38   98.22  Huron,SD",
"[PIR]  44.38  100.28  Pierre,SD",
"[CHA]  35.03   85.20  Chattanooga,TN",
"[TYS]  35.82   83.98  Knoxville,TN",
"[MEM]  35.05   90.00  Memphis Intl,TN",
"[BNA]  36.12   86.68  Nashville,TN",
"[AUS]  30.30   97.70  Austin,TX",
"[DFW]  32.90   97.03  Dallas/FW,TX",
"[IAH]  29.97   95.35  Houston,TX",
"[SAT]  29.53   98.47  San Antonio,TX",
"[SLC]  40.78  111.97  Salt Lake Ct,UT",
"[BTV]  44.47   73.15  Burlington,VT",
"[MPV]  44.20   72.57  Montpelier,VT",
"[LYH]  37.33   79.20  Lynchburg,VA",
"[RIC]  37.50   77.33  Richmond,VA",
"[SEA]  47.45  122.30  Seattle,WA",
"[SFF]  47.67  117.33  Spokane,WA",
"[CKB]  39.28   80.23  Clarksburg,WV",
"[HTS]  38.37   82.55  Huntington,WV",
"[GRB]  44.48   88.13  Green Bay,WI",
"[MSN]  43.13   89.33  Madison,WI",
"[MKE]  42.95   87.90  Milwaukee,WI",
"[CYS]  41.15  104.82  Cheyenne,WY",
"[JAC]  43.60  110.73  Jackson,WY"]

var usStates = [
    { name: 'ALABAMA', abbreviation: 'AL'},
    { name: 'ALASKA', abbreviation: 'AK'},
    { name: 'AMERICAN SAMOA', abbreviation: 'AS'},
    { name: 'ARIZONA', abbreviation: 'AZ'},
    { name: 'ARKANSAS', abbreviation: 'AR'},
    { name: 'CALIFORNIA', abbreviation: 'CA'},
    { name: 'COLORADO', abbreviation: 'CO'},
    { name: 'CONNECTICUT', abbreviation: 'CT'},
    { name: 'DELAWARE', abbreviation: 'DE'},
    { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
    { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
    { name: 'FLORIDA', abbreviation: 'FL'},
    { name: 'GEORGIA', abbreviation: 'GA'},
    { name: 'GUAM', abbreviation: 'GU'},
    { name: 'HAWAII', abbreviation: 'HI'},
    { name: 'IDAHO', abbreviation: 'ID'},
    { name: 'ILLINOIS', abbreviation: 'IL'},
    { name: 'INDIANA', abbreviation: 'IN'},
    { name: 'IOWA', abbreviation: 'IA'},
    { name: 'KANSAS', abbreviation: 'KS'},
    { name: 'KENTUCKY', abbreviation: 'KY'},
    { name: 'LOUISIANA', abbreviation: 'LA'},
    { name: 'MAINE', abbreviation: 'ME'},
    { name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
    { name: 'MARYLAND', abbreviation: 'MD'},
    { name: 'MASSACHUSETTS', abbreviation: 'MA'},
    { name: 'MICHIGAN', abbreviation: 'MI'},
    { name: 'MINNESOTA', abbreviation: 'MN'},
    { name: 'MISSISSIPPI', abbreviation: 'MS'},
    { name: 'MISSOURI', abbreviation: 'MO'},
    { name: 'MONTANA', abbreviation: 'MT'},
    { name: 'NEBRASKA', abbreviation: 'NE'},
    { name: 'NEVADA', abbreviation: 'NV'},
    { name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
    { name: 'NEW JERSEY', abbreviation: 'NJ'},
    { name: 'NEW MEXICO', abbreviation: 'NM'},
    { name: 'NEW YORK', abbreviation: 'NY'},
    { name: 'NORTH CAROLINA', abbreviation: 'NC'},
    { name: 'NORTH DAKOTA', abbreviation: 'ND'},
    { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
    { name: 'OHIO', abbreviation: 'OH'},
    { name: 'OKLAHOMA', abbreviation: 'OK'},
    { name: 'OREGON', abbreviation: 'OR'},
    { name: 'PALAU', abbreviation: 'PW'},
    { name: 'PENNSYLVANIA', abbreviation: 'PA'},
    { name: 'PUERTO RICO', abbreviation: 'PR'},
    { name: 'RHODE ISLAND', abbreviation: 'RI'},
    { name: 'SOUTH CAROLINA', abbreviation: 'SC'},
    { name: 'SOUTH DAKOTA', abbreviation: 'SD'},
    { name: 'TENNESSEE', abbreviation: 'TN'},
    { name: 'TEXAS', abbreviation: 'TX'},
    { name: 'UTAH', abbreviation: 'UT'},
    { name: 'VERMONT', abbreviation: 'VT'},
    { name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
    { name: 'VIRGINIA', abbreviation: 'VA'},
    { name: 'WASHINGTON', abbreviation: 'WA'},
    { name: 'WEST VIRGINIA', abbreviation: 'WV'},
    { name: 'WISCONSIN', abbreviation: 'WI'},
    { name: 'WYOMING', abbreviation: 'WY' }
];

var states = {}
usStates.forEach(function(s){states[s.abbreviation]=s.name});

var locObj = {}

function getWikiElem(page,cityKey){
    $.getJSON("http://en.wikipedia.org/w/api.php?action=parse&format=json&callback=?", {page:page, prop:"text"}, function(data) {
        wikiPage = data.parse.text["*"];
        $wikiDOM = $("<document>"+wikiPage+"</document>");
        var elem = $wikiDOM.find('.maptable').find('img');
        locObj[cityKey].src = [];
        $.each(elem,function(index,val){
            var src = $(val).attr('src');
            locObj[cityKey].src.push('https:'+src);
        })
    });
}

for(var i=0;i<data.length-1;i++){
    console.log("ran");
    var loc = data[i],
    cityArr = loc.match(/\[(.*?)\]/)[0],
    cityKey = cityArr.substring(1, cityArr.length-1),
    latLng = loc.match(/\d+[.]\d+/g),
    lat = latLng[0],
    lng = latLng[1],
    city = "",
    state = ""

    if(loc.match(/([A-Z]{1}'?[a-z]+\s?)+/g) && loc.match(/[A-Z]+$/g)){
        city = loc.match(/([A-Z]{1}'?[a-z]+\s?)+/g)[0];
        state = loc.match(/[A-Z]+$/g)[0];
    }

    fullState = ""
    if (states[state]){
        fullState = states[state].toLowerCase()
    }
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    locObj[cityKey] = {}
    locObj[cityKey].city = city;
    locObj[cityKey].state = fullState.capitalize();
    locObj[cityKey].lat = lat;
    locObj[cityKey].lng = lng;
    locObj[cityKey].wikiUrl = 'https://en.wikipedia.org/wiki/'+city+',_'+locObj[cityKey].state;
    getWikiElem(city+', '+locObj[cityKey].state,cityKey);

}

console.log(locObj);




