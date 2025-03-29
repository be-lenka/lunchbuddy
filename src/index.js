const { App } = require("@slack/bolt");
const Config = require('./config');
const Scraper = require('./scraper');
const Chance = require('chance');
const i18n = require('i18n');
require("dotenv").config();

// Configure i18n
i18n.configure({
    locales: Config.locales,
    directory: __dirname + '/../locales',
    defaultLocale: Config.defaultLang,
    objectNotation: true
});

// Initialize main libraries
var scraper = new Scraper();
const chance = new Chance();

// Initializing the app with tokens
const app = new App({
    token: process.env.SLACK_BOT_OAUTH_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_API_TOKEN,
    debug: process.env.SLACK_DEBUG === 'true',
});

const questionRestaurants = Config[Config.defaultLang].questions.restaurants;
const questionRestaurantsRegex = new RegExp(questionRestaurants.join('|'), 'i');
app.message(questionRestaurantsRegex, async ({ message, say }) => {
    try {
        scraper.getAllMenus().then(function (results) {
            var menues = [];
            for (var key in results) {
                if (results.hasOwnProperty(key)) {
                    var items = [];
                    for (var i = 0; i < results[key].items.length; i++) {
                        let name = results[key].items[i].name;
                        let price = results[key].items[i].price;
                        items.push(name + (price !== '' ? ' - *' + price + '*' : ''));
                    }
                    if (items.length > 0) {
                        menues.push({
                            fallback: i18n.__('menu.fallback', { name: results[key].name, web: results[key].web }),
                            title: results[key].name,
                            title_link: results[key].web,
                            text: items.join('\n'),
                            mrkdwn_in: ['text']
                        });
                    }
                }
            }
            if (menues.length > 0) {
                say({
                    text: i18n.__('menu.current_offer'),
                    attachments: menues
                });
            } else {
                say(i18n.__('menu.no_offer'));
            }
        }).catch((error) => console.log('Error:', error));
    } catch (error) {
        console.log("err")
        console.error(error);
    }
});

const textRecommendation = Config[Config.defaultLang].questions.recomended;
const questionRecommendationRegex = new RegExp(textRecommendation.join('|'), 'i');
app.message(questionRecommendationRegex, async ({ message, say }) => {
    try {
        scraper.getAllMenus().then(function (results) {
            if (Object.keys(results).length === 0) {
                say(i18n.__('recommendation.no_recommendation'));
            } else {

                say({
                    text: Config.gifs[chance.natural({
                        min: 0,
                        max: Config.gifs.length - 1
                    })]
                });

                var restaurants = {
                    fallback: [],
                    text: []
                };

                var i = 0;
                for (var key in results) {
                    if (results.hasOwnProperty(key)) {
                        if (i >= Config.max_vote_emojis.length) {
                            say(i18n.__('recommendation.too_many_options'));
                            break;
                        }

                        // message
                        if (results[key].items.length > 0) {
                            ++i;
                            restaurants.text.push(Config.max_vote_emojis[i] + ' ' + results[key].name);
                            restaurants.fallback.push('(' + i + ') ' + results[key].name);
                        }
                    }
                }

                say({
                    text: '>*' + i18n.__('recommendation.where_to_eat') + '*',
                    attachments: [{
                        fallback: restaurants.fallback.join(' | '),
                        color: 'good',
                        text: restaurants.text.join('\n'),
                        mrkdwn_in: ['text']
                    }]
                }).then(function (msg) {
                    var j = 1;
                    do {
                        app.client.reactions.add({
                            token: process.env.SLACK_BOT_OAUTH_TOKEN,
                            id: msg.user,
                            name: Config.max_vote_emojis[j].split(':').join(''),
                            timestamp: msg.ts,
                            channel: msg.channel
                        });
                        j++;
                    } while (j <= restaurants.text.length);
                });

            }
        }).catch(function (err) {
            console.error(err);
            say(i18n.__('recommendation.error'));
        });
    } catch (error) {
        console.error(error);
    }
});

(async () => {
    const port = 3000;
    await app.start(process.env.PORT || port);
    console.log(i18n.__('app.started'));
})();


/*eslint-disable no-process-exit */
function exitHandler(options, err) {
    if (options.exit) {
        console.log(i18n.__('app.exit_message'));
        process.exit();
    }
}

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));