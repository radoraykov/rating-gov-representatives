var Crawler = require('./crawler')
var Scraper = require('./scraper/xml')
var Downloader = require('../../common/node/downloader')
var InputManager = require('./input')

var inputMan = new InputManager();
var argv = inputMan.getArguments();
// Run crawler & Scraper
inputMan.findTargetDates(argv).then(function(target) {
    // Creates a logger
    var logger = require('../../common/node/logger')(inputMan.retrieveLoggerConfig(argv))
    // Creates a downloader
    var downloader =  new Downloader(logger, [200,600]);
    // Creates a crawler
    var crawler = new Crawler(argv.url, target, logger, downloader);
    // Creates a scraper
    var scraper = new Scraper(logger, downloader);


    // Finds laws and extract data
    crawler.on('law', function(lawURL) {
        scraper.run(lawURL)
    })
    crawler.run()
})