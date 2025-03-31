//
// Configuration for the Slack bot
//
module.exports = {

    defaultLang: 'sk',
    locales: [
        'en',
        'sk'
    ],

    sk: {
        questions: {
            recomended: [
                "(kam)",
                "(ktore)(?!.*jedlo)",
                "d(a|á)m?e.*?(obed)",
                "(obed\\?)"
            ],
            restaurants: [
                "([cč]o.*(hraj[úu]|maj[úu]|d[aá]vaj[úu]|.*na.*obed))",
                "ak[eé].*s[uú].*ponuky[\\?]*",
                "ak[aá].*je.*ponuka"
            ]
        },
        days: [
            "Nedeľa",
            "Pondelok",
            "Utorok",
            "Streda",
            "Štvrtok",
            "Piatok",
            "Sobota"
        ]
    },

    en: {
        questions: {
            recomended: [
                "(where)",
                "(which)(?!.*food)",
                "shall we.*?(lunch)",
                "(lunch\\?)"
            ],
            restaurants: [
                "([w]hat.*(play|have|serve|.*for.*lunch))",
                "what.*are.*the offers[\\?]*",
                "what.*is.*the offer"
            ]
        },
        days: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
    },

    // Restaurant sources
    sources: {
        kantina: {
            name: 'Kantina Postova',
            web: 'https://restauracie.sme.sk/restauracia/kantina-postova_10777-zilina_2737/denne-menu',
            parser: 'parserRestauracieSme',
            timestamp: 0,
            items: []
        },
        // Restaurant identifier
        voyage: {
            // Restaurant name
            name: 'Voyage',
            // URL for parsing the daily menu content
            web: 'https://restauracie.sme.sk/restauracia/pizza-restaurant-kusok-stastia_3604-zilina_2737/denne-menu',
            // Type of parser
            parser: 'parserRestauracieSme',
            // Helper variables for time and parsed items
            timestamp: 0,
            items: []
        },
        kazacok: {
            name: 'Kazačok Pub',
            web: 'https://restauracie.sme.sk/restauracia/kazacok-pub_7286-zilina_2737/denne-menu',
            parser: 'parserRestauracieSme',
            timestamp: 0,
            items: []
        },
        vulcano: {
            name: 'Vulcano',
            web: 'https://restauracie.sme.sk/restauracia/vulcano_4536-zilina_2737/denne-menu',
            parser: 'parserRestauracieSme',
            timestamp: 0,
            items: []
        },
        milano: {
            name: 'Pizza-Milano',
            web: 'https://restauracie.sme.sk/restauracia/milano-pizza_1724-zilina_2737/denne-menu',
            parser: 'parserRestauracieSme',
            timestamp: 0,
            items: []
        },
        makalu: {
            name: 'Makalu',
            web: 'https://restauracie.sme.sk/restauracia/makalu_14770-zilina_2737/denne-menu',
            parser: 'parserRestauracieSme',
            timestamp: 0,
            items: []
        },
        nimbu: {
            name: 'Nimbu',
            web: 'https://restauracie.sme.sk/restauracia/nimbu-zilina-indicka-restauracia_14764-zilina_2737',
            parser: 'parserRestauracieSme',
            timestamp: 0,
            items: []
        },
    },

    // Icons for voting (max 10)
    max_vote_emojis: [
        ":zero:",
        ":one:",
        ":two:",
        ":three:",
        ":four:",
        ":five:",
        ":six:",
        ":seven:",
        ":eight:",
        ":nine:",
        ":keycap_ten:"
    ],

    // Array of "funny" GIF images to display in the poll
    gifs: [
        "https://www.icegif.com/wp-content/uploads/icegif-4331.gif",
        "https://media.tenor.com/FS2gSt21U6sAAAAM/excited-pooh-bear-pooh.gif",
        "https://media.tenor.com/uux9YgvFNjwAAAAM/scdiscord-skyclub.gif",
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2FmamMwZHpnNDlyeng3c3hqdTJmZWNpMTA0OHZrbDlzdWVwZnRsayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eH3Ra3DUp3tMylXedo/giphy.gif",
        "https://media.tenor.com/rUExSUHwsD0AAAAM/looney-tunes-devil.gif",
    ],

};
